---
title: '[React] useEffect不想在初始render時被觸發'
date: '2021/04/30'
tags: ['technical']
---

## useEffect()
React Hook中，`useEffect`可以處理component的side effect(例如fetch、改變DOM)，並在官網教學中提示「可以把`useEffect`視為 class component中 `componentDidMount`，`componentDidUpdate`和`componentWillUnmount`的組合」。  
用法範例為：  
```javascript
useEffect(() => {
    doSomething();
}, [stateA])
```

這個API有兩個arguments，第一個為想要執行的function，第二個則為dependency array；當array裡的值變動時，第一個argumnet的function才會被觸發。  
照上面的說法，可能會以為`useEffect`**只有**在`stateA`改變時觸發。但實際上，`useEffect`在component第一次render時就被觸發了。如果想要避免這個預設行為，該怎麼做呢？  
這時就需要另一個Hook —— `useRef`出馬幫忙了。


## 搭配useRef()

## 使用場景

參考來源
1. [With useEffect, how can I skip applying an effect upon the initial render?](https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render)