---
title: '[React] 處理多個input變動 handle multiple input'
date: '2021/05/22'
tags: ['Technical', 'React', 'Vue']
---

最初接觸前端框架是從Vue開始的，資料的雙向綁定在面對多個表單欄位時根本不是問題，`v-model`加下去Vue就會接手資料的變動。後來寫到React，對每變動一個input就要設一個function處理onChange這個模式感到有點冗餘，心裡總覺得應該有更聰明的方法。  
先看原本是怎麼處理input的onChange：
```javascript
const App = () => {
    const [formContent, setFormContent] = useState({
        textField1: '',
        textField2: ''
    });

    const handleField1Change = (e) => {
        setFormContent({...formContent, textField1: e.target.value});
    };

    const handleField2Change = (e) => {
        setFormContent({...formContent, textField2: e.target.value});
    };

    return (
        <input type='text' value={formContent.textField1} onChange={handleField1Change}/>
        <input type='text' value={formContent.textField2} onChange={handleField2Change}/>
    )
};
```

可以看到每多一個`<input/>`就要多宣告一個function處理變動是重複性非常高的方式，不管是對開發和維護都會造成困擾，這時就要思考如何不repeat myself：
```javascript
const App = () => {
    const [formContent, setFormContent] = useState({
        textField1: '',
        textField2: ''
    });

    const handleFieldChange = (e) => {
        setFormContent({...formContent, [e.target.name]: e.target.value}); //利用input的name屬性標註欲變動欄位名稱
    };

    return (
        <input type='text' name='textField1' value={formContent.textField1} onChange={handleFieldChange}/>
        <input type='text' name='textField2' value={formContent.textField2} onChange={handleFieldChange}/>
    )
};
```
關鍵在於為每個input賦予特別的name，而這個name需要和欲變動的物件屬性名稱相同，在handle event change的時候利用name找到欄位對應到的物件屬性，重新進行setState。如此一來可以節省很多空間，程式維護起來更加方便。

## 同場加映
附上Vue的雙向綁定以比較兩者差異：
```html
<input type="text" v-model="textFiled1"/>
<input type="text" v-model="textFiled2"/>
```
```js
new Vue({
    el: "...",
    data: {
        textFiled1,
        textFiled2
    }
})
```

## Reference
1. [Handling Multiple Inputs with a Single onChange Handler in React](https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react)
2. [Vue.js - Form Input Bindings](https://vuejs.org/v2/guide/forms.html)