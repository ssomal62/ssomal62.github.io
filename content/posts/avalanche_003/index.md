---
layout : post
title : "Ubuntu Docker 및 PostgreSQL 설치"
date: 2024-08-09
summary: 
categories : [ avalanche ]
tags : [ project, "항해99", docker, postgresql ]
---

### Docker

```shell
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Docker를 sudo 없이 사용할 수 있게 설정
sudo usermod -aG docker $USER
```

### PostfreSQL

1. 이미지 다운

```shell
docker pull postgres
```

2. 실행 및 세팅

```shell
# 여기서 mysecretpassword는 초기 비밀번호
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

# 실행 중인지 확인
docker ps
CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS          PORTS                                       NAMES
a40f5784da33   postgres   "docker-entrypoint.s…"   21 seconds ago   Up 20 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   my-postgres


# root 로 DB 접속
docker exec -it my-postgres psql -U postgres


# 새 사용자 생성
CREATE USER myuser WITH PASSWORD 'myuserpassword';

# 새 데이터베이스 생성
CREATE DATABASE mydb;

# 새 사용자에게 데이터베이스 권한부여
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

#psql 종료
\q
```

3. 세팅 후 접속

```shell
docker exec -it my-postgres psql -U myuser -d mydb
```


### 우분투 도커 PostgreSQL 연결

```shell
# PostfreSQL 포트 허용
sudo ufw allow 5432/tcp
```

```shell
# PostgreSQL 설정 확인
docker exec -it my-postgres bash
nano /var/lib/postgresql/data/postgresql.conf

# 1. 다음 줄을 찾아 수정 또는 추가 (내 파일에는 60번째줄)
listen_addresses = '*'

# 1-1. 해당 값 확인하기  ('*')로 되어있다면 1번 패스
grep -n "listen_addresses" /var/lib/postgresql/data/postgresql.conf

# 1-2.편집기를 쓰지않고 수정 하는 방법
echo "listen_addresses = '*'" >> /var/lib/postgresql/data/postgresql.conf

# 2. pg_hba.conf 파일도 수정
nano /var/lib/postgresql/data/pg_hba.conf

# 2-1. 파일 끝에 다음 줄 추가
host    all             all             0.0.0.0/0               md5

# PostgreSQl 재시작
exit 
docker restart my-postgres
```


### 스프링 application.yml 설정

```shell
spring:
  application:
    name: ProjectAvalanche
  datasource:
    url: jdbc:postgresql://192.168.219.101:5432/mydb
    username: username
    password: password
    driver-class-name: org.postgresql.Driver
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    show-sql: true
    hibernate:
      ddl-auto: update
```