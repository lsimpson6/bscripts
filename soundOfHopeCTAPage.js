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

    scrollNextButtons.forEach(r => r.addEventListener('click'), ()=>{
        try {
            let value = r.getAttribute('data-target-element');
            ScrollToNext(value);
        }catch(e){
            
        }
    })


    function ScrollToNext(value){
        try {
            window.scrollTo({
                top: row[value].getBoundingClientRect().top,
                left: 0,
                behavior: "smooth"
            })
            console.log(value + "" + row[value]);
        }catch(e){
            console.log(e);
        }
    }

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

    const scrolls = document.querySelectorAll('.scroll-arrow');
    scrolls.forEach(sc => sc.addEventListener('click', ()=>{

        const container = document.querySelector('.cards-container');

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
                  $(container).animate({
                    scrollLeft: '+=250'
                  }, 300, 'swing');
                break;
        }

    }))
