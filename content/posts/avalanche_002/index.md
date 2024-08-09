---
layout : post
title : "VirtualBox Ubuntu 및 Termius 설치"
date: 2024-08-08
summary: 
categories : [ avalanche , linux, ubuntu, termius ]
tags : [ project, "항해99" ]
---

약 5년 전에 산 ssd 텅 빈 256GB, 여기서 100GB정도만 서버용으로 할당해서 사용해 볼 예정이다. 
디스크에 리눅스 서버를 다이렉트로 설치할까 고민했지만, 윈도우와 동시에 사용하기에는 듀얼부팅방식으로 접근해야하는 번거로움때문에 오랜만에 VirtualBox를 열었다.

우분투 ISO 파일을 홈페이지에서 다운받았는데, GUI가 나타나 깜짝놀랐다. 알고보니 DESKTOP버전도 있더라.
여하튼 Server 버전으로 ISO를 재다운받았다. 그리운 양강사님의 억양을 떠올리며 세팅에 들어갔다.

## Ubuntu 설치

이전 강의 자료를 보면서 다시 설치해보는데 중요한 부분이 바뀌었다. 바로 파티션 할당이다.

이전에는 boot, root(/), data, swap 4개만 할당했었다. 하지만 이번 프로젝트 특성상 이전보다 용량도 더 필요하고 적합한 파티션을 새로 구성해야했다.

그래서 과정을 다시 처음부터 기록하려고한다.

특별한 설명이 없는 부분은 `Done` 을 바로 눌러주면 된다.




> 1단계 :  영어 선택

![1.png](1.png)

> 2 ~ 5단계 : `Done`

![2.png](2.png)

![3.png](3.png)

![4.png](4.png)

![5.png](5.png)


> 6단계 mirror configuration: 박스 안에 위 화면만큼 출력되면 `Done`

![6.png](6.png)



> `Custom storage layout` 선택 후 `Done`

![7.png](7.png)




파티션은 아래 표에 정리한 대로 할당할 것이다. (100GB 기준)

|파티션|       용량       |   포맷    |마운트 포인트| 설명                                                    |
|:--:|:--------------:|:-------:|:--:|:------------------------------------------------------|
|boot|      1GB       |  ext4   |  /boot     | 커널 및 부트 로더를 저장                                        |
|swap|      4GB       |  swap   |    | 시스템 메모리 부족 시 사용되는 공간                                  |
|root (/)|      15GB      |  ext4   | /   | 시스템의 주요 디렉토리와 파일을 포함. OS와 기본 패키지를 포함                  |
|var|      30GB      |  ext4   | /var | 로그 파일, 데이터베이스 파일 등을 저장. MySQL/PostgreSQL 데이터와 로그를 포함|
|home|      10GB      |  ext4   | /home | 사용자 데이터 및 설정을 저장. 개발 환경에서 사용                       |
|opt|      20GB      |  ext4   | /opt | Docker 및 Docker Compose를 포함한 애플리케이션 데이터를 저장           |
|data| 나머지 공간(약 20GB) |  ext4   | /data| 애플리케이션 데이터, 캐시 데이터, 기타 데이터 저장소로 사용                    |


> 파티션 생성 : `free space` → `Add GPT partition` 

![8.png](8.png)



1. boot 

![9.png](9.png)

2. swap 

![10.png](10.png)

3. root(/) 

![11.png](11.png)

4. var 

![12.png](12.png)

5. home

![13.png](13.png)

6. opt 

* 마운트포인트 Other → 직접 'opt' 입력

![14.png](14.png)


7. data

* 용량을 적지 않으면 남은 용량을 모두 할당
* 마운트포인트 Other → 직접 'data' 입력

![15.png](15.png)


> 파티션 할당 완료

![16.png](16.png)

여기서 `Done`을 하면 경고창이 뜨는데, 기존 데이터를 지우고 새로 설치하는데 이대로 진행할 것인가를 묻는 것이다.
괜히 불길하게 컨티뉴가 붉은 버튼이다. 하지만 `Continue`.

![17.png](17.png)

> Profile 정보 입력

![19.png](19.png)

* Your name: 사용자 이름
* Your server's name: 서버 이름
* Pick a username: 시스템 로그인 사용자 이름
* Choose a password: 로그인 사용자 계정 비밀번호 (root 계정 비밀번호 아님)


> Ubuntu Pro 업그레이드 

![20.png](20.png)

Skip for now가 체크된 그대로 `Continue`

> SSH 설정

![21.png](21.png)

Install OpenSSH server `체크` 후 `Done` (SSH Key 설정은 당장 하지 않아도 된다.)

>  추천 기능 설치 선택

![22.png](22.png)

필요한 파일이 있긴하나 추후 일괄설치하기 위해 이 부분은 `Done`

>  Install 시작

![23.png](23.png)

유의할 점은 설치 도중에 `Cancel update and reboot` 옵션이 뜨면 엔터를 눌러주면 된다.


>  설치 완료 후 로그인

![24.png](24.png)

> 접속 성공!

![25.png](25.png)

`uname -a`로 내 환경을 확인하고,

`df -h`로 수동으로 할당한 디스크 정보도 확인했다.



## Termius 설치

윈도우 환경에서 Ubuntu 서버를 효율적으로 관리하기 위해 SSH 클라이언트를 사용하는 것이 좋다.
과거에는 PuTTY를 사용했지만, 이번에는 Termius를 사용해보려 한다.



|기능|	PuTTY|	Termius (무료)	|Termius (프리미엄)|
|:--:|:--:|:--:|:--:|
|SSH 접속|	기본 제공	|기본 제공	|기본 제공|
|SFTP	|psftp 사용	|기본 제공 없음	|통합 SFTP 클라이언트 제공|
|동기화 기능|	제공하지 않음|	제공하지 않음	|클라우드 동기화 제공|
|터미널 스니펫|	제공하지 않음	|제공하지 않음	|제공|
|자동화 스크립트 실행|	제공하지 않음	|제공하지 않음|	제공|
|사용자 지정 터널링 설정|	기본 제공	|기본 제공|	고급 설정 제공|
|다중 탭 인터페이스|	제공하지 않음	|제공하지 않음	|제공|


14일동안 프리미엄 기능까지 무료로 체험이 가능하고, 이후 무료 플랜으로 변경된다고한다.

Ubuntu 서버에 Termius를 사용하여 접근하고 방법에 대해 정리해보았다.


![img_1.png](img_1.png)

메인 첫번째 메뉴 `Create Host`를 선택한다.

![img_2.png](img_2.png)

아이디 아래 `+`를 누르면 패스워드를 미리 입력할 수 있다.

![img_3.png](img_3.png)

서버를 신뢰할 수 있는지에 대한 확인 과정이다. Add and continue를 클린한다.

![img_4.png](img_4.png)

접속 성공!을 하자마자 바로 눈에 띄는 테마 변경. (폰트 젯브레인모노로 바로 바꿈..)



복사 및 붙여넣기 단축키가  `ctrl + Shift  + C`, `ctrl + Shift  + V` 라고 안내가 나와 굉장히 아쉬웠는데,

![img_5.png](img_5.png)

설정 > 숏컷 설정에서 바로 변경이 가능했다. (안도)

이제 내일 수업을 들으며 무리없이 도커 과정을 따라갈 수 있길.


