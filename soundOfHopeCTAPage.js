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

    row.forEach(r => r.addEventListener('click'), ()=>{
        try {
            let value = r.getAttribute('data-targetElement');
            ScrollToNext(value);
        }catch(e){
            
        }
    })

    function ScrollToNext(value){
        try {
            window.scrollTo({
                top: row[value].getBoundingClientRect().top,
                left: 0,
                behavior: "smooth",
            })
        }catch(e){
            
        }
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
                container.scrollLeft(500);
                break;
            case "left":
                container.scrollLeft(0);
                break;
        }

    }))
