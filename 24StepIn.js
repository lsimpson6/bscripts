const currentWindowPath = window.location.pathname;
var initWindowWidth = window.innerWidth;
window.addEventListener('resize', ()=>{
redirect();
}) 

function redirect(){
    var params = new URLSearchParams(window.location.search);
    let width = window.innerWidth;

    if(width != initWindowWidth){
        if(width < 801){
            if(currentWindowPath != '/campaign/step-in'){
                window.location.href = 'https://bethany.org/campaign/step-in?' + params;
            }        
            }else{
            if(currentWindowPath != '/campaigns/step-in/dev'){
                window.location.href = 'https://bethany.org/campaigns/step-in?' + params;
            }
        }
    }
}

function loadingCheck(){
    if(document.querySelector('body').getAttribute('isLoading') == 'true'){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }
}
window.addEventListener('scroll', ()=>{
    loadingCheck();
    scroll_hero();
    init_mobile();
    scroll_buckets();
    all_drawings();
    scroll_whatIf();
    focus_area();
})

function all_drawings(){

    draw_svgDynamic_scroll(".balloon .draw", "#balloon-draw-marker", .05);
    draw_svgDynamic_scroll(".draw-highlight-motivation-a path", "#motivation", 1);
    draw_svgDynamic_scroll(".draw-highlight-motivation-b path", "#motivation", 1);
    draw_svgDynamic_scroll(".draw-highlight-motivation-c path", "#motivation", 1);
    draw_svgDynamic_scroll(".draw-highlight-motivation-d path", "#motivation", 1);
    //draw_svgDynamic_scroll("#timeline .draw-highlight path", "#timeline", 0)
    draw_svgDynamic_scroll(".draw-what-if-a path", "#what-if", 1);
    draw_svgDynamic_scroll(".draw-what-if-b path", "#what-if", 1);
    
}


function draw_heroC_svg(){

    var heroPath = document.querySelector('.full-screen path');
    var elPercent = document.querySelector('#hero-c-fh-gap').clientHeight/ window.innerHeight;
    var scrollPercent = 1-(document.querySelector('#hero-c-fh-gap').getBoundingClientRect().bottom-window.innerHeight)/document.querySelector('#hero-c-fh-gap').clientHeight;
    if(document.querySelector('#hero-c').getBoundingClientRect().top <=0){

        if(scrollPercent > 0 && scrollPercent <= 1){
            heroPath.style.opacity = 1;
            var pathLength = heroPath.getTotalLength();
            //let pathLength = heroPath.getTotal();
        
            heroPath.style.strokeDashoffset = pathLength;
            heroPath.style.strokeDasharray = pathLength;
            
            var drawLength = pathLength * scrollPercent;
            heroPath.style.strokeDashoffset = pathLength - drawLength;
        }


    
    }else {
        drawLength = 0;
        heroPath.style.opacity = 0;

    }

    console.log(scrollPercent);

}

let sy = 0;
function isScrollingDown(){
    let isDown = false;
    if(window.scrollY > sy){
        isDown = true;
    }else {
        isDown = false;
    }

    sy = window.scrollY;


    return isDown;  
}
let rotate = 0;

var cloudScroll = 0;
function scroll_hero(){
    const id = document.getElementById('hero-gap');
    const hero = document.getElementById('hero');
    const a = hero.querySelector('.intro .a');
    const b = hero.querySelector('.intro .b');
    const balloon =  document.getElementById('motivation').querySelector('.balloon');
    let top = (100-((window.innerHeight - document.querySelector('#motivation p').getBoundingClientRect().top)/window.innerHeight)*100);

    const clouds = document.getElementById('motivation').querySelectorAll('.balloon .clouds');

    if(isScrollingDown()){
        cloudScroll--;
    }else {
        cloudScroll++;
    }
    clouds.forEach(cloud =>{

        cloud.style = 'transform:  translateX(' + (window.scrollY/window.innerHeight)*-10  + 'px);';
    })
    if(document.getElementById('motivation').getBoundingClientRect().top <= window.innerHeight){
        //hero.style = 'transition: .025s ease all; top:' + -1*(window.innerHeight - document.getElementById('motivation').getBoundingClientRect().top) + 'px';

    }

    if(document.querySelector('#motivation p').getBoundingClientRect().top <= window.innerHeight){

        if(document.getElementById('buckets').getBoundingClientRect().top <= document.querySelector('#motivation h2').getBoundingClientRect().top){
            //balloon.style = 'transition: .025s ease all; top: ' + top + '%;';
            document.getElementById('motivation').style.opacity = 0;
        }else {
            //balloon.style = 'transition: .025s ease all; top: ' + top + '%';
            document.getElementById('motivation').style.opacity = 1;
        }
    }
}

