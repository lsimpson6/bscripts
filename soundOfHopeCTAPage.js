    const toMeasure = document.querySelectorAll('.measure-on-scroll');
    const scrollNextButtons = document.querySelectorAll('.scroll-next');
    var bannerX = -50;
    window.addEventListener('scroll', ()=>{
        const bg = document.querySelectorAll('.bg-highlight');
        const rounds = document.querySelectorAll('.round');
        
        var sy = window.scrollY;
        const banner = document.getElementById('scrolling-banner');

        if(banner.getBoundingClientRect().top <= 0 && banner.getBoundingClientRect().bottom > 0){
            banner.style = 'left:' + (bannerX + (sy/7)) + 'px';
        }

        console.log('t' + banner.getBoundingClientRect().top + ' ');
        console.log('b' + banner.getBoundingClientRect().botom + ' ');
        
        bg.forEach(e => {
            let t = e.getBoundingClientRect().top;

            if(t <= window.innerHeight/1.5){
                e.classList.add('bgSlide');
            }
        })

        
        rounds.forEach(e => {
            let t = e.getBoundingClientRect().top;

            if(t <= window.innerHeight/1.5){
                e.classList.add('shown');
            }
        })
    })

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
