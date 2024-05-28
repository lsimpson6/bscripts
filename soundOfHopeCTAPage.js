    const toMeasure = document.querySelectorAll('.measure-on-scroll');
    const scrollNextButtons = document.querySelectorAll('.scroll-next');
    var fade = document.querySelectorAll('.fade-custom');
    var bannerX = -50;
    var widgetsToAnimate = ['.inner-bcs-text.text-lg', '#w7 .card', '#contact p'];

    window.addEventListener('load', ()=>{
        try{
            fade.forEach(e => {
                let t = e.getBoundingClientRect().top;
                if(t <= window.innerHeight){
                    e.classList.replace('fade-custom', 'fade-shown');
                }
            })
        }catch(e){

        }
    })

    window.addEventListener('scroll', ()=>{
        animateStaticElements();
        hideFirstElementAfterScroll();
        fadeAnimation();
        if(document.getElementById('number').getAttribute('scrolled') != "true" && document.getElementById('number').getBoundingClientRect().top <= window.innerHeight/1.5){
            countNumbers();
        }
    })

    function animateStaticElements(){
        try{
            widgetsToAnimate.forEach(w => {
                let widget = document.querySelectorAll(w);
                widget.forEach(el =>{
                    if(el.getAttribute('data-isset') != 'true'){
                        el.setAttribute('data-isset', 'true');
                        el.classList.add('fade-custom');
                    }
                })
            })
        }catch(e){

        }
    }

    function hideFirstElementAfterScroll(){
        var sy = window.scrollY;
        try {
            if(sy > (window.innerHeight + window.innerHeight/3)){
                document.getElementById('t1').style="opacity: 0 !important; z-index: -999;";
            }else {
                document.getElementById('t1').style="";
            }
        }catch(e){

        }
    }

    function fadeAnimation(){
        try{
            document.querySelectorAll('.fade-custom').forEach(e => {
                let t = e.getBoundingClientRect().top;
    
                if(t <= window.innerHeight/1.5){
                    e.classList.replace('fade-custom', 'fade-shown');
                }
            })
        }
        catch(e){

        }
    }

    function countNumbers(){
        var starting = 375000;
        const incr = 125;
        var target = 400000;
        const time = 2.5;
        try{
            setInterval(()=>{
                if(starting < target){
                    starting += incr;
                    let tmp = starting.toString();
                    let a = tmp.substring(0, 3);
                    let b = tmp.substring(3, 6);
                    let str = a + ',' + b + '+';
                    document.getElementById('number').textContent = str;
                }
            }, time)
            document.getElementById('number').setAttribute('scrolled', "true");
        }catch(e){}
    }

    function jsScrollToPageElement(x){
        try {
            let headerHeight = document.getElementById('header-and-navigation-2024').clientHeight;
            let element = document.querySelector(x);
            let t = element.getBoundingClientRect().top - headerHeight - 50 + window.scrollY;
            window.scrollTo({
                top: t,
                left: 0,
                behavior: "smooth"
            })
        }catch(e){
            console.log(e);
        }
    }


    document.querySelector('.postalcode-input').addEventListener('input', (e)=>{
        try {
            volunteer(e.target.value);
        }catch(e){

        }
    })

    function volunteer(value){
        try{
            const go = document.getElementById('volunteer-go-btn');
            const container = document.getElementById('volunteer-form');
            const url = '/step-up/volunteer?postalCode=';
            let postalCodeUrl = url + value;
            go.setAttribute('href', postalCodeUrl);
    
            if(value.toString().length == 5){
                container.setAttribute('data-valid', "true");
            }else {
                container.setAttribute('data-valid', "false");
            }
        }catch(e){}
    }

    function slideBackgroundIn() {
        try{
            document.querySelectorAll('.highlight-blue.swipe').forEach(e => {
                let t = e.getBoundingClientRect().top;
    
                if(t <= window.innerHeight/1.5){
                    e.classList.replace('swipe', 'swiped');
                }
            })
        }
        catch(e){

        }
    }

    toMeasure.forEach(el =>{
        try{
            let height = getLargestScrollCard();
            el.style = 'max-height: ' + height + 'px; min-height: ' + height + 'px;';
        }catch(e){}
    })

    function getLargestScrollCard(){
        try{
            var init = 0;
            toMeasure.forEach(m => {
                if(m.clientHeight > init){
                    init = m.clientHeight;
                }
            })
            return init;
        }catch(e){

        }
    }

    const scrolls = document.querySelectorAll('.scroll-arrow');
    scrolls.forEach(sc => sc.addEventListener('click', ()=>{
        try{
            const container = document.querySelector('.cards-container');
            const superW = document.querySelector('.cv').clientWidth;
            
            switch (sc.getAttribute('data-direction')){
                case "right":
                    let r = '+=' + superW;
                      $(container).animate({
                        scrollLeft: r
                      }, 300, 'swing');
                    break;
                case "left":
                        let l = '-=' + superW;
                      $(container).animate({
                        scrollLeft: l
                      }, 300, 'swing');
                    break;
                case "right-super":
                    let t = '+=' + superW;
                      $(container).animate({
                        scrollLeft: t
                      }, 300, 'swing');
                    break;
            }
        }catch(e){}
    }))