let cHeightForScrollBuckets = 0;
function scroll_buckets(){
    let buckets = document.querySelector('#buckets');
    const cl = buckets.querySelector('.cards');

    if(buckets.getBoundingClientRect().top <= window.innerHeight && !cl.hasAttribute('card-height-set')){
        cl.querySelectorAll('.card').forEach(card =>{
            if(card.clientHeight > cHeightForScrollBuckets){
                cHeightForScrollBuckets = card.clientHeight;
            }
        });

        cl.querySelectorAll('.card').forEach(card =>{
            card.style = 'min-height: ' + cHeightForScrollBuckets + 'px !Important;';
        });

        cl.style = 'min-height: calc(' + cHeightForScrollBuckets + 'px + 15vh) !Important;';
        cl.setAttribute('card-height-set', true);
    }

    //if(buckets.getBoundingClientRect().top <= window.innerHeight/2){
    //    cl.classList.replace('onscroll', 'scrolled');
    //}else if(buckets.getBoundingClientRect().bottom <= 0){
    //    cl.classList.replace('scrolled', 'onscroll');
    //}else {
   //     cl.classList.replace('scrolled', 'onscroll');
    //}
}

document.querySelectorAll('#buckets .controls').forEach(btn => btn.addEventListener('click', ()=>{
    click_bucketCards(btn.getAttribute('direction'));
}))

function click_bucketCards(direction){
    let buckets = document.querySelector('#buckets');

    const transitionFacade = buckets.querySelector('.cards');
    const arr = ["foster", "word", "donate"];
    const cards = buckets.querySelectorAll('.card');
    //1
    // set 1 to 3, set 3 to 2, set 2 to 1
    for(let i = 0; i < cards.length; i++){
        let card = cards[i];
        let classes =  card.classList;
        if(card.getAttribute('status') == 'step-1'){
            transition_bucketCards(card.getAttribute(direction));
            console.log(card.getAttribute('data-name') + card.getAttribute(direction));
            break;
        }
    }

}

function transition_bucketCards(next){
    let buckets = document.querySelector('#buckets');
    next = buckets.querySelector('.' + next);
    next.setAttribute('status', 'step-1');
    console.log(next.style.backgroundColor);
    document.querySelector(':root').style.setProperty('--buckets', next.style.backgroundColor);


    buckets.querySelector('.' + next.getAttribute('left')).setAttribute('status', 'step-2');
    buckets.querySelector('.' + next.getAttribute('right')).setAttribute('status', 'step-3');
}

function scroll_theJourney(marker){
    const element = document.querySelector('#timeline');
    let title = element.querySelector('#title');
    let desc = element.querySelector('#description');
    let supportingSvg = element.querySelectorAll('.icon');

    desc.classList.remove('fade');

    let obj = {
        a: {"title": "Step 1",
            "desc": "When a child enters foster care, they're suddenly torn from everything they know. Even if their home wasn't safe, being removed from the only place they've ever called home is terrifying. They may not understand what's happening, only that their world has turned upside down."
        },
        b: {"title": "Step 2",
            "desc": "Even the shortest time away from their family is painful. But foster parents, alongside Bethany's dedicated staff, begin working from the moment a child enters care, striving with everything they have to reunite them with their family when it's safe to do so."
        },
        c: {"title": "Step 3",
            "desc": "During a time that's filled with fear and confusion, foster parents provide the stability, love, and patience a child needs to begin healing. They give children the time and space to process their pain and begin to rebuild their trust in the world."
        },
        d: {"title": "Step 4",
            "desc": "For a child who has already experienced trauma, uncertainty, and loss, a community of support comes together to provide a place where they can thrive."
        },
        e: {"title": "Step 5",
            "desc": "Every person in the child's journey provides essential support to the child."
        }
    }

    let td = obj;
    let svg = ".icon.a";
    if(marker == 'a'){td=obj.a; svg = '.icon.a';}
    else if(marker == 'b'){td=obj.b; svg = '.icon.b';}
    else if(marker == 'c'){td=obj.c; svg = '.icon.c';}
    else if(marker == 'd'){td=obj.d; svg = '.icon.d';}
    else if(marker == 'e'){td=obj.e; svg = '.icon.e';}

    element.querySelector('.active').classList.remove('active');
    element.querySelector(svg).classList.add('active');
    title.innerHTML = td.title;
    desc.innerHTML = td.desc;
    desc.classList.add('fade');

}


