---
layout: post
title: "Cherry Weather"
date: 2024-07-06
summary: "체리웨더 프로젝트 요약입니다."
categories: [ project ]
tags: [ project ]
---

# ✨ 프로젝트 소개

[🌐 GitHub](https://github.com/ssomal62/cherryweather)[🌐 YouTube - 프로젝트 시연 영상](https://youtu.be/7pjfnpkY5rc?si=jy0YFM9TY1vKEkIT)

> Presentation

<div class="iframe-container" style="position: relative; width: 100%; height: 0; padding-bottom: 60%; border: 0; border-radius: 3em">
<iframe src="https://onedrive.live.com/embed?resid=CD903676BB4589EE%2157856&authkey=!AGeOZKiA-pwrdpU&em=2" frameborder="0" scrolling="no"
style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0"> </iframe>
</div>




[CherryWeather](#✨-프로젝트-소개)는 날씨를 기반 <u>커뮤니티</u> 추천 + AI를 이용한 복장 추천 서비스입니다.

* 프로젝트 기간 : 2023.1.29. ~ 2024.03.07.
* 인원 : 6명

<br/>

> 프로젝트 목표

- 오늘의 날씨부터 주간 예보까지, 최신 기상 데이터를 기반으로 여러분에게 딱 맞는 옷차림을 추천해드립니다.
- 날씨에 어울리는 스타일 이미지로 매일 아침, 어떤 옷을 입을지 고민하는 시간을 줄여줍니다.
- 커뮤니티 클럽에서는 같은 관심사를 가진 친구들과 Club을 만들고, 채팅으로 실시간 대화는 물론, 날씨 에 어울리는 Club들을 추천해줍니다.

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

#### 구현 기능

- 클럽, 멤버십, 좋아요, 피드 CRUD 구현
- <span class="font-emphasis-underline">Specification API</span>을 사용한 클럽 검색 기능 구현

<br/>

{{< alert "dev">}}
<b>문제 해결 과정</b>
{{< /alert >}}

<span style="margin-bottom: 10px; margin-top: 10px;"></span>

<details>
<summary style="font-size: large;">
포괄적인 클럽 검색 기능 구현을 통한 사용자 경험 향상
</summary>
<br/>
<table style="font-size: medium; margin-top: -10px; margin-bottom: -10px">
  <tbody>
    <tr>
      <td class="about-tr">필요성</td>
      <td>
<ul>
      <li>
      키워드가 일치하는 클럽 이름만 조회뿐만 아니라 소개글, 카테고리, 활동 지역 등 다양한 속성에서의 조회 필요
      </li>
</ul>
</td>
    </tr>
    <tr>
      <td class="about-tr">해결 방법</td>
      <td>
<ul>
      <li>ClubQueryDTO 사용하여 검색 조건을 캡슐화</li>
      <li>ClubQueryService에서 <span class="font-emphasis-underline">Specification을 동적</span>으로 생성하여 쿼리 구성</li>
</ul>
</td>
    </tr>
    <tr>
      <td class="about-tr">결과</td>
      <td>
<ul>
      <li>검색어가 클럽 이름, 소개글, 카테고리, 활동 지역등 여러 속성에서 조회됨</li>
      <li>동적 쿼리를 통해 정확하고 포괄적인 검색 결과를 반환</li>
      <li>각 검색 조건을 별도의 메서드로 분리했기 때문에 유지보수가 용이</li>
</ul>
</td>
    </tr>
    <tr>
      <td class="about-tr">향후 과업</td>
      <td>
<ul>
      <li>프로젝트 종료 후 최신 추세를 조사하여 <span class="font-emphasis-underline">Querydsl</span>을 알게됨</li>
      <li>Querydsl은 타입 안정성, 가독성, 오류 감소, 복잡한 비즈니스 로직 처리에 유리</li>
      <li>앞으로의 프로젝트에서 Querydsl을 학습하여 적용할 계획</li>
</ul>
</td>
    </tr>
  </tbody>
</table>
<br/>
{{< mermaid >}}
sequenceDiagram
participant Client
participant Service as ClubQueryService
participant Repository as ClubQueryRepository

    Client->>Service: 검색 조건 전달
    Service->>Service: ClubQueryDTO에서 조건 추출
    Service->>Service: Specification 생성 및 조합
    Service->>Repository: 최종 쿼리로 클럽 목록 조회
    Repository->>Service: 클럽 목록 반환
    Service->>Client: 검색 결과 반환

{{< /mermaid >}}

</details>
<hr style="margin-bottom: 10px; margin-top: 10px; border-color: #6326C2"/>


<details>
<summary style="font-size: large;">
이벤트 리스너와 이벤트 퍼블리셔를 사용한 클럽 관리 개선
</summary>
<br/>
<table style="font-size: medium; margin-top: -10px; margin-bottom: -10px">
  <tbody>
    <tr>
      <td class="about-tr">필요성</td>
      <td>
멤버십
<ul>
      <li>
        클럽이 생성될 때마다 해당 클럽의 멤버십을 자동으로 생성할 필요가 있었음
      </li>

</ul>
클럽 성장 지수
<ul>
      <li>
        멤버십 서비스에서 발생하는 이벤트에 따라 업데이트됐어야했지만 <span class="font-emphasis-underline">클럽서비스가 이중으로 호출</span>되어 문제가 발생
      </li>
</ul>
</td>
    </tr>
    <tr>
      <td class="about-tr">해결 방법</td>
      <td>
      멤버십
        <ul>
              <li> 클럽 생성 이벤트를 처리하여 클럽 생성 시 자동으로 생성</li>
        </ul>
      클럽 성장 지수
        <ul>
              <li> 멤버십 서비스에서 발생하는 이벤트를 <span class="font-emphasis-underline">클럽 이벤트리스너로 전달</span></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="about-tr">결과</td>
      <td>
멤버십
<ul>
      <li>클럽 생성과 관련된 멤버십 생성 로직을 분리하여 코드의 응집도가 높아지고 모듈화 향상</li>
</ul>
클럽 성장 지수
<ul>
      <li> <span class="font-emphasis-underline">이벤트 퍼블리셔를 사용하여 클럽 서비스가 이중으로 호출되는 문제를 해결</span>하고, 멤버십 서비스에서 발생하는 이벤트에 따라 클럽의 성장 지수를 정확히 업데이트</li>
</ul>
공통
<ul>
      <li>이벤트 기반 설계를 통해 새로운 요구사항이나 기능 추가 시 기존 코드를 수정하지 않고도 쉽게 확장</li>
</ul>
    </tr>
  </tbody>
</table>
<br/>

{{< mermaid >}}
sequenceDiagram
User->>ClubService: 클럽 생성
ClubService->>EventPublisher: 이벤트 발행
EventPublisher->>ClubEventListener: 이벤트 처리
ClubEventListener->>MembershipService: 멤버십 생성
{{< /mermaid >}}

<br/>

{{< mermaid >}}
sequenceDiagram
MembershipService->>EventPublisher: 성장 이벤트
EventPublisher->>EventQueue: 이벤트 큐에 이벤트 추가
EventQueue->>ClubEventListener: 이벤트 전달
alt 성장 지수
ClubEventListener->>ClubService: 지수 증가
else
ClubEventListener->>ClubService: 지수 감소
end
{{< /mermaid >}}

</details>
<hr style="margin-bottom: 10px; margin-top: 10px; border-color: #6326C2"/>


<br/>

## ▪ 프론트엔드

#### 구현 기능 및 기여

- 클럽, 멤버십, 좋아요, 피드, 검색, 마이페이지 화면 구성
- NextUI와 TailwindCSS를 사용하여 앱 전반적인 디자인 및 UI개선
- Framer-motion, Swiper, ApexCharts 라이브러리 사용하여 사용자 경험 향상
    - Framer-motion : 클럽 생성 정보를 여러 화면으로 분할하여 슬라이드 방식으로 자연스럽게 다음 화면으로 넘어가도록 구현
    - Swiper : 클럽 내 소모임과 피드를 좁은 영역에서도 효과적으로 노출할 수 있도록 Swiper를 활용
    - ApexCharts : 클럽 상승 지수를 도넛 차트로 시각화하여 정보를 직관적으로 제공

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
      <li>기본 레이아웃을 제공하면서, Prop 속성에 Boolean 값을 사용하여 필요에 따라 Header와 Footer를 포함하거나 제외할 수 있도록 개선 </li>
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
      <li>useClubData 훅에서 동적으로 경로와 메서드 타입을 받아 처리할 수 있도록 함</li>
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
    - <span class='font-emphasis'>PPT 제작</span> - 프로젝트의 주요 내용을 효과적으로 전달하기 위해 최종 발표용 PPT를 제작했습니다.
    - <span class='font-emphasis'>영상 제작</span> - 프로젝트 시연과 주요 기능을 시각적으로 보여주기 위해 데모 영상 및 발표 영상을 제작했습니다.

---

# ✨ 성장과 이후 계획

### 전체 시스템 설계 능력

프론트엔드와 백엔드를 모두 경험하면서 전체적인 흐름을 파악했습니다. <span class="font-emphasis-underline">클라이언트와 서버 간의 효율적인 데이터 통신을 위한 최적의 아키텍처를 설계하는 방법을 경험</span>했습니다..

### 협업 경험

팀장으로서 공통 기능 점검, 회의 주도, 진행 상황 조정, 갈등 해결 및 원활한 협업 환경을 조성하는 역할을 했습니다.

### 향후 계획

이후에는 개인 프로젝트를 진행하며 백엔드 전체 구조을 빠짐없이 이해하고 싶습니다. NoSQL 등 다양한 데이테베이스를 다뤄보고, 쿼리 DSL을 사용해보고 싶습니다. 최신 기술 트렌드를 찾아 경험하고, CI/CD, 도커 등과 같은 배포 경험과 운영(Ops) 역량을 강화하고자 합니다.
