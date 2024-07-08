---
layout : post
title : "프로그래머스 Lv.0 - 문자열 밀기"
date: 2023-09-22
summary: 
categories : [ codingtest ]
tags : [ 프로그래머스, 재귀]
---

> **문제**

스터디 모임의 방식을 코딩 테스트형으로 변경했다. 이 주의 첫 번째 문제다.

[[프로그래머스 Lv.0] 문자열 밀기](https://school.programmers.co.kr/learn/courses/30/lessons/120921)

---

다른 사람 풀이 best 중 '3단어'로 푼 답이 있다고 했다.  (feat. 조^2장) 

반복 작업이 필요한데 어떻게 3단어로 끝나지?  `while`이나 `for`문으로 하기엔 작성할 내용이 많으니 탈락.  그것보다는 `a.chars()`?, `a.tocharArray()`? 같은 걸 사용했으려나? 

집에 가는 지하철 안에서 끊임없이 고민을 했다.  반복은 하는데 짧게 줄일 수 있는 메서드라...  

메서드를 다시 호출하는 재귀 함수를 쓴 것인가? 그렇지만 재귀 함수를 써도 3단어로는 끝을 낼 수 없다. 하지만 더 이상 고민하는 것 보다 재귀 함수라도 써보자라고 생각이 들어 코드를 치기 시작했다. 


>  **재귀함수로 접근**

일단, 재귀 호출의 대표적인 예는 팩토리얼이 있다. 

`5!` 은` 5×4×3×2×1` .  0이 나오면 `return`.

```java
//재귀 함수 - 팩토리얼 예제
public static int factorial(int n) {
    if (n == 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
```

> **재귀 호출의 스택 구조**

![031003](../../assets/images/2023-09-22-01/031003.png)

![031004](../../assets/images/2023-09-22-01/031004.png)


> **재귀 호출과 반복문의 비교**

* 점화식과 종료조건만 구현하면 만들 수 있어 가시성이 높고, 구현하기 쉽다.
  (간결하다고해서 가독성이 좋다고 볼 수는 없다.)
* 일반 반복문과 구현하기까지의 시간 복잡도는 같으나 , 실제 Stack 과정에서 재귀호출이 속도가 느리고, 메모리를 크게 차지한다.

|                   | 반복문 |재귀함수 |
| :---------------------------: | :-------------------------: | :-------------------------: |
|         정의         |            명령을 반복적으로 실행            |함수를 다시 호출하여<br>반복 작업 수행|
|     <br/>Stack 메모리     |            <br/>Stack 메모리 사용x            |함수 호출  시 <br>매개변수, 지역변수 , 리턴값, <br>함수 종료 후 돌아가는 위치가 <br>stack 메모리에 저장됨|
| 무한 반복 시 |            무한 루프는<br>CPU사이클을 반복적으로 사용            |무한 재귀는 <br>Stack Overflow 발생|
|     속도     |   빠름|느림|



하지만 직접 코드도 작성해볼 겸 이 문제에서는  재귀 호출을 활용할 것이다.

```java
class Solution {
    //여기에 종료조건을 주기 위한 count 추가
	public static int solution(String A, String B) {
        //여기에 코드 작성
	}
}
```

1. `A!=B` 이면 A의 문자 요소 밀림 구현

   ```java
   String A;
   A = A.charAt(A.length() -1) + A.substring(0, A.length() -1)
   ```

2. 재귀 호출 탈출을 위해 `solution` 바깥에 `static`  `count`요소 추가 : `count`가 `A.length()`와 같다면 `return -1`.

3. 재귀 호출에  `A`를 다시 집어 넣고 재검증 시도.

   ```java
   class Solution {
       static int count = 0; 
   	public static int solution(String A, String B) {
           if (A.equals(B)) return count; //문자열이 일치하면 count 반환 후 역행하기.
           count++;
           A = A.charAt(A.length() -1) + A.substring(0, A.length() -1) 
           return A.length() == count ? -1 : solution(A, B); //조건 불만족 시 재귀 호출
   	}
   }	
   ```

문제는 풀었지만,  3단어는 역시나 계속 머리 속에 꽂힌 채였다.

다른 사람 풀이를 봤다.  

```java
return (B+B).indexOf(A);
return B.repeat(2).indexOf(A);
//둘 다 원리는 같다.
```

문자에서 맑고, 영롱하다는 느낌을 받아본 적이 있는가? 

아쉬웠던 부분은 처음 로직 고민할 때  'elloh' + 'elloh' 를 하면 그 안에 'hello'가 있잖아? 까지는 생각을 했는데 `indexOf` 를 아예 몰라서 이 접근 방식은 뒤로하고 다른 방법을 찾아 헤맸다.  `indexOf`에 대해 찾아보니  특정 문자 위치 인덱스를 반환하는 의외로 간단한 함수였다 . 그런데  `A!=B` 이면  '`-1'` 을 반환해야하고, 조건문이 없는데 어떻게 통과된거지? 라는 의문이 들었는데 , 원래 `indexOf`가 일치하는 값이 없으면 `-1`을 반환한단다. 

애초에 이걸 쓰라는 문제였던 것이다.  

***
<span style="font-size: x-small;">
다음날 조장님께 갔다.<Br>
나 :  조장, 나는 이 `IndexOf`라는 개념을 아예 몰랐어.<Br>
조조장 : 수업 시간에 했는데요?<Br>
나 : 앗..그렇군.. (머쓱) 수업을 똑바로 들어야겠다.<Br>
조조장 : IndexOf 도 모르는데 재귀 호출을 쓰신다고요?<Br><Br>
...나도 내가 의문이다.  근본부터 잘하자 제발..
</span>

