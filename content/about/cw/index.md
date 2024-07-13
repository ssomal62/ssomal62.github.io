---
layout: post
title: "Cherry Weather"
date: 2024-07-06
summary: "체리웨더 프로젝트 요약입니다."
categories: [ project ]
tags: [ project ]
---

# ✨ 프로젝트 소개

[🌐 GitHub](https://github.com/ssomal62/cherryweather)　[🌐 YouTube - 프로젝트 시연 영상](https://youtu.be/7pjfnpkY5rc?si=jy0YFM9TY1vKEkIT)

> Presentation

<div class="iframe-container" style="position: relative; width: 100%; height: 0; padding-bottom: 60%; border: 0; border-radius: 3em">
<iframe src="https://onedrive.live.com/embed?resid=CD903676BB4589EE%2157856&authkey=!AGeOZKiA-pwrdpU&em=2" frameborder="0" scrolling="no"
style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0"> </iframe>
</div>




[CherryWeather](#✨-프로젝트-소개)는 날씨를 기반 <u>커뮤니티</u> 추천 + AI를 이용한 복장 추천 서비스입니다.

* 프로젝트 기간 : 2024.1.29. ~ 2024.03.07.
* 인원 : 6명

<br/>

> 프로젝트 목표


* 🌥️ 사용자에게 오늘 날씨 및 주간 날씨 그 외 기상과 대기 관련 정보를 제공합니다.
* 👕 오늘 날씨에 적합한 복장을 대화형 AI 채팅을 통해 추천해줍니다.
* 🙏🏼 커뮤니티 결합으로 날씨에 어울리는 클럽을 추천, 클럽 활동 공간(채팅, 소모임, 피드)을 제공합니다. 



<br/>

> 기술 스택

|                                 |                                                                                                                                                                                                                                                                                                                                                           |
|:-------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|             `Back`              | Java17, SpringBoot3.2.2, Spring Security, JPA, Redis, JWT, Oauth2, WebClient, Aws-Java-SDK(Object Storage), Log4j2                                                                                                                                                                                                                                        |
|             `Front`             | React, React-Router, React-cookie, HTML5, JavaScript, Axios, Recoil, NextUI, Swiper, Figma, TailWindCSS, ApexCharts, cross-env, CSS3, Notification, Framer-motion                                                                                                                                                                                         |
| `Naver Cloud` <br/>&<br/> `API` | LinuxServer(ubuntu-20.04), Cloud DB for MySQL, ObjectStorage, NaverLogin, Cloud DB for Redis, Image Optimizer, NCP GeoLocation, OpenAI-Chat(ChatGPT3.5-Turbo), OpenAI-Images(Dall.E-3), KaKao Login, NCloud Chat, Web-push, ip-api, firebase cloud, react-daum-postcode, Ncloud Chat JavaScriptSDK, 공공데이터포털-기상청API, 공공데이터포털-한국환경공단API, 공공데이터포털-한국천문연구원API |
|        `Tool` & `CI/CD`         | Git, GitHub, Jenkins, Docker, DockerHub, Gradle, npm, IntelliJ, VS Code, Discord, Slack, Trello, DB-Diagram.io, MySQL Workbench, Postman                                                                                                                                                                                                                  |

<br/>


---

# ✨ 담당 역할 및 경험

## ▪ 백엔드

#### <span class='font-emphasis-bg'>구현 기능</span>

- `클럽, 멤버십, 좋아요, 피드` CRUD 기능을 구현하였습니다.
- <span class="font-emphasis-underline">Specification API</span>을 사용하여 포괄적인 클럽 검색 기능을 구현하였습니다.
- 불변성을 유지하는 방법에 익숙해지기 위해 <span class="font-emphasis-underline">@Builder 패턴, record, Optional</span> 를 사용하였습니다.

<br/>

{{< alert "comment">}}
<b>마주한 문제들 - 백엔드 편</b>
{{< /alert >}}

<span style="margin-bottom: 10px; margin-top: 10px;"></span>


<details>
<summary style="font-size: large;">
반복되는 검증 작업을 효율적으로 처리할 수 있을까.
</summary>
<br/>
<table style="font-size: medium; margin-top: -10px; margin-bottom: -10px">
  <tbody>
    <tr>
      <td>
 <span class="font-emphasis-bg-gray ml-2">고민의 발단</span>
<ul>
  <li>클럽 데이터를 저장하거나 업데이트할 때, 유효하지 않은 데이터가 저장되는 것을 방지할 검사가 필요했습니다. </li>
  <li>@Valid 어노테이션을 사용한 기본 유효성 검사 방법도 있었지만, 더 유연하고 재사용이 가능한 검증 로직을 모색했습니다.</li>
  <li>빌더 패턴처럼 메서드 체이닝 방식을 사용하면 가독성이 향상되고, 재사용을 선택적으로 할 수 있을 것 같아서 조사해보았습니다. 그 결과, 메서드 체이닝의 핵심은 객체 자체를 반환하는 return this; 라는 것을 알게 되었습니다.</li>
</ul>
</td>
    </tr>
    <tr>
      <td>
<span class="font-emphasis-bg-gray ml-2">메서드 체이닝 검증 클래스 작성</span>
<ul>
<li>유효성 검사 로직을 캡슐화하기 위해 ClubValidator 클래스를 작성했습니다.</li>
<li>ClubValidator는 Club 엔티티를 매개 변수로 받아 생성자를 통해 초기화하고, ClubValidator of(Club club) 메서드는 Club 객체를 받아 ClubValidator 객체를 생성합니다.</li>
<li>Club 엔티티의 필드 값을 검증하는 각각의 메서드를 만들고 로직을 구현합니다. 여기서 유효성 검사를 통과하지 못하면 errors 리스트에 오류 메시지를 추가합니다.</li>
<li>각 검증 메서드는 return this;를 사용하여 ClubValidator 자신을 반환해주었습니다. 이로써 모든 검증 메서드는 ClubValidator 타입을 반환하여 메서드 체이닝이 가능하게 합니다.</li>
</ul>

{{< mermaid >}}

classDiagram
direction LR
class ClubValidator {
-Club club
-List~String~ errors
+of(Club) ClubValidator
+isValid() boolean
+validateName() ClubValidator
+validateCode() ClubValidator
+validateActivityArea() ClubValidator
+validateCategory() ClubValidator
+validateStatus() ClubValidator
+getErrors() List~String~
}
ClubValidator --> Club

    class Club {
        -String name
        -String code
        -String activitiesArea
        -Category category
        -Status status
        -　　　. . .
    }

{{< /mermaid >}}
</td>
    </tr>
    <tr>
      <td>
<span class="font-emphasis-bg-gray ml-2">적용 결과</span>
<ul>
  <li>클럽 데이터를 검증하는 작업이 더욱 체계적이게 되었습니다. </li>
  <li>가독성이 향상되고 재사용이 가능하여 작업의 효율을 높였습니다. </li>
  <li>새로운 검증 규칙이 필요할 때는 메서드를 추가하고 체이닝하여 사용할 수 있어 확장성이 용이합니다.</li>
</ul>
</td>
    </tr>
  </tbody>
</table>
<br/>
</details>

<hr style="margin-bottom: 10px; margin-top: 10px; border-color: #6326C2"/>

<details>
<summary style="font-size: large;">
검색할 때 클럽 이름뿐만 아니라 관련있는 클럽들을 모두 불러왔으면 좋겠어.
</summary>
<br/>
<table style="font-size: medium; margin-top: -10px; margin-bottom: -10px">
  <tbody>
    <tr>
      <td>
 <span class="font-emphasis-bg-gray ml-2">고민의 발단</span>
<ul>
      <li>
      검색키워드 하나로 클럽 이름, 소개글, 카테고리, 활동 지역이 일치하는 데이터를 가져오고, 별도로 사용자가 카테고리나 활동 지역을 지정했을 경우 일치하는 클럽 목록을 모두 보여주고 싶었습니다. </li>
   <li>ClubValidator를 메서드 체이닝 방식으로 구성했던 것을 떠올려, '검색 쿼리 또한 비슷하게 할 수 있지 않을까?' 조사하여 찾은 방법이 Specification API 이었습니다.
      </li>
</ul>
</td>
    </tr>
    <tr>
      <td>
<span class="font-emphasis-bg-gray ml-2">Specification 적용 과정</span>
<ul>
<li>
쿼리용 리포지토리를 별도로 생성하여 JpaRepository외에 JpaSpecificationExecutor을 상속받도록 하였습니다.
</li>
<li>
 Specification&lt;T&gt;의 toPredicate를 호출하여 검색조건들을 완전 일치(equal), 부분 일치(like), 비교(greaterThanOrEqualTo) 쿼리를 사용하여 해당되는 root(클럽 엔터티)는 Specification&lt;Club&gt;으로 반환하도록 각각 메서드를 작성하였습니다. 
</li>
<li>
이렇게 작성한 쿼리 메서드는 ClubQueryService에서 Specification 객체를 생성하여 필요한 쿼리 메서드들로 조합합니다. 하나의 쿼리메서드를 거쳐 나온 클럽 데이터들은 다음 쿼리메서드에서 and 연산을 통해 기존 데이터에 결합됩니다. 
</li>
<li>
이러한 방식으로 원하는 조건을 만족시킨 클럽 목록을 사용자에게 반환하도록 하였습니다.
</li>
</ul>


{{< mermaid >}}
sequenceDiagram
actor Client
participant ClubQueryService
participant ClubSpecification
participant ClubRepository

Client->>ClubQueryService: findAllByConditions(ClubQueryDTO)
ClubQueryService->>ClubSpecification: buildSpecification(ClubQueryDTO)
ClubSpecification-->>ClubQueryService: Specification
ClubQueryService->>ClubRepository: findAll(Specification)
ClubRepository-->>ClubQueryService: List&lt;Club&gt;
ClubQueryService->>ClubQueryService: convertToClubListDTO(List&lt;Club&gt;)
ClubQueryService-->>Client: ClubListDTO
{{< /mermaid >}}

</td>
    </tr>
    <tr>
      <td>
<span class="font-emphasis-bg-gray ml-2">적용 결과</span>
<ul>
      <li>사용자가 입력한 키워드가 클럽의 여러 속성(이름, 설명, 태그 등)과 일치하는 모든 클럽을 조회할 수 있도록 하였습니다.</li>
      <li>여러 페이지에서 특정 조건에 맞는 클럽 목록을 효율적으로 조회하고 데이터를 반환할 수 있게 되었습니다.</li>
      <li>각 검색 조건을 별도의 메서드로 분리했기 때문에 추가적인 조건이 생겼을 때 확장이 용이하다는 것을 알게되었습니다.</li>
</ul>
</td>
    </tr>
    <tr>
      <td>
<span class="font-emphasis-bg-gray ml-2">그 후</span>
<ul>
<li>프로젝트 종료 후 최신 트렌드를 조사하다가 <span class="font-emphasis-underline">Querydsl</span>을 알게 되었습니다.</li>
<li>Specification과 Querydsl은 동적으로 쿼리를 작성하는 점에서는 동일하지만, Querydsl은 타입 안전성, 가독성, 오류 감소, 복잡한 비즈니스 로직 처리에 더 유리합니다.</li>
<li>앞으로의 프로젝트에서 Querydsl을 학습하여 적용해보려고 합니다.</li>
</ul>
</td>
    </tr>
  </tbody>
</table>
<br/>
</details>

<hr style="margin-bottom: 10px; margin-top: 10px; border-color: #6326C2"/>

<details>
<summary style="font-size: large;">
좋아요 기능과 클럽 성장 지수 관리의 충돌 문제
</summary>
<br/>
<table style="font-size: medium; margin-top: -10px; margin-bottom: -10px">
  <tbody>
    <tr>
      <td>
 <span class="font-emphasis-bg-gray ml-2">고민의 발단</span>
<ul>
      <li>
사용자가 클럽에 좋아요를 누를 때 LikeService에서 로직을 처리함과 동시에 클럽의 성장 지수를 증가시켜야 하는 상황에서 서비스 간의 기능 충돌이 발생했습니다.
      </li>
      <li>
이전 세미프로젝트에서 이벤트 리스너를 사용하여 서비스 간의 직접 결합을 피하고 느슨한 결합을 구현한 경험이 있었습니다. 비동기로 여러 작업을 처리했던 경험을 바탕으로, 이 방법을 통해 서비스 간 충돌 문제를 해결할 수 있을 것이라 판단하여 적용해보기로 했습니다.
</li>
</ul>
</td>
    </tr>
    <tr>
      <td>
<span class="font-emphasis-bg-gray ml-2">Specification 적용 과정</span>
<ul>
<li>
좋아요 이벤트가 발생했을 때 클럽의 성장 지수를 업데이트하기 위해 ClubGrowthEvent를 정의했습니다.
이 이벤트는 클럽 ID, 증가 여부, 사용자 정보, 증가할 점수를 포함합니다.
</li>
<li>
좋아요가 추가되거나 제거될 때 ClubGrowthEvent를 발생시키도록 LikeService에서 이벤트 퍼블리셔를 호출했습니다. 좋아요가 추가되면 성장 지수를 증가시키고, 좋아요가 제거되면 성장 지수를 감소시키는 이벤트를 발생시킵니다. 
</li>
<li>
이 때 발생된 이벤트를 처리하는 ClubEventListener를 구현하여 ClubGrowthEvent를 처리하도로 하였습니다.
</li>
</ul>

{{< mermaid >}}

sequenceDiagram
participant LikeService
participant EventPublisher
participant ClubEventListener
participant ClubService

    LikeService->>EventPublisher: ClubGrowthEvent 발행
    EventPublisher->>ClubEventListener: ClubGrowthEvent 전달
    alt 좋아요 추가
        ClubEventListener->>ClubService: increaseGrowthMeter()
    else 좋아요 제거
        ClubEventListener->>ClubService: decreaseGrowthMeter()
    end

{{< /mermaid >}}



</td>
    </tr>
    <tr>
      <td>
<span class="font-emphasis-bg-gray ml-2">적용 결과</span>
<ul>
      <li>이벤트 리스너를 도입함으로써 LikeService와 ClubService 간의 충돌 문제를 해결할 수 있었습니다.</li>
      <li>클럽 성장 이벤트를 MembershipService에서도 활용하여, 멤버 가입 시 발생하는 성장 점수를 쉽게 관리할 수 있게 되었습니다. </li>
</ul>
</td>
    </tr>
    <tr>
  </tbody>
</table>
<br/>
</details>

<hr style="margin-bottom: 10px; margin-top: 10px; border-color: #6326C2"/>



<br/>

## ▪ 프론트엔드

#### <span class='font-emphasis-bg'>구현 기능 및 기여</span>

- `클럽, 멤버십, 좋아요, 피드, 검색, 마이페이지` 기능과 화면 작업을 하였습니다.
- NextUI와 TailwindCSS를 사용하여 앱 전반적인 디자인 및 UI를 개선하였습니다.
- Framer-motion, Swiper, ApexCharts 라이브러리 사용하여 사용자 경험을 향상시켰습니다.

[//]: # (    - Framer-motion : 클럽 생성 정보를 여러 화면으로 분할하여 슬라이드 방식으로 자연스럽게 다음 화면으로 넘어가도록 구현)

[//]: # (    - Swiper : 클럽 내 소모임과 피드를 좁은 영역에서도 효과적으로 노출할 수 있도록 Swiper를 활용)

[//]: # (    - ApexCharts : 클럽 상승 지수를 도넛 차트로 시각화하여 정보를 직관적으로 제공)

<br/>


{{< alert "dev">}}
<b>문제 해결 과정</b>
{{< /alert >}}

<span style="margin-bottom: 10px; margin-top: 10px;"></span>

<details>
<summary style="font-size: large;">
페이지별 유연한 레이아웃 구성할 수 있도록 구현
</summary>
<br/>
<table style="font-size: medium; margin-top: -10px; margin-bottom: -10px">
  <tbody>
    <tr>
      <td class="about-tr">필요성</td>
      <td>
<ul>
      <li>Layout 공용 컴포넌트에 포함된 Header와 Footer가 Club 상세페이지에는 불필요</li>
      <li>Club 상세페이지만의 이벤트를 처리할 커스텀 Header 필요</li>
</ul>
</td>
    </tr>
    <tr>
      <td class="about-tr">해결 방법</td>
      <td>
<ul>
      <li>각 페이지 컴포넌트에서 헤더와 푸터를 조건부로 렌더링할 수 있도록 변경</li>
      <li>기본 레이아웃을 제공하면서, <span class="font-emphasis-underline">Prop 속성에 Boolean 값을 사용</span>하여 필요에 따라 Header와 Footer를 포함하거나 제외할 수 있도록 개선 </li>
</ul>
</td>
    </tr>
    <tr>
      <td class="about-tr">결과</td>
      <td>
<ul>
      <li>Header와 Footer가 필요한 페이지에서만 렌더링되도록 하여, 페이지별로 적절한 레이아웃을 쉽게 구성할 수 있게 함.</li>
</ul>
</td>
    </tr>
  </tbody>
</table>


</details>
<hr style="margin-bottom: 10px; margin-top: 10px; border-color: #6326C2"/>


<details>
<summary style="font-size: large;">
Recoil 기반 Club(club) 데이터 관리 기능 개선
</summary>
<br/>
<table style="font-size: medium; margin-top: -10px; margin-bottom: -10px">
  <tbody>
    <tr>
      <td class="about-tr">필요성</td>
      <td>
<ul>
      <li>Club 기능의 여러 API 호출 로직에서 중복된 코드가 많아 Recoil 코드를 모듈화 할 방법을 고민</li>
</ul>
</td>
    </tr>
    <tr>
      <td class="about-tr">해결 방법</td>
      <td>
<ul>
      <li>Club 데이터를 관리하는 useClubData 훅을 만들어, API 호출 로직을 통합하고 간소화</li>
      <li>useClubData 훅에서 <span class="font-emphasis-underline">동적으로 경로와 메서드 타입을 받아 처리</span>할 수 있도록 함</li>
</ul>
</td>
    </tr>
    <tr>
      <td class="about-tr">결과</td>
      <td>
<ul>
      <li>API 호출 로직을 모듈화하여 재사용 가능하고 확장 가능한 구조로 개선</li>
      <li>코드 중복을 줄여, 가독성과 유지보수성을 높임</li>
</ul>
    </tr>
  </tbody>
</table>
</details>
<hr style="margin-bottom: 10px; margin-top: 10px; border-color: #6326C2"/>





<br/>

## ▪ 그 외

* Trello 설계 및 관리
    - 프로젝트 진행 상황을 효율적으로 관리하기 위해 <span class='font-emphasis'>트리거</span>를 설계하고 운영했습니다. 이를 통해 <span class="font-emphasis-underline">팀의 작업 상황을 직관적</span>으로 확인할 수 있었습니다.

* 최종 발표 준비
    - [PPT 제작](https://onedrive.live.com/embed?resid=CD903676BB4589EE%2157856&authkey=!AGeOZKiA-pwrdpU&em=2) - 프로젝트의 주요 내용을 효과적으로 전달하기 위해 최종 발표용 PPT를 제작했습니다.
    - [영상 제작](https://youtu.be/7pjfnpkY5rc?si=jy0YFM9TY1vKEkIT) - 프로젝트 시연과 주요 기능을 시각적으로 보여주기 위해 데모 영상 및 발표 영상을 제작했습니다.

---

# ✨ 회고 및 향후 계획

#### 전체 시스템 설계 능력

* 프론트엔드와 백엔드를 모두 경험하면서 전체적인 흐름을 파악했습니다. 클라이언트와 서버 간의 효율적인 데이터 통신을 위한 <span class="font-emphasis-underline">최적의 아키텍처를 설계</span>하는 방법을 경험했습니다..

#### 협업 경험

* 팀장으로서 공통 기능 점검, 회의 주도, 진행 상황 조정, 갈등 해결 및 원활한 협업 환경을 조성하는 역할을 했습니다.

#### 향후 계획

* 이후에는 개인 프로젝트를 진행하며 백엔드 전체 구조를 빠짐없이 이해하고 싶습니다. NoSQL 등 다양한 데이테베이스를 다뤄보고, 쿼리 DSL을 사용해보고 싶습니다. 최신 기술 트렌드를 찾아 경험하고, CI/CD, 도커 등과 같은 배포 경험과 운영(Ops) 역량을 강화하고자 합니다.
