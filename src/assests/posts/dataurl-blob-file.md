---
title: '[JS] dataURL, Blob, File'
date: '2021/04/15'
tags: ['Technical', 'React', 'JavaScript']
---

專案開發時，系統簽核流程需要有簽名板功能並存成圖片，經過搜尋之後選擇使用[signature_pad](https://github.com/szimek/signature_pad)。這個套件使用起來非常簡單，`npm install signature_pad`之後再`import`至需要的地方，並用`new`創建一個實例即可使用。在使用這個套件時，會依序遇到dataURL、Blob還有最後儲存的File，在了解後簡單紀錄一下這三者之間的差別與關聯。

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
Blob是<ins>B</ins>inary <ins>L</ins>arge <ins>Ob</ins>ject的縮寫，將檔案轉換為一個不可變物件。如果要建立一個Blob物件，可以使用`Blob()`建構式，如下：
```javascript
var blob = new Blob([{ foo: 'bar' }], {type : 'application/json'})
console.log(blob) // Blob {size: 15, type: "application/json"}
```
`Blob()`建構式接受兩個參數：`blobParts`(陣列)及`BlobPropertyBag`(物件，有`type`和`endings`屬性)，建構出的Blob物件會有兩個屬性`size`及`type`。  
為什麼提到Blob呢？因為signature_pad這個套件會將簽名版存成dataURL，如果想下載或是透過API傳回server，需要先將dataURL轉換為Blob，再轉換為File。以下程式碼是從signature_pad demo頁面[原始碼](https://github.com/szimek/signature_pad/blob/1912e2c58946c833934ab8dea5780d635654ab7d/docs/js/app.js)中擷取出來，可以將dataURL轉成Blob。
```javascript
function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,'); // 將輸入的dataURL以成';base64,'分割出mediatype和data
    var contentType = parts[0].split(":")[1]; // mediatype中如果有':'，捨棄前面的部分
    var raw = window.atob(parts[1]); // atob()函式將data從ascii轉換為binary
    var rawLength = raw.length; // 資料長度
    var uInt8Array = new Uint8Array(rawLength); //建立Uint8Array

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i); // 轉換成UTF-16 charCode
    }

    return new Blob([uInt8Array], { type: contentType }); //返回建構出的Blob物件
}
```
  

## File
File繼承自Blob，多了`name`、`lastModified`、`lastModifiedDate`、`webkitRelativePath`等屬性，要將Blob轉換成File，可以用File()建構式：
```javascript
function blobToFile(blob, fileName){       
    return new File([blob], fileName, { lastModified: new Date().getTime(), type: blob.type })
}
```
將轉換過後的File加入FormData中，就可以傳回給後端處理。  
(實際上，在`<input type='file'>`中取得的FileList，就是由File組成的陣列。)

## Reference
1. [MDN - data URIs](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
2. [MDN - FileReader.readAsDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)
3. [MDN - Blob](https://developer.mozilla.org/zh-TW/docs/Web/API/Blob)
4. [signature_pad](https://github.com/szimek/signature_pad/blob/1912e2c58946c833934ab8dea5780d635654ab7d/docs/js/app.js)
5. [MDN - File.File()](https://developer.mozilla.org/zh-TW/docs/Web/API/File/File)
6. [How to convert Blob to File in JavaScript](https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript)