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
    
    window.addEventListener('scroll', ()=>{
        const rounds = document.querySelectorAll('.round');
        
        var sy = window.scrollY;
        const banner = document.getElementById('scrolling-banner');

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

        if(document.getElementById('number').getAttribute('scrolled') != "true"){
            countNumbers();
            document.getElementById('number').setAttribute('scrolled', "true");
        }

    })

    function countNumbers(){
        var starting = 375000;
        const incr = 25;
        var target = 400000;
        const time = 1;
        setInterval(()=>{
            if(starting <= target){
                starting += incr;
                let tmp = starting.toString();
                let a = tmp.indexOf(0, 2);
                let b = tmp.substring(3, 5);
                document.getElementById('numbers').textContent = a + ',' + b + '+';
            }
        }, time)
    }

    const row = document.querySelectorAll('.bcs-widget-row');
    scrollNextButtons.forEach(btn => btn.addEventListener('click', ()=>{
        console.log('clicked a');
        try {
            let value = btn.getAttribute('data-target-element');
            let element = document.getElementById(value);
            window.scrollTo({
                top: element.getBoundingClientRect().top,
                left: 0,
                behavior: "smooth"
            })
            console.log(value);
        }catch(e){
            console.log(e);
        }
    }))



    toMeasure.forEach(el =>{
        let height = getLargestScrollCard();
        el.style = 'max-height: ' + height + 'px; min-height: ' + height + 'px;';
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
                  $(container).animate({
                    scrollLeft: '+=100'
                  }, 300, 'swing');
                break;
            case "left":
                  $(container).animate({
                    scrollLeft: '-=100'
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
