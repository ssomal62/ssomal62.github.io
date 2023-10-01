* 설치 참고 : <https://frhyme.github.io/mermaid/Embedding_mermaid_in_github_page/>

* 문법 참고 :
* https://minhan2.tistory.com/entry/Markdown-mermaid-%ED%83%80%EC%9E%85-%EC%A2%85%EB%A5%98
* https://sabarada.tistory.com/210
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
    dix(개념적 
    데이터 모델링) 
    --> 
    dix1(논리적 
    데이터 모델링)
    
    dix1(논리적 
    데이터 모델링) 
    --> 
    dix2(물리적 
    데이터 모델링)
  
```
