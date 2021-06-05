---
title: '[JS] class和function'
date: '2021/06/03'
tags: ['Technical']
---

## 宣告方式
開門見山，直接看JavaScript中`function`和`class`各自怎麼建立類別，這邊用**影視作品**作例子：

### 使用function建立建構子
```js
function Video(title, year, topCast) {
    // Attributes
    this.title = title; //名稱
    this.year = year; //年份
    this.topCast = topCast; //主要演員
}

// Method
Video.prototype.info = function() {
    console.log(`${this.title}, released on ${this.year}, is staring ${topCast.join()}.`);
}

// static method (靜態方法，只有function可以使用，new出來的instatnce不能使用)
Video.yearCompare = function() {
    console.log(`${m1.title} is released ${m1.year >= m2.year ? 'later' : 'earlier'} than ${m2.title}}.`);
}
```
使用function-based 'class'時的注意事項：
1. 慣例上會將屬性和方法分開建立，方法會建立在原型(prototype)上。  
2. 因為this指向問題，不能使用箭頭函式(arrow funciotn)當作建構子

### 使用class建立類別
```js
class Video {
    // Attributes
    constructor(title, year, topCast) {
        this.title = title; //名稱
        this.year = year; //年份
        this.topCast = topCast; //主要演員
    }

    // Method
    info() {
        console.log(`${this.title}, released on ${this.year}, is staring ${this.topCast.join()}.`);
    }

    // static method (靜態方法，只有class可以使用，new出來的instatnce不能使用)
    static yearCompare(m1, m2) {
        console.log(`${m1.title} is released ${m1.year >= m2.year ? 'later' : 'earlier'} than ${m2.title}.`);
        console.log(this); // ***這裡的this是Video這個class本身***
    }

    // Getter (不建議)
    get abbrIntro() {
        return `${this.title}(${this.year})`;
    }

    // Setter (不建議)
    set setTitle(input) {
        this.title = input;
    }
}
```
使用class注意事項：
1. 使用`constructor`建立和初始化類別，一個`class`只能有一個`constructor`
2. 方法(Method)直接寫在類別裡
3. 相較於`function`，`class`**沒有**hoisting，所以在使用時需注意程式順序
3. `getter`和`setter`因為可能會造成不在預期內的副作用，不建議使用

## 類別的繼承

**影集(TVShow)**繼承自**影視作品(Video)**：

### 使用function
```js
function TVShow(title, year, topCast, season) {
    // Attributes
    Video.call(this, title, year, topCast);
    this.season = season;
}

// 使用Object.create()繼承方法
TVShow.prototype = Object.create(Video.prototype); // 將Video的原型指派給TVSHow，以繼承所有方法及屬性
TVShow.prototype.constructor = TVShow; // 若沒有這行，TVShow.prototype的constructor會是Video()
TVShow.prototype.info = function() {
    console.log(`${this.title}, released on ${this.year}, is staring ${this.topCast.join()}.`);
    console.log(`This TV show has ${this.season} season(s) currently.`);
}
```
注意事項：
1. 父類別的屬性使用`call()`，將`this`綁定至子類別
2. 父類別的方法，則使用`Object.create()`指派方法給子類別

### 使用class
```js
class TVShow extends Video {
    // Attributes
    constructor (title, year, topCast, season) {
        super(title, year, topCast);
        this.season = season; // 共有幾季
    }

    // Method
    info() {
        super.info();
        console.log(`This TV show has ${this.season} season(s) currently.`);
    }
}
```
class繼承：
1. 使用`extends`搭配`super`繼承來自父類別的屬性及方法 

## 小結
相較function-based，class這個ES6出現的*語法糖*將類別的建立包裝為語意更加明確的寫法；但以function方式建立類別，對於實際原型鍊的形成方式會更加清楚。


Reference:
1. [MDN - Classes](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes)
2. [MDN - JavaScript 中的「繼承」](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Inheritance)
3. [phchender - [JS] JavaScript 類別（Class）](https://pjchender.dev/javascript/js-class/)
4. [shubo - [教學] 深入淺出 JavaScript ES6 Class (類別)](https://shubo.io/javascript-class/#%E7%94%A8-extends-%E7%B9%BC%E6%89%BF%E9%A1%9E%E5%88%A5)
