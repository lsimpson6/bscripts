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

    function ScrollToNext(value){
        const row = document.querySelectorAll('.bcs-widget-row');
        window.scrollTo({
            top: row[value].getBoundingClientRect().top,
            left: 0,
            behavior: "smooth",
        })
    }
