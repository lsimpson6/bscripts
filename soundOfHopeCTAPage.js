    const toMeasure = document.querySelectorAll('.measure-on-scroll');
    const scrollNextButtons = document.querySelectorAll('.scroll-next');
    const fade = document.querySelectorAll('.fade');
    var bannerX = -50;
    window.addEventListener('load', ()=>{
        fade.forEach(e => {
            let t = e.getBoundingClientRect().top;
            if(t <= window.innerHeight){
                e.classList.replace('fade', 'fade-shown');
            }
        })
    })
    var widgetsToAnimate = ['.inner-bcs-text.text-lg', '#w7 .card', '#contact p'];

    window.addEventListener('scroll', ()=>{
        const rounds = document.querySelectorAll('.round');
        // disable mobile menu hide on scroll
        document.getElementById('mobile-header-and-navigation-2024').style = '';
        var sy = window.scrollY;
        const banner = document.getElementById('scrolling-banner');

        widgetsToAnimate.forEach(w => {
            let widget = document.querySelectorAll(w);
            widget.forEach(el =>{
                if(el.getAttribute('data-set') != "true"){
                    el.classList.add('fade');
                    el.setAttribute('data-set', "true");
                }
            })
        })

        if(sy > (window.innerHeight + window.innerHeight/3)){
            document.getElementById('t1').style="opacity: 0 !important;";
        }else {
            document.getElementById('t1').style="";
        }

       // if(banner.getBoundingClientRect().top >= -50){
        //    banner.style = 'left:' + (bannerX - (sy/7)) + 'px;';
       // }
        
        fade.forEach(e => {
            let t = e.getBoundingClientRect().top;

            if(t <= window.innerHeight/1.5){
                e.classList.replace('fade', 'fade-shown');
            }
        })

        
        rounds.forEach(e => {
            let t = e.getBoundingClientRect().top;

            if(t <= window.innerHeight/1.5){
                e.classList.add('shown');
            }
        })

        if(document.getElementById('number').getAttribute('scrolled') != "true" && document.getElementById('number').getBoundingClientRect().top <= window.innerHeight/1.5){
            countNumbers();
            document.getElementById('number').setAttribute('scrolled', "true");
        }

    })

    function countNumbers(){
        var starting = 375000;
        const incr = 125;
        var target = 400000;
        const time = 2.5;
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
    }

    const row = document.querySelectorAll('.bcs-widget-row');
    scrollNextButtons.forEach(btn => btn.addEventListener('click', ()=>{
        const headerHeight = document.getElementById('header-and-navigation-2024').clientHeight;
        try {
            let value = btn.getAttribute('data-target-element');
            let element = document.getElementById(value);
            window.scrollTo({
                top: (element.getBoundingClientRect().top - headerHeight - 50),
                left: 0,
                behavior: "smooth"
            })
        }catch(e){
            console.log(e);
        }
    }))



    toMeasure.forEach(el =>{
        let height = getLargestScrollCard();
        el.style = 'max-height: ' + height + 'px; min-height: ' + height + 'px;';

       // let w = document.querySelectorAll('.card')[1].clientWidth;
       // let h = document.querySelectorAll('.card')[1].clientHeight;

       // document.querySelector('.card.first').style = 'max-height: ' + h + 'px;' + 'min-height: ' + h + 'px;' + 'max-width: ' + w + 'px;' + 'mxin-width: ' + w + 'px;'

    })

    function getLargestScrollCard(){
        var init = 0;
        toMeasure.forEach(m => {
            if(m.clientHeight > init){
                init = m.clientHeight;
            }
        })
        return init;
    }

    const scrolls = document.querySelectorAll('.scroll-arrow');
    scrolls.forEach(sc => sc.addEventListener('click', ()=>{

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

    }))
