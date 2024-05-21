    window.addEventListener('load', ()=>{
        const inc = 50;
        var start = 0;
        const end = 400;
        var time = 100;
        setInterval(()=>{
            if(start < end){
                start = inc + start;
                console.log(start);
                document.getElementById('count-increase').textContent = start + ',000 +';
            }
        }, time)
    })

    const toMeasure = document.querySelectorAll('.measure-on-scroll');
    const scrollNextButtons = document.querySelectorAll('.scroll-next');

    window.addEventListener('scroll', ()=>{
        const bg = document.querySelectorAll('.bg-highlight');
        const rounds = document.querySelectorAll('.round');


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
