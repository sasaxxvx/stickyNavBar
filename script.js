// sticky navbar

// 捕捉scrollTop的高度

// 捕捉每个banner的top 和 bottom 的高度。

class stickyNavigation {

    constructor() {
        this.currentId = null;
        this.currentNav = null;
        this.navHeight = 70;
        let self = this;

        $('.eachNav').click(function(){
            self.onNavClick(event, $(this))
            // 如果这里填if，就会script.js:16 Uncaught TypeError: this.onNavClick is not a function
            // console.log(event, $(this))
            // console.log(event, $(self))
            // self: 是stickyNavigation; this是a.eachNav

        })
            
        

        $(window).scroll(()=>{this.onScroll();})  

        // $(window).resize(()=>{this.onResize();})
    }

    onNavClick(event, element){
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.navHeight +1;
        // console.log(scrollTop);
        $('html, body').animate({scrollTop: scrollTop}, 600)
        //这个函数写完，实现，预留预留一个navbar的高度；
        //可以手动定位scollTop；
    }

    onScroll(){
       this.checkNavTopPosition();
    //    this.findCurrentNavAndBanner();
       //scoll的时候发生两件事
       // 1. stick nav
       // 2. scorllTop确定哪个Nav被激活
       this.findCurrentNav();
    }

    checkNavTopPosition(){
        let navTopThreshold = $('.headerAndNav').offset().top +$('.headerAndNav').height()-this.navHeight;
        let navTopThreshold2 = $('.nav').offset().top;
        // console.log(navTopThreshold, navTopThreshold2)
        // 结果一样的，这两种写法

        if($(window).scrollTop()>navTopThreshold){
            
            $('.nav').addClass('nav--fixedTop');
        // 切记，addClass里面没有.
            
        }else{
            $('.nav').removeClass('nav--fixedTop');

        }

    }

    findCurrentNav(element){
        let newCurrentId;
        let newCurrentNav;
        let self= this;
    //    const navTop = $('.nav').offset().top;
    //    console.log("navTop is: " + navTop)
    //    console.log("scrollTop is " + $(window).scrollTop())
    // 当fixed nav bar出现之后， scrollTop和navTop是一样的，也就是最上面的哪条才是scrollTop；
       $('.eachNav').each(function(){
           let id = $(this).attr('href');
        //    😭为什么这里用this？指的是eachNav，下面的self指的是整个obj。
          let bannerTop = $(id).offset().top - self.navHeight
          let bannerBottom = $(id).offset().top + $(id).height() - self.navHeight; 
          if($(window).scrollTop()>bannerTop && $(window).scrollTop()<bannerBottom){
            
            // $('.navLiner').css({'width': $('.eachNav').css('width')})
            newCurrentId = id;
            newCurrentNav = $(this);
          }
       });

       if(this.currentId != newCurrentId || this.currentId === null){
           this.currentId = newCurrentId;
           this.currentNav = newCurrentNav;
           this.setNavLinerCss();
       }


    }

    setNavLinerCss(){
        console.log('执行了setcss');
        console.log(this.currentNav);
        let width=0;
        let left=0;
        if(this.currentNav){
            width = this.currentNav.css('width');
            left = this.currentNav.offset().left;
        }

        $('.navLiner').css('width', width);
        $('.navLiner').css('left', left);



        
    }






}

new stickyNavigation();