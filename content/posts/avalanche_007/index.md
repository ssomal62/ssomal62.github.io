---
layout : post
title : "MSA 전환 시 UserContext 관리 설계"
date: 2025-08-01
summary: 
categories : [ avalanche ]
tags : [ project, troubleshooting ,"항해99"]
---

## 문제 상황
모놀리스 아키텍처에서 마이크로서비스 아키텍처(MSA)로 전환하면서, 기존에 `SecurityContext`로 쉽게 접근하던 사용자 정보를 각 마이크로서비스에서 어떻게 효율적으로 관리할 것인가에 대한 설계 문제가 있었습니다.

### ▪️기존 모놀리스 방식

```java
@GetMapping("/orders")
public List<Order> getMyOrders() {
    User currentUser = 
        SecurityContextHolder.getContext().getUser(); // ✅ 쉬운 접근
    return orderService.findByUserId(currentUser.getId());
}
```

### ▪️MSA 전환 시 고려해야 할 설계 과제들

1. **사용자 정보 전달 방식**: JWT를 매번 파싱할 것인가? 헤더로 전달할 것인가?
2. **성능 최적화**: 각 서비스에서 JWT 중복 파싱을 피할 방법
3. **개발 편의성**: 모놀리스처럼 간단한 사용자 정보 접근 방법 유지
4. **확장성**: User-ID 외에 Client-ID, Correlation-ID 등 추가 정보 관리
5. **일관성**: 모든 마이크로서비스에서 동일한 방식으로 사용자 정보 접근


## 기술 스택 및 제약 조건
- **Spring Cloud Gateway** (API Gateway)
- **JWT** (인증 토큰)
- **다중 마이크로서비스** (User, Order, Product Service 등)
- **성능 요구사항**: 높은 동시성 처리 필요
- **확장성 요구사항**: 향후 서비스 추가 시에도 동일한 방식 적용

## 설계 대안 검토

### ▪️방안 검토 과정

{{< mermaid >}}
graph LR
    A[MSA 사용자 정보 관리 방안] --> B[Option 1: JWT 직접 전달]
    A --> C[Option 2: 헤더 변환 방식]
    A --> D[Option 3: 별도 인증 서비스 호출]
    
    B --> B1[장점: 구현 단순]
    B --> B2[단점: 매번 파싱 오버헤드]
    
    C --> C1[장점: 성능 최적화]
    C --> C2[단점: 구현 복잡도 증가]
    
    D --> D1[장점: 중앙집중 관리]  
    D --> D2[단점: 네트워크 호출 오버헤드]
{{< /mermaid >}}

<br>

<details>
<summary style="font-size: large;">
 <span class="font-emphasis-underline">시나리오: 한 번의 주문 요청이 3개 서비스를 거치는 경우</span>
</summary>

> 사용자 주문 요청 1번 → 주문서비스 → 상품서비스 → 포인트서비스


* Option 1: **JWT 직접 전달**

```
1번 요청이지만:
- 주문서비스: JWT 파싱 (1번)
- 상품서비스: JWT 파싱 (2번)
- 포인트서비스: JWT 파싱 (3번)

총 인증 처리: 3번 (중복!)
```


* Option 3: **별도 인증 서비스 호출**

```
1번 요청이지만:
- 주문서비스: 인증서비스에 HTTP 호출 (1번)
- 상품서비스: 인증서비스에 HTTP 호출 (2번)
- 포인트서비스: 인증서비스에 HTTP 호출 (3번)

총 인증 처리: 3번 (중복!)
```

* Option 2: **헤더 변환 방식**

```
1번 요청:
- Gateway: JWT 파싱 (1번만!)
- 주문서비스: 헤더에서 바로 사용 (파싱 0번)
- 상품서비스: 헤더에서 바로 사용 (파싱 0번)
- 포인트서비스: 헤더에서 바로 사용 (파싱 0번)

총 인증 처리: 1번만!
```

</details>

### ▪️최종 선택: UserContext 패턴
**선택 이유:**
- **성능**: API Gateway에서 한 번만 JWT 파싱
- **편의성**: 모놀리스와 유사한 사용자 정보 접근 방식
- **확장성**: 다양한 컨텍스트 정보 추가 가능
- **일관성**: 모든 서비스에서 동일한 접근 방식

## 설계 및 구현

### ▪️전체 아키텍처

{{< mermaid >}}
graph TB
subgraph "API Gateway Layer"
A[클라이언트 JWT 요청] --> B[JWT 파싱 및 검증]
B --> C[헤더 변환 및 라우팅]
end

    subgraph "Microservice Layer"  
        C --> D[UserContextWebFilter]
        D --> E[ThreadLocal 저장]
        E --> F[비즈니스 로직 활용]
    end
{{< /mermaid >}}

### ▪️핵심 결정사항

#### 헤더 기반 정보 전달

```java
// API Gateway에서 헤더 추가
headers.add(UserContext.USER_ID, userId);
headers.add(UserContext.CLIENT_ID, clientId);
headers.add(UserContext.CORRELATION_ID, correlationId);
headers.add(UserContext.AUTH_TOKEN, accessToken);
```

#### ThreadLocal 기반 컨텍스트 관리

```java
// 각 서비스에서 ThreadLocal로 관리
public class UserContextHolder {
    private static final ThreadLocal<UserContext> userContext = 
        ThreadLocal.withInitial(UserContext::new);
}
```

#### 유연한 사용 방식 제공

```java
// 직접 헤더 접근
@PostMapping
public ResponseEntity<OrderResponse> createOrder(
    @RequestHeader("User-Id") UUID userId,
    @RequestBody OrderRequest request) {
    // ...
}
```

### ▪️정보 흐름도

{{< mermaid >}}
sequenceDiagram
    participant C as 클라이언트
    participant G as API Gateway
    participant F as JwtAuthenticationFilter
    participant MS as 마이크로서비스
    participant UC as UserContextWebFilter
    
    C->>G: JWT 토큰과 함께 요청
    G->>F: 요청 필터링
    F->>F: JWT 파싱 및 사용자 정보 추출
    F->>F: HTTP 헤더에 사용자 정보 추가
    F->>MS: 헤더와 함께 요청 전달
    MS->>UC: UserContextWebFilter 실행
    UC->>UC: 헤더에서 정보 추출하여 ThreadLocal 저장
    MS->>MS: 비즈니스 로직에서 사용자 정보 활용
    MS->>C: 응답 반환
{{< /mermaid >}}

## 구현 결과

### ▪️개선된 점
1. **성능 최적화**: JWT 파싱을 Gateway에서 한 번만 수행하여 각 서비스의 중복 처리 부하 제거
2. **개발 생산성 향상**: 모놀리스와 유사한 사용자 정보 접근으로 학습 비용 최소화
3. **확장성 확보**: 새로운 서비스 추가 시 동일한 패턴으로 즉시 적용 가능
4. **디바이스별 세션 관리**: Client-ID를 통한 단일 기기 로그아웃 및 모든 기기 로그아웃 기능 구현


### ▪️개발 경험
- **MSA 전환 시 고려사항**: 모놀리스의 편의성을 MSA에서 유지하는 방법론 학습
- **UserContext 패턴 구현**: ThreadLocal을 활용한 안전한 사용자 정보 관리
- **Spring Cloud Gateway 심화**: 필터 체인과 라우팅 메커니즘의 실제 활용 경험
- **아키텍처 설계 역량**: 성능과 개발 편의성 간의 트레이드오프 분석 및 최적해 도출


