---
title: '[JS] dataURL, Blob, File'
date: '2021/04/15'
tags: ['technical', 'React']
---

專案開發時，系統簽核流程需要有簽名板功能並存成圖片，經過搜尋之後選擇使用[signature_pad](https://github.com/szimek/signature_pad)。這個套件使用起來非常簡單，`npm install signature_pad`之後再`import`至需要的地方，並用`new`創建一個實例即可使用。不過這篇並不是要說明套件如何使用，而是因為在使用這個套件時遇到了dataURL、Blob還有最後儲存的File，所以簡單解釋一下這三者之間的差別與關聯。

## dataURL
dataURL可以理解成一個描述檔案的字串，透過解析這個字串能夠將檔案呈現出來。格式是像這個樣子：  
`data:[<mediatype>][;base64],<data>`  
1. `mediatype`: 描述檔案類型，例如png為`image/png`，預設值為`text/plain;charset=US-ASCII`
2. `;base64`: 是否經過base64編碼
3. `,data`: 檔案本身字串，記得前面有一個「,」
想要實現上傳圖片檔案並顯示縮圖的功能，常常就會用到`FileReader`的`readAsDataURL()`方法，將取得的dataURL放進`<img>`的`src`裡面。以下為React範例：  
```javascript
const UploadExample = () => {
    const [image, setImage] = useState({
        imgURL: ''
    });

    const handleUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            let fileReader = new FileReader();
            fileReader.onload = function() {
                setImage({ ...image, imgURL: e.target.result })
            };
            fileReader.readAsDataURL(e.target.files[0])
        }
    };
    return (
        <img src={image.imgURL}>
        <input type='file' onChange={handleUpload}>
    )
}
```

## Blob

## File

## Reference
1. [MDN - data URIs](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
2. [MDN - FileReader.readAsDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)