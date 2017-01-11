//@param (ps) 必选，设计稿大小，值为正整数
//@param (ps) 可选，最大设计稿计算，值为正整数，默认4096（4k屏）
//@param (o)  可选，是否宽大于高时（例如横屏） 按高来计算，true || false ，默认为false ，无论哪个大都按这个算
(function(ps,max,o){
    var ps = ps;
    var isMax = max || 4096; 
    var isOrientation = o || false;

    // 系统参数,无需修改
    var Dpr = 1, uAgent = window.navigator.userAgent;
    var isIOS = uAgent.match(/iphone/i);
    var isYIXIN = uAgent.match(/yixin/i);
    var is2345 = uAgent.match(/Mb2345/i);
    var ishaosou = uAgent.match(/mso_app/i);
    var isSogou = uAgent.match(/sogoumobilebrowser/ig);
    var isLiebao = uAgent.match(/liebaofast/i);
    var isGnbr = uAgent.match(/GNBR/i);
    // 储存页面 initial
    var initialScale = 1;   //初始initial
    var initialScale = document.getElementsByTagName('meta')['viewport'].getAttribute("content");
    var iniStr = "initial-scale"
    var firstAdd = initialScale.indexOf(iniStr);
    var eneAdd = initialScale.indexOf("," , firstAdd+1);
    var newStr = initialScale.substring(firstAdd + iniStr.length, eneAdd);
    var initialScale = newStr.replace("=","").replace(/(^\s+)|(\s+$)/g,"");

    function resizeRoot(p){
        // 设计稿大小
        var p = p;
        var dpr = window.devicePixelRatio;
        if(initialScale >= 1){   
                // 抽取某易计算方法
                var psWidth = p / 100;  
                var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth, wDpr, wFsize;
                var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
                if (window.devicePixelRatio) {
                    wDpr = window.devicePixelRatio;
                } else {
                    wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1;
                }
                if(isIOS) {
                    wWidth = screen.width;
                    wHeight = screen.height;
                }
                // if(window.orientation==90||window.orientation==-90){
                //     wWidth = wHeight;
                // }else if((window.orientation==180||window.orientation==0)){
                // }
                if(wWidth > wHeight && isOrientation == true){
                    wWidth = wHeight;
                }
                wFsize = wWidth > isMax ? isMax / psWidth : wWidth / psWidth;
                window.screenWidth_ = wWidth;
                if(isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr){//YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
                    setTimeout(function(){
                        wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth;
                        wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
                        wFsize = wWidth > isMax ? isMax / psWidth : wWidth / psWidth;
                        // document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
                        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
                    },500);
                }else{
                    document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
                }
        }else{
        // 当页面字体有小于极限字体时(去打设计狮咯)，即 viewport的 initial-scale  设置成0.5
            if(isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr){//YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
                setTimeout(function(){
                    var rootWi = document.documentElement.clientWidth;
                    var rootHi = document.documentElement.clientHeight;
                    if(rootWi > rootHi && isOrientation == true){
                        rootWi = rootHi;
                    }
                    rootWi = rootWi > isMax * (dpr/1) ? isMax * (dpr/1) : rootWi;
                    var rootSize = rootWi / p * 100;
                    document.documentElement.style.fontSize = rootSize + "px";
                },500);
            }else{
                var rootWi = document.documentElement.clientWidth;
                var rootHi = document.documentElement.clientHeight;
                if(rootWi > rootHi && isOrientation == true){
                    rootWi = rootHi;
                }
                rootWi = rootWi > isMax * (dpr/1) ? isMax * (dpr/1) : rootWi;
                var rootSize = rootWi / p * 100;
                document.documentElement.style.fontSize = rootSize + "px";
            }
        }
    }
    resizeRoot(ps);
    window.onresize = function(){
        resizeRoot(ps);
    }
}(640))
