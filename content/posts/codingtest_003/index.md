---
layout : post
title : "BaekJoon #2003 - 수들의 합"
date: 2024-07-18
summary: "투포인터 기법에 대해 배웠다."
categories : [ codingtest ]
tags : [ 투포인터기법 ]
---

## 문제

N개의 수로 된 수열 A[1], A[2], …, A[N] 이 있다. 이 수열의 i번째 수부터 j번째 수까지의 합 A[i] + A[i+1] + … + A[j-1] + A[j]가 M이 되는 경우의 수를 구하는 프로그램을 작성하시오.

#### 입력

첫째 줄에 N(1 ≤ N ≤ 10,000), M(1 ≤ M ≤ 300,000,000)이 주어진다. 다음 줄에는 A[1], A[2], …, A[N]이 공백으로 분리되어 주어진다. 각각의 A[x]는 30,000을 넘지 않는 자연수이다.

#### 출력

첫째 줄에 경우의 수를 출력한다.

---

## 풀이 과정


혼자만의 show를 했다. 리스트에 넣어서 0번째 index를 삭제해서 합을 새로 구하고.
예제 문제 및 게시판에 나와있는 반례도 다 통과했는데, 결과는 실패였다.


백준 문제를 풀 때 '알고리즘 분류'에 단서가 나오면 검색을 해봤겠지만, 아무 내용이 없길래 그냥 때려박아서 풀면 되는줄알았다.

오류를 찾는 과정에서, 이런 문제는 `투 포인트 기법`으로 접근해야한다고 했다.

이 기법, 분명히 봤다. 프로그래머스 미사일 문제 답안 중에서. 불현듯 그 코드를 이해하려고 엑셀 칸칸마다 색칠하며 아둥바둥하던 내 모습이 떠올랐다.

### 투 포인터 기법

* 배열에서 사용하는 기법으로 `start`와 `end` 각각 포인터를 를 0번 인덱스로 설정한다.
* 구간에서 찾는 조건이 `false` → `end++` 로 구간을 확장해서 새로운 숫자를 구간에 포함시킨다. 
* 구간에서 찾는 조건이 `true` → `start++` 으로 이미 검증이 끝난 앞구간을 제외시킨다.
* 범위를 계속 새로 지정해주면서 값을 찾는 방법이다.


### 로직 풀이

* `sum`: 포인터 s부터 e까지의 합.
* `sum`이 `target`보다 작을 경우 `e를 증가`시켜 구간에 숫자를 더 포함시킨다.
* 포함시킨 숫자까지의 합(`sum`)이 `target`을 초과할 경우 `s를 증가`시켜 앞 구간을 제외한다.
  * (단, s++ 한 번 이동으로는 target 미만이 성립하지 않는 상황도 있으므로 s를 증가시키는 작업은 반복으로 설정한다.)
* 이러한 동작을 반복하면서 `sum == target`인 상황이 발생하면 `count를 증가`시키면 된다.


### 표로 표현

#### 초기 상태

* `range  = 4` / `target = 4`

* `sum = 0`  / `count = 0`

<table style="width: 30em">
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">2</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;">3</td>
  </tr>
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82; background-color: #5f3aff; color: #fff">s, e</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle;"></td>
  </tr>
</table>

#### 1단계 


<table style="width: 30em">
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">2</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;">3</td>
  </tr>
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82; background-color: lightseagreen; color: #fff">s</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82; background-color: palevioletred; color: #fff">e</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle;"></td>
  </tr>
</table>

* `sum = 3`  / `count = 0`

#### 2단계

<table style="width: 30em">
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">2</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;">3</td>
  </tr>
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82; background-color: lightseagreen; color: #fff">s</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82; background-color: palevioletred; color: #fff">e</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;"></td>
  </tr>
</table>

* `sum = 4`  / `count = 1`

#### 3단계

<table style="width: 30em">
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">2</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;">3</td>
  </tr>
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82; background-color: lightseagreen; color: #fff">s</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle; background-color: palevioletred; color: #fff">e</td>
  </tr>
</table>

* `sum = 7`  / `count = 1`

이때 `sum > target` 성립하였으므로 s포인터 위치를 오른쪽으로 옮겨준다.(s++)

4단계를 미리보면 s위치를 한 번 옮겼는데도 s ~ e까지의 합(sum)이 여전히 target 값을 초과하는 상태이다.
sum이 4이하가 성립할 때까지 s가 이동하도록 반복을 해야한다.
(단, s는 e의 범위를 넘지 않도록 한다.)


#### 4단계

<table style="width: 30em">
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">2</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;">3</td>
  </tr>
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82; background-color: lightseagreen; color: #fff">s</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle; background-color: palevioletred; color: #fff">e</td>
  </tr>
</table>

* `sum = 6`  / `count = 1`

#### 5단계

<table style="width: 30em">
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">2</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82">1</td>
    <td style="width: 25%; text-align: center; vertical-align: middle;">3</td>
  </tr>
  <tr style="border: 1px solid #8e8b82">
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82"></td>
    <td style="width: 25%; text-align: center; vertical-align: middle;border-right: 1px solid #8e8b82; background-color: lightseagreen; color: #fff">s</td>
    <td style="width: 25%; text-align: center; vertical-align: middle; background-color: palevioletred; color: #fff">e</td>
  </tr>
</table>

* `sum = 4`  / `count = 2`

최종결과 count = 3

---

## 문제 풀이

이렇게 정리를 했는데도 코드로 작성할 때 계속 헷갈려서 잘 생각하면서 작성해야했다.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BJ_05_2003 {

    public static void main(String[] args) throws IOException {
        // 입력 스트림 초기화
        BufferedReader br = 
                new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st1 = 
                new StringTokenizer(br.readLine(), " ");

        // 숫자열 범위(range)와 타겟 숫자(target)
        int range = Integer.parseInt(st1.nextToken());
        int target = Integer.parseInt(st1.nextToken());

        // start, end 포인터 초기화
        int s = 0;
        int e = 0;
        int sum = 0;
        int count = 0;
        
        // 다음줄 숫자열를 입력받아 int[]에 저장
        String line = br.readLine();
        int[] arr = Arrays.stream(line.split(" "))
                .mapToInt(Integer::parseInt)
                .toArray();

        // 종료 조건
        while (e < range) {
            
            sum += arr[e];
            e++;

            //  sum값이 target보다 커졌을 때 반복. s가 e를 넘지 않도록 설정 유의!
            while (sum > target && s < e) {
                // s범위를 축소하기 앞서 합계에서 arr[s]값을 제외해준다.
                sum -= arr[s];
                // s범위 축소
                s++;
            }

            if (sum == target) {
                count++;
            }
        }

        //count  반환
        System.out.println(count);
        
        //br 자원 해제
        br.close();
    }
}
```

