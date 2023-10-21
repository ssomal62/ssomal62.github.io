---
title: "Typing"  # 게시물 클릭했을 때 리스트 상단에 보이는 제목
layout: archive
permalink: categories/typing
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.typing %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}