function draw_svgDynamic_scroll(sPath, sMarkers, startingLength){
    var heroPath = document.querySelector(sPath);
    var scrollPercent = 1-(document.querySelector(sMarkers).getBoundingClientRect().bottom-window.innerHeight)/document.querySelector(sMarkers).clientHeight;
    
    if(scrollPercent > 0 && scrollPercent <= 1){
        heroPath.style.opacity = 1;
        var pathLength = heroPath.getTotalLength();
        //let pathLength = heroPath.getTotal();
        heroPath.style.strokeDashoffset = pathLength;
        heroPath.style.strokeDasharray = pathLength;
        var drawLength = pathLength * scrollPercent;
        heroPath.style.strokeDashoffset = pathLength - drawLength;
    }

}
function draw_svgDynamic_auto(sPath, sMarkers, startingLength){
    var heroPath = document.querySelector(sPath);
    var scrollPercent = 1-(document.querySelector(sMarkers).getBoundingClientRect().bottom-window.innerHeight)/document.querySelector(sMarkers).clientHeight;
    heroPath.style.opacity = 1;
    var pathLength = heroPath.getTotalLength();
    //let pathLength = heroPath.getTotal();
    let c = pathLength;
    heroPath.style.strokeDashoffset = startingLength;
    heroPath.style.strokeDasharray = pathLength;

    for(let x = pathLength; x > -1; x -= pathLength/10){
        var drawLength = pathLength * scrollPercent;
        heroPath.style.strokeDashoffset = x - drawLength;
    }
}
var smCounter = 0;

function scroll_motivation(){
    const widget = document.querySelector('#motivation');
    const image = document.querySelector('#motivation-gap');
    var h2s = widget.querySelectorAll('h2');


    if(widget.getBoundingClientRect().top < window.innerHeight/2.5){
        let interval = setInterval(()=>{
            if(smCounter < h2s.length){
                let span = h2s[smCounter].querySelector('span');
                span.classList.replace('a', 'b');
                smCounter++;
            }else {
                clearInterval(interval);
            }
            console.log(smCounter);
        }, 500);
    }else if(widget.getBoundingClientRect().top >= window.innerHeight/2.5 && widget.getBoundingClientRect().top < window.innerHeight) {
        h2s.forEach(h =>{
            let span = h.querySelector('span');
            if(span.classList.contains('b')){
                span.classList.replace('b', 'a');
            }
        })
        smCounter = 0;
    }
}

