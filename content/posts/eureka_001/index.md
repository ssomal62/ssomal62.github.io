---
layout : post
title : "Eureka 마이크로서비스 아키텍쳐 설계"
date: 2024-07-08
summary: 
categories : [ eureka ]
tags : [  ]
---



[//]: # (최신 기술은 이전 기술을 내포하거나 이전보다 발전되어 나온다.)

지난 3일간의 강의에서 eureka 서버 구조를 처음 접했다. 최신 설계 구조라고해서 구글링을 했는데 이미 4-5년 전부터 작성된 기술 블로그 글들이 빼곡히 페이지를 채웠다. 괜히 긴장이 됐다. 구현해봐야 할 기능들은 너무나 많은데, 언제 다하고있나.

작은 규모 프로젝트라도 전반에 걸친 경험을 해보자는 취지에서 정말 최소한의 기능으로 이 모든 것들의 과정을 익히기 위한 프로젝트를 시작한다.

<br/>

> 이번 프로젝트에서 경험하고자 하는 핵심 사항들


* `Eureka 마이크로서비스 아키텍쳐` - 마이크로서비스 간의 서비스 등록과 발견을 관리 경험
* `OAuth2 및 JWT` - OAuth2를 사용한 인증 및 권한 부여와 JWT 토큰 기반 인증을 구현
* `QueryDSL` - 타입 안전한 쿼리 작성 도구 사용해보기
* `MapStruct` - 객체 매핑을 위한 MapStruct를 사용해서 DTO와 엔티티 간의 변환을 자동화
* `Resilience4j` - 회복성 있는 애플리케이션을 위해 회로 차단기 패턴 등 사용
* `Spring WebFlux` - 논블로킹 방식 구현 경험
* `EventListener, EventPublisher`  - 애플리케이션 내의 비동기 이벤트 처리
* `TDD` - 테스트 주도 개발 방법론을 적용
* `Swagger` - API 문서화


<br/>

"차근차근 시작해보자."


---


구상한 서비스는 카페 웹앱이다. 프론트만 고민하다가는 시간이 너무 지체될 것 같아 구조를 잡아가면서 생각해보고자 한다. [트리](#프로젝트-구조)에는 아직 [넣지 못한 기능들](#추후-확장해서-공부해야-할-것들)이 있지만 우선은 뼈대를 만들어 기초 세팅을 완료해보자.


## 계획한 프로젝트 순서

{{< mermaid >}}
graph LR
A[아키텍처 설계 및 생성] --> B[Docker Compose 배포]
B --> C[Jenkins CI/CD]
C --> D[개발 시작]
D --> E[기능 확장]
{{</ mermaid >}}

## 프로젝트 구조

```go {linenos=table, hl_lines=[3, 6, 9, 12, 15, 18, 21, 25]}
/demo-app
├── .gitlab-ci.yml (또는 Jenkinsfile, .circleci/config.yml)
├── api-gateway
│   ├── src
│   └── Dockerfile
├── user-service
│   ├── src
│   └── Dockerfile
├── product-service
│   ├── src
│   └── Dockerfile
├── order-service
│   ├── src
│   └── Dockerfile
├── payment-service
│   ├── src
│   └── Dockerfile
├── eureka-server
│   ├── src
│   └── Dockerfile
├── config-server
│   ├── src
│   └── Dockerfile
├── docker-compose.yml
├── config-repo
│   ├── user-service.yml
│   ├── product-service.yml
│   ├── order-service.yml
│   ├── payment-service.yml
│   └── api-gateway.yml
├─── security
│    └── oauth2
│        ├── client-config.yml
│        └── resource-server-config.yml
├── swagger
├── user-service
└── openapi.yaml
```

<br/>



## Eureka Github 레퍼런스

* [Simple Version Architecture](https://github.com/spring-guides/gs-service-registration-and-discovery)
* [Production-like Architecture](https://github.com/spring-cloud/spring-cloud-netflix)


중간중간 막힐 때마다 참고할 스프링 공식 문헌 레퍼런스이다. 심플 버전과 실제 서비스 유형 버전이 있다.

<br/>



## 추후 확장해서 공부해야 할 것들


아래 기능들은 구현 희망사항으로 남겨놓는다.


1. 로그 및 모티터링 : ELK Stack (Elasticsearch, Logstash, Kibana), Prometheus 및 Grafana

```go {linenos=table, hl_lines=[3]}
/demo-app
...
├── monitoring
│   ├── prometheus.yml
│   ├── grafana
│   │   └── dashboards
│   └── logstash.conf
...
```


2. ServiceMesh

```go {linenos=table, hl_lines=[3]}
/demo-app
...
├── k8s-deployment
│   ├── api-gateway-deployment.yml
│   ├── user-service-deployment.yml
│   ├── product-service-deployment.yml
│   ├── order-service-deployment.yml
│   ├── payment-service-deployment.yml
│   ├── eureka-server-deployment.yml
│   ├── config-server-deployment.yml
│   └── istio-gateway.yml
├── istio
├── gateway.yaml
├── virtual-service.yaml
└── destination-rule.yaml
```

3. 마이크로서비스 간의 비동기 메시징 시스템 - Apache Kafka, RabbitMQ

```go {linenos=table, hl_lines=[3]}
/demo-app
...
├── messaging
│   ├── kafka
│   │   ├── kafka-producer.yml
│   │   └── kafka-consumer.yml
│   └── rabbitmq
│       ├── rabbitmq-producer.yml
│       └── rabbitmq-consumer.yml
```

