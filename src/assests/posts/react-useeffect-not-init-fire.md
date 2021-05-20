---
title: '[React] useEffect不想在初始render時被觸發'
date: '2021/04/30'
tags: ['technical', 'React']
---

## useEffect()
React Hook中，`useEffect`可以處理component的side effect(例如fetch、改變DOM)，並在官網文件中提示「可以把`useEffect`視為 class component中 `componentDidMount`，`componentDidUpdate`和`componentWillUnmount`的組合」。  
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
先看一下`useRef`的用法：
```javascript
const refExample = useRef('initValue');
```

`useRef`會建立一個物件(`refExample`)，並有`current`屬性。
```javascript
console.log(refExample.current); // 'initValue'
```

大部分使用到`useRef`的機會是在DOM物件上綁定一個ref，方便對這個DOM操作，像是：
```javascript
const App = () => {
    const divRef = useRef();
    const handleClick = () => {
        console.log(divRef.current.innerHTML) // 'div ref'
    };
    return (
        <div ref={divRef} onClick={handleClick}>div ref</div>
    );
};
```
對`div`綁定一個ref，可以透過`useRef`取得DOM的內容。需要注意的是，這個物件的值改變並不會觸發re-render。

將`useEffect`和`useRef`結合，可以建立一個custom hook，暫時命名叫做`isFirstRender`:
```javascript
import { useRef, useEffect } from 'react';

export const useIsFirstRender = () => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        isFirstRender.current = false;
    }, []);
    return isFirstRender.current;
};
```
在這個hook一開始，先給`isFirstRender`一個初始值`true`，並在`useEffect`第一次render前就返回其current值(`true`)，之後再執行useEffect中的第一個函式，將`isFirstRender.current`設為`false`，而往後的每一次re-render，`isFirstRender.current`都會是`false`。

## 怎麼使用
首先將上述的`useIsFirstRender`引入所需的component，並在`useEffect`的函式中加入判斷：
```javascript
import React, { useEffect } from 'react';
import { useIsFirstRender } from './useIsFirstRender';

const YourComponent = () => {
    const isFirstRender = useIsFirstRender();

    useEffect(() => {
        if (!isFirstRender) {
            console.log('Not First Render');
        }
    });

    return {
        isFirstRender ? <div>First Render</div> : <div>Not First Render</div>;
    }
};
```
這樣子就能夠跳過第一次render時就觸發`useEffect`中的函式，在想要的時候再觸發。

參考來源
1. [With useEffect, how can I skip applying an effect upon the initial render?](https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render)