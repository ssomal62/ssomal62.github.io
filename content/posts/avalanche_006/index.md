---
layout : post
title : "포인트/재고 차감 실패 시 보상 트랜잭션 멱등성 처리"
date: 2025-08-01
summary: 
categories : [ avalanche ]
tags : [ project, troubleshooting ,"항해99"]
---

## 문제 상황

구매 이벤트 시스템에서 실제로는 차감/감소가 실패했을 때 불구하고 보상 트랜잭션에서 복구 작업을 수행하는 문제가 발생했습니다.

{{< mermaid >}}
graph LR
A[1. 포인트 부족으로<br/>차감 실패] --> B[보상 트랜잭션에서<br/>포인트 복구 시도] --> C[포인트 중복 지급]
D[2. 동시성 문제로<br/>재고 감소 실패] --> E[보상 트랜잭션에서<br/>재고 증가 시도] --> F[재고 수량 오류]
{{< /mermaid >}}

---
## 문제 분석

### ▪️기존 코드의 문제점

```java
@Transactional 
public void refundInventory(ReleaseStockCommand command) {
    // 실제 재고가 차감되었는지 확인하지 않고 무조건 증가
    Product product = productService
        .findById(command.getProductId());
    
    // 문제: 무조건 증가
    product.increaseStock(command.getQuantity());
}
```

### ▪️문제 발생 시나리오

{{< mermaid >}}
sequenceDiagram
participant User as 사용자
participant UI as 사가매니저
participant Inv as 재고 서비스

    User->>UI: 상품 주문 (수량: 5)
    UI->>Inv: 재고 확인 및 예약
    
    note over UI, Inv: 재고 부족으로 예약 실패
    Inv-->>UI: 재고 예약 실패
    
    note over UI, Inv: 실패로 인한 보상 트랜잭션 시작
    UI->>Inv: 재고 복구 요청 (수량: 5)
    
    note over Inv: 문제! 실제로 차감되지<br/>않았는데 재고를 5개 증가
    Inv->>Inv: 재고 +5 (실질적 증가)
    
    Inv-->>UI: 문제 실제로는 5개 많은 재고
{{< /mermaid >}}

---

## 해결 방안

* **트랜잭션 로그 기반 멱등성 보장** - 주문 예약 상태 검증을 통한 중복 실행 방지 및 안전한 보상 트랜잭션 처리

### ▪️멱등성 보장 플로우

{{< mermaid >}}
flowchart LR
A[보상 트랜잭션 요청] --> B{예약된 주문인가?<br/>isReservedOrder}
B -->|조건 ✓| C[Redis + PostgreSQL<br/>재고 복구]
B -->|조건 ✗| D[보상 트랜잭션 스킵<br/>더미 이벤트 발생]

    C --> E[보상 트랜잭션 완료]
    D --> E
{{< /mermaid >}}

### ▪️구현 코드 

* <span class="font-emphasis-underline">멱등성이 보장된 보상 트랜잭션</span>

```java {hl_lines=[8,9,10]}
@Transactional 
public void refundInventory(ReleaseStockCommand command) {
    UUID productId = UUID.fromString(command.getProductId()); 
    String orderId = command.getOrderId(); 
    int quantity = command.getQuantity();
    
    try {
        if (!isReservedOrder(orderId)) { 
            log.info("복구 스킵: 예약되지 않은 주문. 주문 ID: {}", orderId); 
            sendStockReleasedResult(orderId, true); 
            return; 
        } 
        
        // 안전한 복구 실행
        boolean released = releaseStockAndUpdateStatus(orderId,
            productId, quantity); 
        sendStockReleasedResult(orderId, released); 
        
    } catch (Exception e) { 
        log.error("복구 중 오류 발생: 주문 ID: {}, 오류: {}", orderId, 
            e.getMessage(), e); 
        sendStockReleasedResult(orderId, false); 
    }
}
```

* <span class="font-emphasis-underline">일관된 결과 전송</span>

```java
sendStockReleasedResult(orderId, true);   // 스킵 시
sendStockReleasedResult(orderId, released); // 실행 시
sendStockReleasedResult(orderId, false);  // 예외 시
```

---


## 개선 사항

* **주요 상태 기반 멱등성** - 예약 상태 검증을 통한 안전한 보상 트랜잭션
* **예외 처리 강화** - 실제 프로세스에 대한 포괄적 예외 처리 및 로깅
* **응답성** - 성공/실패 여부를 명확히 반환하여 시스템 안정성 향상


[//]: # (* 예약된 상태 검증 로직 - 불필요한 보상 트랜잭션 방지)

[//]: # (* 포괄적 예외 처리 - 시스템 안정성 향상)

[//]: # (* 명확한 응답 처리 - 트랜잭션 결과 보장)

[//]: # (* 구조화 된 로깅 - 디버깅 및 모니터링 개선)


