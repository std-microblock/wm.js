# wm.js
Implement the window in the browser!

Example code
```html
<html>
  <script src="wm.js"></script>
  <link rel="stylesheet" href="wm.css">
  <body>
    <style>
      body{
        background: #414141;
      }
    </style>
    <script>
     var win=new wm.window(),a=0
     function foo(){
      let win=new wm.window("Wm.js is pretty good".split(" ")[a++]);
      win.setContentNode(wm.toolFuncs.createEle(`<pre style="margin:15px;color:white;">Wm.js is pretty good!</pre>`))
     }
     win.setContentNode(wm.toolFuncs.createEle("<div onclick='foo()' style='border-radius:10px;user-select:none;color:white;box-shadow:0px 0px 10px black;padding:10px;margin:10px;background:#343434'>点我增加窗口</div>"))

    </script>
   
  </body>
</html>
```
[Result](https://www.bilibili.com/video/BV1M54y1r72o/)
