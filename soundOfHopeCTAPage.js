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
        const inc = 5;
        var start = 300000;
        const end = 400000;

        setInterval(()=>{
            if(start <= end){
                start = inc + start;
                console.log(start);
            }
        }, 100)
    })
