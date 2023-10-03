* 설치 참고 : <https://frhyme.github.io/mermaid/Embedding_mermaid_in_github_page/>

* 문법 참고 :
* https://minhan2.tistory.com/entry/Markdown-mermaid-%ED%83%80%EC%9E%85-%EC%A2%85%EB%A5%98
* https://sabarada.tistory.com/210
* https://www.jeong-min.com/47-mermaid/

# 머메이드 드로잉 페이지


```mermaid
erDiagram
  
  "회원" ||--|| "회원상세" : "등록한다"
  
  "(학생)이하울" ||--o{ "(출석부)데이터베이스" : "출석한다/등록된다"
  
  
```

```mermaid

  flowchart LR
  classDef basic fill:#D1E4F6, stroke:#0F477E, stroke-width:0px, color:#0F477E, font-size:14px
    
    i1(우편번호):::basic
    i2(다섯자리 숫자):::basic
    i3(엔터티 정의):::basic
    i4(데이터 타입):::basic
    i5(데이터 크기):::basic
        
    i1-->i2-->i3
    i3-->i4
    i3-->i5
    
```


```mermaid
erDiagram
  "엔터티" ||--|{ "kk" : " "
  INSTANCE ||--|{ ATTRIBUTE :" "
  ATTRIBUTE ||--|| ATTRIBUTE_VALUE :" "
  
```

```mermaid
erDiagram



  "게시글" ||--o{ "댓글" : " "
    "게시글" {
        int list_no PK
        string title
        string content
        string writer
    }
     "댓글" {
        int list_no FK
        int comment_no PK
        string content
        string writer
    }


  "주문번호" ||..o{ "상품" : " "
  "주문번호" {
    int order_no PK
    int product_code FK
    int quantity
  }
  "상품" {
    int product_code PK
    string product_name
    string buyprice
  }
    
```












```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses

```

```mermaid
erDiagram
    Location ||--o{ Person : places


```

```mermaid

flowchart LR
    dix[개념적 
    데이터 모델링]
    -->
    dix1(논리적 
    데이터 모델링)
    
    dix1(논리적 
    데이터 모델링) 
    --> 
    dix2(물리적 
    데이터 모델링)

linkStyle 0 stroke:#0F477E
linkStyle 1 stroke:#0F477E
  
```
