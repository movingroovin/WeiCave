---
title: '[React] 用Promise連續更新state'
date: '2021/06/12'
tags: ['React']
---

## 遇到的問題：setState是非同步的
必須承認標題描述得有點不精確，就先讓我描述一下遇到了什麼問題。  
`useState`基本上是學React hook會碰到的第一個鉤子，`const [num, setNum] = useState(0);`回傳狀態(`Num`)和更新狀態的函式(`setNum`)的用法也很好理解。一切看似很順利，直到發現了更新狀態後，如果要馬上取值，竟然還維持在上一個狀態。舉例來說：
```js
const App = () => {
    const [num, setNum] = useState(0);
    const handleClick = () => {
        setNum(num+1);
        console.log(num);
    };
    return (
        <>
            <button onClick={handleClick}>+1<button/>
            <span>{num}</span>
        </>
    )
};
export default App;
```
每次點擊按鈕，畫面上顯示的數字的確有增加，但是在實際上`console.log`出來的`num`還維持在上一個階段。這邊就牽扯到在狀態改變後，React內部設計會怎麼re-render整個頁面；而要解決這個問題，因為`setState`本身是非同步的動作，過去在寫class component時，可以使用`setState`的第二個參數callback傳入function達到效果：
```js
// ...
constructor(props) {
    super(props)
    this.state = 0;
}
const handleClick = () => {
    this.setState(num+1, function() {
        console.log(num);
    });
};
// ...
```

## useState hook
### useEffect
不過在用useState hook處理這個問題的時候，因為`useState`沒有callback的設計，建議搭配`useEffect`使用處理side effect，將state帶入dependency list：
```js
// ...
useEffect(() => {
    console.log(num);
}, [num])
// ...
```
當useEffect感受到`num`的變化，就會執行useEffect中的第一個函式。這樣子做會產生一個狀況，在第一次render頁面時也會執行useEffect，造成預期外的效果。

### Promise
也可以使用`Promise`建立custom hook(__Reference #2__)：
```js
import { useState, useEffect, useRef, useCallback } from 'react';

const useStateWithPromise = (initialState) => {
    const [state, setState] = useState(initialState);
    const resolveRef =  useRef(null);
  
    useEffect(() => {
        if (resolveRef.current) {
            resolveRef.current(state);
            resolveRef.current = null;
        }
    }, [state]);
  
    const handleSetState = useCallback((newState) => {
        setState(newState));
        return new Promise(resolve => {
            resolveRef.current = resolve;
        });
    }, [setState])
  
    return [state, handleSetState];
  };

  export default useStateWithPromise;
```
這個custom hook對原始的useState做了一點小改造，先以useRef建立一個`resolveRef`，並在useState的setter另外傳回一個`Promise`，當`Promise`成功完成時，將`resolveRef.current`設為resolve function，state被改變之後觸發useEffect，執行resolve function。  
而使用方法可以用`then()`串接，如下：
```js
import useStateWithPromise from './useStateWithPromise';

const App = () => {
    const [num, setNum] = UseStateWithPromise(0);
    const handleClick = () => {
        setNumP(num+1).then((res) => {
            console.log(res); //這時候的res就是更新後的num
        });
    };
    return (
        <>
            <button onClick={handleClick}>+1<button/>
            <span>{num}</span>
        </>
    )
};

export default App;
```

雖然達到需求可以回傳更新後的值，不過這個解法是有點anti-pattern的。有興趣的話可以看一下React Github上面的[issue](https://github.com/reactjs/rfcs/issues/98)，討論為什麼不在useState設計和setState一樣的callback，有一則回應也有提到如何在hook建立類似setState的callback。

Reference:
1. [Eddy 思考與學習 - 為何說setState方法是異步的](https://eddychang.me/why-setstate-is-async)
2. [useStateWithPromise: a custom hook to await state updates of useState](https://ysfaran.github.io/blog/post/0002-use-state-with-promise/)