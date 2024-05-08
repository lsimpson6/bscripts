    const isMobileDevice = window.innerWidth < 768 ? true : false;
    const fb = document.getElementById('fixed-button');
    const two = document.getElementById('widget-two');
    const head = document.getElementById('head');
    const four = document.getElementById('widget-four');
    const floatingImages = document.querySelector('.floating-images');
    const red = document.querySelectorAll('.highlight-red');

    let sy = 0;
    window.addEventListener('scroll', () => {

        red.forEach(r =>{
            if (r.getBoundingClientRect().top <= window.innerHeight / 2) {
                r.classList.add('show');
            }
        })


        if (sy > window.innerHeight)
        {
            head.style = "opacity: 0;";
        } else {
            if(sy/80 < 1){
                sy = 00;
            }
            head.style = 'filter: blur(' + sy/80 + 'px);';

        }

        if(two.getBoundingClientRect().top <= window.innerHeight/2){
            two.style = "";
        }else {
            two.style = 'filter: blur(10px);';
        }

        if (two.getBoundingClientRect().top <= 0 + fb.clientHeight) {
            fb.style = "position: fixed; top: 0; left: 0; z-index: 20000 !important;";
        }else {
            fb.style = "";
        }

        sy = window.scrollY;
    })

    var isPlaying = false;

    function fullVideo() {

        const styleSettings = 'position: absolute; right: 0; top: 50%; transform: translateY(-50%); transition: .3s ease all;';
        const vSetting = 'width: 100%; object-fit: cover;';
        let container = document.getElementById('possomm-trot-trailer-container');
        let video = document.getElementById('possomm-trot-trailer-video');
        
        if(!isMobileDevice){
            if (isPlaying || video.playing) {
                isPlaying = false;
            } else {
                isPlaying = true;
            }


            if (isPlaying) {
                container.style = 'width: 100%; ' + styleSettings;
                video.style = 'aspect-ratio: 16/9; ' + vSetting;
            } else {
                container.style = 'width: 500px; ' + styleSettings;
                video.style = 'height: 600px; ' + vSetting;

            }
        }
    }
    function scrollToNext(){
        window.scrollTo({
            top: two.getBoundingClientRect().top,
            left: 0,
            behavior: "smooth",
        })
    }

    document.getElementById('first-arrow').addEventListener('click', ()=>{
        scrollToNext();
    })
