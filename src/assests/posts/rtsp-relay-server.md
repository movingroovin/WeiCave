---
title: '[Node.js] 建立簡易RTSP中繼Server整合串流資源'
date: '2021/12/17'
tags: ['Technical', 'Streaming', 'Node.js']
---

## 緣由
公司其他部門來了一個需求，想將工程案場中各個分區的CCTV畫面整合。其實一開始有點頭痛，因為大部分CCTV廠商提供的後台系統僅限IE登入，還要安裝一堆網頁元件才能順利看到畫面，實在對使用者不是很友善。  
經過一番和廠商的來回後，確認大部分廠商可以提供rtsp格式的串流供我們介接。原本以為把rtsp放進`<video>`標籤裡，大不了再引入library就好，結果發現原來chrome已經不支援VLC套件使用的NPAPI...。另外也嘗試了vxgplayer這個chrome extension，不過實際使用之後發現不夠穩定，對手機也不支援，再嘗試幾個rtsp來源後決定另尋解法。  

## 解決方案
最後研究拼湊出一個簡單的解決方案，透過建立node.js server，利用FFmpeg中繼rtsp，將之轉為ws(WebSocket)，並在前端網頁使用jmpeg.js播放。
整套方案需要：  
1. Server: [Node.js + NPM](https://nodejs.org/en/) 
2. Convert: [FFmpeg](https://ffmpeg.org/) 
3. Server-side: [node-rtsp-stream](https://github.com/kyriesent/node-rtsp-stream)
4. Client-side: [jmpeg.js](https://github.com/phoboslab/jsmpeg)

### 1. 下載安裝並設定FFmpeg於環境變數(或將ffmpeg.exe執行檔放在專案資料夾)
參考[這篇](https://annkuoq.github.io/blog/2019-12-17-install-ffmpeg/)，安裝FFmpeg並增加於環境變數中。FFmpeg除了本次作為中繼rtsp轉換為WebSocket之外，其實是一個非常強大的視訊處理工具，也可以進行編碼格式轉換、直播推流/拉流等。

### 2. npm init建立Node.js專案；安裝所需npm套件
初始化node專案，我們需要這個Node.js server持續運行爲轉換rtsp至ws。建立好專案後安裝所需npm套件[node-rtsp-stream](https://github.com/kyriesent/node-rtsp-stream)，`npm install node-rtsp-stream`。

### 3. 建立主程式index.js
大致上有以下步驟及注意事項：
- require node-rtsp-stream、建立Stream 物件
- 可引進child_process module子程序模組，定時kill FFmpeg process並重啟Stream 
- ffmpegOptions為FFmpeg參數選項，-map 0:0表示僅轉換視訊channel 

```javascript
const callfile = require('child_process'); 
Stream = require('node-rtsp-stream');

var playlist = []; 

function InitStream() { 
  for (let i = 0; i < streamUrls.length; i++) { 
    for (let j = 0; j < streamUrls[i].urls.length; j++) {
      stream = new Stream({ 
        name: `${streamUrls[i].regionNo}-${j+1}`, 
        streamUrl: streamUrls[i].urls[j].url, 
        wsPort: streamUrls[i].rootPort + j, 
        ffmpegOptions: { // options ffmpeg flags 
          '-stats': '', // an option with no neccessary value uses a blank string 
          '-r': 30, // options with required values specify the value after the key 
          '-map': '0:0', 
          '-rtsp_transport': 'tcp' 
        } 
      }); 
      console.log(`${stream.name} has started.`); 
      playlist.push(stream); 
    }
  } 
} 
InitStream();

// RestartStream
function RestartStream(stream) { 
  callfile.exec(`taskkill /F /PID ${stream.stream.pid}`, null, function (err, stdout, stderr) { 
    console.log('STDOUT:',stdout); 
    let oldStream = playlist.find(play => play.name === stream.name); 
    // 停止串流 
    console.log(`${stream.name} is stopping.`); 
    stream.stop(); 
    console.log(`${stream.name} has stopped.`); 
    // 重啟串流 
    newStream = new Stream(stream.options); 
    oldStream = newStream; 
  }); 
} 
```

### 4. 前端展示
```html
<canvas id="canvas_1" style="width: 440px; height: 350px"></canvas> 
<script type="text/javascript" src="Scripts/jsmpeg.min.js"></script> 
<script type="text/javascript"> var canvas_1 = document.getElementById('canvas_1'); 
let player = new JSMpeg.Player(url, { 
  canvas: document.getElementById(canvasName), // Canvas should be a canvas DOM element 
  disableWebAssembly: true // for iOS safari  
); 
</script> 
```

## 結論
這個解決方案不用安裝其他套件，並支援移動裝置播放。不過後續還需要將ws加上SSL變為wss，有找到另外一個Node.js專案[Node-Media-Server](https://github.com/illuspas/Node-Media-Server)，可以將SSL掛載上去(star還比較多😉)。
串流真是一個不小的坑，不過藉這個機會初窺各種影音格式和傳輸協定，之後有類似需求時就可以此為基礎，再發展出更順暢的解決方案。


Reference:
1. [如何不花錢讓html5播放rtsp視頻流（第二彈）](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/665444/)