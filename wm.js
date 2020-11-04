
!function () {
  function init () {
    let wm = {
      val: {
        zInd: 0
      },
      toolFuncs: {
        createEle (html) {
          let ele = document.createElement("DIV")
          ele.innerHTML = html;
          return ele.firstChild
        },
        setEventFn (dom, evts, _this) {
          for (let i in evts)
            dom[i] = function(e){evts[i].call(_this,e)}
        },
        getTargetParent (e, r = 1) {
          e.currentTarget = e.currentTarget || e.target
          for (let i = 0; i < e.path.length - r + 1; i++)if (e.currentTarget == e.path[i - r]) return e.path[i];
          return undefined;
        }
      },
      eventFuncs: {
        btn: {
          packup (e) {
            if (wm.toolFuncs.getTargetParent(e, 3).classList.contains("packedup"))
              wm.toolFuncs.getTargetParent(e, 3).classList.remove("packedup")
            else
              wm.toolFuncs.getTargetParent(e, 3).classList.add("packedup")
            this.onpackup.forEach((e)=>{
              e.call(this,e);
            })
          }
        },
        title: {
          move (e) {
            if (wm.val.down) {
              let win = wm.val.lastWin
              win.style.top = wm.val.y - wm.val.tTop + "px"
              win.style.left = wm.val.x - wm.val.tLeft + "px"
            }
          },
          onmousemove (e) {

          },
          onmousedown (e) {
            if (e.buttons != 1) return;
            wm.toolFuncs.getTargetParent(e).style.zIndex = wm.val.zInd++
            wm.val.lastWin = wm.toolFuncs.getTargetParent(e)
            wm.val.down = true
            let moveEleRect = e.currentTarget.getBoundingClientRect()
            wm.val.moveChkHandle = setInterval(wm.eventFuncs.title.move, 0);
            wm.val.tLeft = e.clientX - moveEleRect.left
            wm.val.tTop = e.clientY - moveEleRect.top
          },
          onmouseup (e) {
            wm.val.down = false
            clearInterval(wm.val.moveChkHandle)
          }
        }
      },
      window: function (title) {
        this.setContentURL = function (url) {
          this.contentNode.innerHTML = "<iframe></iframe>"
          this.contentNode.lastChild.src = url
          return this
        }
        this.setContentNode = function (...node) {
          this.contentNode.innerHTML = ""
          this.contentNode.appendChild(...node)
          return this
        }
        let winNode = document.createElement("DIV")
        winNode.classList.add("win")

        let titleNode = document.createElement("DIV")
        titleNode.classList.add("title");
        if (!title)
          titleNode.appendChild(wm.toolFuncs.createEle(`<svg class="drag" width="20" height="20" viewBox="6 6 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 11C14.5523 11 15 10.5523 15 10C15 9.44771 14.5523 9 14 9C13.4477 9 13 9.44771 13 10C13 10.5523 13.4477 11 14 11ZM14 15C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13C13.4477 13 13 13.4477 13 14C13 14.5523 13.4477 15 14 15ZM15 18C15 18.5523 14.5523 19 14 19C13.4477 19 13 18.5523 13 18C13 17.4477 13.4477 17 14 17C14.5523 17 15 17.4477 15 18ZM14 23C14.5523 23 15 22.5523 15 22C15 21.4477 14.5523 21 14 21C13.4477 21 13 21.4477 13 22C13 22.5523 13.4477 23 14 23ZM19 10C19 10.5523 18.5523 11 18 11C17.4477 11 17 10.5523 17 10C17 9.44771 17.4477 9 18 9C18.5523 9 19 9.44771 19 10ZM18 15C18.5523 15 19 14.5523 19 14C19 13.4477 18.5523 13 18 13C17.4477 13 17 13.4477 17 14C17 14.5523 17.4477 15 18 15ZM19 18C19 18.5523 18.5523 19 18 19C17.4477 19 17 18.5523 17 18C17 17.4477 17.4477 17 18 17C18.5523 17 19 17.4477 19 18ZM18 23C18.5523 23 19 22.5523 19 22C19 21.4477 18.5523 21 18 21C17.4477 21 17 21.4477 17 22C17 22.5523 17.4477 23 18 23Z" fill="#6D758D"></path></svg>`))
        else
          titleNode.innerText = title;
        wm.toolFuncs.setEventFn(titleNode, wm.eventFuncs.title)


        let btnNode = wm.toolFuncs.createEle(`<div class="buttons"></div>`)
        let packupBtn = wm.toolFuncs.createEle(`<div class="button packup"><div class="iconUp"></div></div>`); 
        packupBtn.onclick = (e)=>{wm.eventFuncs.btn.packup.call(this,e)}
        btnNode.appendChild(packupBtn);


        let contentNode = wm.toolFuncs.createEle(`<div class="content"></div>`)

        titleNode.appendChild(btnNode)
        winNode.appendChild(titleNode)
        winNode.appendChild(contentNode)

        document.querySelector("body").appendChild(winNode)

        this.winNode = winNode
        this.contentNode = contentNode

        this._overflow = "shown"

        this.onpackup=[]
        this.packup=(fn)=>{
          this.onpackup.push(fn);
        }



        Object.defineProperties(this,
          {
            "overflow": {
              get: function () {
                return this._overflow
              },
              set (a) {
                this._overflow = a;
                this.contentNode.lastChild.style.overflow = a
              }
            },
            "width": {
              get () {
                return this.winNode.offsetWidth
              },
              set (a) {
                this.winNode.style.width = a + "px";
              }
            },
            "height": {
              get () {
                return this.winNode.offsetHeight
              },
              set (a) {
                this.winNode.style.height = a + "px";
              }
            },
            "left": {
              get () {
                return this.winNode.offsetLeft
              },
              set (a) {
                this.winNode.style.left = a + "px";
              }
            },
            "top": {
              get () {
                return this.winNode.offsetTop
              },
              set (a) {
                this.winNode.style.top = a + "px";
              }
            }
          })
      }
    }

    window.onmousemove = function (e) {
      wm.val.x = e.clientX;
      wm.val.y = e.clientY
    }

    window.wm = wm

  }
  init()
}();
