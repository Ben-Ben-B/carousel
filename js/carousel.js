/**
 * Created by Thinkpad on 2017/8/29.
 */
    function Carousel(option){
    this.carousel=null;
    this.init(option);
    this.index=0;
}
Carousel.prototype={
    constructor:Carousel,
    init:function(option){
        this.getEles(option);
        this.mouseOver();
        this.right();
        this.left();
        if(option.autoPlay){
            this.autoPlay();
            this.overStop();
            this.outStart();
        }

    }
    ,
    getEles:function(option){
        this.carousel=document.getElementById(option.carousel);
        this.c=this.carousel.children[0];
        this.circles=this.carousel.children[1].children;
        this.leftBtn=this.carousel.children[2];
        this.rightBtn=this.carousel.children[3];
    },
    mouseOver:function(){
        var _this=this;
        for(var i=0;i<this.circles.length;i++){
            var circle=this.circles[i];
            circle.index=i;
            circle.onmouseover=function(){
                _this.circleHandle(this);
                _this.index=this.index;
            };

        }
    },
    circleHandle:function(ele){
        var currentWidth= this.c.children[0].offsetWidth;
        var target=-ele.index*currentWidth;
        //this.index=ele.index;
        this.animation(target);
        //this.c.style.marginLeft=-ele.index*currentWidth+"px";
        for(var j=0;j<this.circles.length;j++){
            this.circles[j].classList.remove("active")
        }
        //console.log(ele)
        ele.classList.add("active")

    },
    right:function(){
        var _this=this;
        this.rightBtn.onclick=function(){
            _this.rightHandle()
        };
    },
    rightHandle:function(){
        this.index++;
        if(this.index>=this.c.children.length){
            this.index=0
        }
        var currentWidth= this.c.children[0].offsetWidth;
        var target=-currentWidth*this.index;
        this.animation(target);
        //this.c.style.marginLeft=-currentWidth*this.index+"px";
        for(var i=0;i<this.circles.length;i++){
            this.circles[i].classList.remove("active");
        }
        this.circles[this.index].classList.add("active")
    },
    left:function(){
        //    Ïò×óÒÆ¶¯
        var _this=this;
        this.leftBtn.onclick=function(){
             _this.leftHandle()
        }
    },
    leftHandle:function(){
        this.index--;
        if(this.index<0){
            this.index=this.c.children.length-1;
        }
        var currentWidth= this.c.children[0].offsetWidth;
        var target=-currentWidth*this.index;
        this.animation(target);
        //this.c.style.marginLeft=-currentWidth*this.index+"px";
        for(var i=0;i<this.circles.length;i++){
            this.circles[i].classList.remove("active");
        }
        this.circles[this.index].classList.add("active")
    },
    autoPlay:function(){
        var _this=this;
         this.timer=setInterval(function(){
            _this.rightHandle()
        },2000)
    },
    overStop:function(){
        var _this=this;
        this.carousel.onmouseover=function(){
            clearInterval(_this.timer)
        }
    },
    outStart:function(){
        var _this=this;
        this.carousel.onmouseout=function(){
            _this.timer=setInterval(function(){
                _this.rightHandle()
            },2000)
        }
    },
    animation:function(target){
        clearInterval(this.timerId)
        var _this=this;
        var currentLeft=this.c.children[0].offsetLeft;
        var step=800;
      this.timerId=setInterval(function(){
          currentLeft+=target>=currentLeft?step:-step;
            _this.c.style.marginLeft=currentLeft+"px";
            if(Math.abs(target-currentLeft)<step){
                _this.c.style.marginLeft=target+"px";
                clearInterval(_this.timerId)
            }
        },17)
    }
}








