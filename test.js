// <!--전체 글 수를 세기 위한 연산. sum 변수에 전체 글 수 저장-->
//
// {% assign sum = site.posts | size %}
//
// <nav class="nav__list">
//   <input id="ac-toc" name="accordion-toc" type="checkbox" />
//   <label for="ac-toc">{{ site.data.ui-text[site.locale].menu_label }}</label>
//   <ul class="nav__items" id="category_tag_menu">
//     <!--전체 글 수-->
//     <li>
//       📂 <span style="font-size: 16px ;">전체 글 수 <span style="color: #0d3b69"><b>{{sum}}</b></span>  개</span>
//
//     </li>
//     <li>
//       <!--span 태그로 카테고리들을 크게 분류 ex) C/C++/C#-->
//       <span class="nav__sub-title">Naver Cloud Camp</span>
//       <!--ul 태그로 같은 카테고리들 모아둔 페이지들 나열-->
//       <ul>
//         <!--Cpp 카테고리 글들을 모아둔 페이지인 /categories/cpp 주소의 글로 링크 연결-->
//         <!--category[1].size 로 해당 카테고리를 가진 글의 개수 표시-->
//         {% for category in site.categories %}
//         {% if category[0] == "java" %}
//         <li><a href="/categories/java" class="">Java ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "js" %}
//         <li><a href="/categories/js" className="">JS ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "db" %}
//         <li><a href="/categories/db" className="">DB ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "spring" %}
//         <li><a href="/categories/spring" className="">Spring ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "springboot" %}
//         <li><a href="/categories/springboot" className="">SpringBoot ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "linux" %}
//         <li><a href="/categories/linux" class="">Linux ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "ncloud" %}
//         <li><a href="/categories/ncloud" className="">nCloud ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//
//       <span class="nav__sub-title">STUDY</span>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "sqrd" %}
//         <li><a href="/categories/sqrd" className="">SQRD ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "devroadmap" %}
//         <li><a href="/categories/devroadmap" class="">Dev rodeMap ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "typing" %}
//         <li><a href="/categories/typing" class="">코딩 필사 ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "cleancode" %}
//         <li><a href="/categories/cleancode" className="">클린코드 ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//
//       <span class="nav__sub-title">Coding Test</span>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "cote" %}
//         <li><a href="/categories/cote" class="">CodingTest ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//
//       <span class="nav__sub-title">ETC</span>
//       <ul>
//         {% for category in site.categories %}
//         {% if category[0] == "study" %}
//         <li><a href="/categories/study" class="">ETC ({{category[1].size}})</a></li>
//         {% endif %}
//         {% endfor %}
//       </ul>
//
//
//     </li>
//   </ul>
// </nav>