function open_microsite(target){
    const microWidget = document.querySelector('#micro-page');
    microWidget.classList.replace('close', 'open');
    microWidget.style = 'height: ' + (window.innerHeight) + 'px;';
    document.querySelector('body').style.overflowY = 'hidden';
    let obj = {
        "Foster":{"title": "Foster", "hero": "Have a front row seat", 
            'copy':{
                line: ["Imagine a child who has faced more heartache than anyone should, a child who longs for safety, for love, for someone to show them they matter.",
                    "Now, picture yourself stepping in.",
                    "When you step into the life of a vulnerable child, you give them more than just stability—you give them safety, love, and connection.",
                    "You don't have to be perfect to make a difference. You just need to step in, to open your heart, and to be present. In doing so, you become the safe place that child needs.",
                    "Will you step in? Will you be the one to change a life, to offer a brighter tomorrow, to give hope where it's needed most?"
                ]

            },
            'button':{
                cta: [
                    ["Take the First Step", "#contact"]
                ]
            },
        },
        "Work":{"title": "Work", "hero": "Put your faith to work", 
            'copy':{
                line: ["Our work began in 1944 with the care of a single child.",
                    "Today, inspired by our faith, our aim is to demonstrate the love and compassion of Jesus in our services for children, youth, and families.",
                    "At Bethany, you'll join a team of nearly 2,000 passionate professionals, each bringing unique skills to serve communities across the country.",
                    "Together, we stand united in our mission and shared values: motivated by faith, supporting each other, championing justice, pursuing excellence, and committed for the long haul.",
                    "Will you step in with faith, compassion, and a spirit of excellence? Will you be a champion for children and families in your community?"
                ]

            },
            'button':{
                cta: [
                    ["Explore Open Positions", "https://bethany.csod.com/ux/ats/careersite/4/home"],
                    ["Stay in Touch", "#contact"]
                ]
            },
        },
        "Donate":{"title": "Donate", "hero": "Every donation supports a child", 
            'copy':{
                line: ["In a world where so many children face uncertainty, we believe that every child deserves a family - a safe, nurturing place where they can grow, heal, and thrive. Family is the foundation of every child’s future, and without it, the challenges they face can feel insurmountable. But we know that together, we can change that.",
                    "Your gift provides more than just temporary relief; it helps create a lasting impact. It ensures that these children are not left to face the world alone. It gives them the support, safety, and connection they need to build a brighter tomorrow",
                    "Every child deserves a chance to experience love, to feel valued, to know they belong. But they can't get there alone. They need us. They need you.",
                    "Will you step in and help build a future where no child is left without the family they need?",
                    "Your involvement can change a life, and together, we can offer hope to the children who need it most."
                ]

            },
            'button':{
                cta: [
                    ["Donate Now", "/campaigns/step-in/give"],
                    ["Learn More", "#contact"]
                ]
            },
        }
    }

    if(target == 'Donate'){
        obj = obj.Donate;
    }else if(target == 'Work'){
        obj = obj.Work;
    }else {
        obj = obj.Foster;
    }
    const content = microWidget.querySelector('.content');

    let h2 = document.createElement('h2');
    let h5 = document.createElement('h5');
    let close = document.createElement('h5');

    h2.style ='opacity: 0; transform: translateY(20px); transition: .3s ease all;color: white;';
    h5.style ='opacity: 0; transform: translateY(20px); transition: .3s ease all;color: white;';


    setTimeout(()=>{
        // title and hero text
        h2.textContent = obj.hero;
        h5.textContent = obj.title;
        content.insertAdjacentElement("beforeend", h2);
        content.insertAdjacentElement("beforeend", h5);
        //h2.style = 'color: white';
        //h5.style = 'color: white';
        h2.classList.add('todo');
        h5.classList.add('todo');

        setTimeout(()=>{
            h2.style ='opacity: 1; transform: translateY(00px); transition: .3s ease all;color: white;';
            h5.style ='opacity: 1; transform: translateY(00px); transition: .3s ease all;color: white;';
        }, 100)

        // gets all paragraphs
        obj.copy.line.forEach(line => {
            let p = document.createElement('p'); 
            content.insertAdjacentElement("beforeend", p);
            p.style ='opacity: 0; transform: translateY(20px); transition: .3s ease all;color: white;';
            p.classList.add('todo');
            p.textContent = line;

            setTimeout(()=>{
                p.style ='opacity: 1; transform: translateY(00px); transition: .3s ease all;color: white;';
            }, 100)
            //p.style = 'color: white';
        })

        // gets each button
        obj.button.cta.forEach(btn => {
            let div = document.createElement('div'); 
            content.insertAdjacentElement("beforeend", div);
            div.classList.add('cta-container', 'mt-5')
            let a = document.createElement('a'); 

            let text = btn[0];
            let href = btn[1];

            div.insertAdjacentElement("beforeend", a);
            a.style ='opacity: 0; transform: translateY(20px); transition: .3s ease all';

            a.setAttribute('href', href);
            a.textContent = text;
            a.classList.add('cta', 'cta-button', 'btn', 'btn-primary', 'mr-3', 'todo');
            a.style ='opacity: 0; transform: translateY(20px); transition: .3s ease all';
            
            setTimeout(()=>{
                a.style ='opacity: 1; transform: translateY(00px); transition: .3s ease all;';
            }, 100)

        })
    }, 500)


    document.querySelector('.closewindow').classList.replace('hide', 'show');
}

function close_microsite(){
    document.querySelector('body').style.overflowY = 'auto';
    const microWidget = document.querySelector('#micro-page');
    microWidget.classList.replace('open', 'close');
    const content = microWidget.querySelector('.content');
    content.innerHTML = '';
    document.querySelector('.closewindow').classList.replace('show', 'hide');

}

function scroll_whatIf(){
    const element = document.querySelector('#what-if');
    const h2 = element.querySelectorAll('.p');

    h2.forEach(h =>{
        if(h.getBoundingClientRect().top <= window.innerHeight - (window.innerHeight/4)){
            h.style.opacity = 1;
            h.classList.add('strike');
        }
    })

}

function init_mobile(){
    var todo = document.querySelectorAll('.init-mobile');

    todo.forEach(el =>{
        if(el.getBoundingClientRect().top <= (window.innerHeight + window.innerHeight*.25)){
            console.log(todo.length)
            el.classList.add('done');
        }
    })
}


function focus_area(){
    const params = window.location.search;
    const bucket = document.querySelector('#buckets');
    if(!bucket.hasAttribute('set') && window.scrollY > window.innerHeight){
        if(params.indexOf('focusarea=foster') > -1){
            transition_bucketCards('foster')
        }else if(params.indexOf('focusarea=donate') > -1){
            transition_bucketCards('donate')
        }else if(params.indexOf('focusarea=work') > -1){
            transition_bucketCards('work')
        }

        bucket.setAttribute('set', true);
    }
}
