---
layout : post
title : "함수호출방식 Call By Value / Call By Reference"
date: 2024-07-23
summary: 
categories : [ cs ]
tags : [  ]
---



## 함수 호출 방식 

### Call By Reference & Java

Call By Reference는 매개변수를 객체로 전달할 때, 객체를 복제하지 않고 원본을 직접 참조하게 해주는 방식입니다. 하지만 자바에서는 객체 참조를 전달할 때 Call By Reference와 같은 직접 참조가 아니라 Call By Value 방식을 사용합니다. 즉, 메모리에 원본 객체의 주소값을 복제하여 전달함으로써 함수 내부에서 원본 객체를 참조하고 수정할 수 있게 합니다.


---

### Call By Value

기본 타입의 매개변수를 복사하여 데이터를 메모리에 '값'으로 할당한 후 호출하는 방식입니다. 이렇게 하면 함수나 메서드 내부에서 해당 매개변수를 변경하더라도 원래 변수에는 영향을 미치지 않습니다.

--- 

#### 객체를 복제하지 않고 참조하는 이유

기본 타입은 메모리 용량을 적게 차지하기 때문에 값 복사를 통해 전달(Call by Value)하는 것이 성능에 큰 영향을 미치지 않습니다. 또한, 이러한 방식이 코딩 시 더 효율적입니다. 반면, 객체 타입(사용자 정의 객체, 리스트, 딕셔너리 등)은 크기가 클 수 있기 때문에, 객체의 참조를 전달하여(Call by Reference) 성능 면에서 효율적으로 운영할 수 있습니다.

-  Call By Value : 기본 타입
-  Call By Reference : 객체 타입(사용자 정의 객체, List, Map...)


#### Java에는 Call By Reference가 없다

Call By Reference는 객체를 직접 참조하게 해주는 방식입니다. 그러나 Java에서는 원본 객체의 주소값을 복사하여 전달함으로써 객체를 참조하게 합니다. 따라서 주소값을 복사하여 전달하는 방식이므로 Java의 모든 함수 호출은 Call By Value로 처리됩니다.

####  그렇다면 객체 안의 기본타입은?

객체 주소값을 기준으로 순차적으로 메모리에 '값'으로 저장됩니다.

#### Call By Reference(또는 Java에서의 참조에 의한 전달)를 사용해야 하는 상황들

- 대용량 데이터 처리:
    - 큰 객체나 데이터 구조를 복사하지 않고 효율적으로 전달할 때
    - 예: 대규모 배열, 복잡한 객체 그래프
  
- 객체 수정:
    - 메소드 내에서 원본 객체를 직접 수정해야 할 때
    - 예: 컬렉션에 요소 추가/제거, 객체의 상태 업데이트
  
- 성능 최적화:
    - 불필요한 객체 복사를 피해 메모리 사용과 실행 시간을 줄일 때
    - 예: 빈번한 메소드 호출이 있는 경우
  
- 메소드 체이닝:
    - 객체를 반환하여 연속적인 메소드 호출을 가능하게 할 때
    - 예: StringBuilder의 append() 메소드
  
- 콜백 함수:
    - 객체를 다른 메소드나 클래스에 전달하여 나중에 사용할 때
    - 예: 이벤트 리스너, 비동기 작업의 콜백
  
- 객체 공유:
    - 여러 메소드나 클래스가 동일한 객체 인스턴스를 공유해야 할 때
    - 예: 싱글톤 패턴, 공유 리소스 관리
  
- 재귀 알고리즘:
    - 복잡한 데이터 구조를 탐색하거나 조작할 때
    - 예: 트리 순회, 그래프 알고리즘
  
- 불변 객체 사용:
    - 객체의 상태를 변경하지 않고 읽기 전용으로 사용할 때
    - 예: 설정 객체, 상수 데이터
  
- 인터페이스 구현:
    - 메소드 시그니처가 객체를 파라미터로 요구할 때
    - 예: Comparator 인터페이스의 compare 메소드
  
- 다형성 활용:
    - 상위 클래스 타입으로 다양한 하위 클래스 객체를 전달할 때
    - 예: 다양한 Shape 객체를 처리하는 draw 메소드
