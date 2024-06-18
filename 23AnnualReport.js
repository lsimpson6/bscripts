const header = document.querySelector('#custom-header');
var sUp = true;

window.addEventListener('DOMContentLoaded', ()=>{
    InsertStateCards();
    document.getElementById('year-container').style = `min-height: ${document.querySelector('#year-container').clientHeight}px`;
    LargestOurWorkRow();
})

var scrolled = 0;
window.addEventListener('scroll', ()=>{

    if(document.querySelector('#main').getAttribute('data-CardToList-isRan') != 'true'){
        CardToList();
        document.querySelector('#main').setAttribute('data-CardToList-isRan', 'true');
    }
    

    try{
        document.getElementById('navigation').setAttribute('menu-status', "open");
        menu();
    }catch(e){}

    try{
        if(window.scrollY > window.innerHeight/4){
            header.classList.remove('hidden');
        }else {
            header.classList.add('hidden');
        }
    }catch(e){}

    try{centerTitleChange();}catch(e){}
    try{headerColorSwaps();}catch(e){}
    try{PageProgress();}catch(e){ }
    try{globalScrollSum();}catch(e){}
    try{atHomeSummaryScroll();}catch(e){}
    try{InsertSvg();}catch(e){}
    try{animateElements();}catch(e){}
    try{workInUsNumber();}catch(e){}
    //srollSum();
    try{refugeeImmigrantNumber();}catch(e){}
    try{workInWoorldNumber();}catch(e){}
    try{ourWorkImagesAnimation();}catch(e){}
    

    if(window.scrollY <= scrolled){
        sUp = true;
    }else {
        sUp = false;
    }

    scrolled = window.scrollY;
})

let before = 0;
let colorI = 0;
function Colors(){
    const rows = document.querySelectorAll('.bcs-widget-row');
    const colorTargets = document.querySelectorAll('.color-targets');
    let a = '', b = '';

    colorTargets.forEach(target => {
        if(target.getBoundingClientRect().top < window.innerHeight / 2 && target.getBoundingClientRect().top >= 0){
            a = target.getAttribute('a');
            b = target.getAttribute('b');
        }
    })

    if(window.scrollY > rows[1].clientHeight + rows[0].clientHeight + rows[2].clientHeight + rows[3].clientHeight){
        a = 'cs-white';
        b = 'cs-white';
    }else if(window.scrollY > rows[1].clientHeight + rows[0].clientHeight + rows[2].clientHeight){
        a = 'cs-violet';
        b = 'cs-white';
    }else if(window.scrollY > rows[1].clientHeight + rows[0].clientHeight){
        a = 'cs-darkviolet';
        b = 'cs-violet';
    }else if(window.scrollY > rows[0].clientHeight){
        a = 'cs-white';
        b = 'cs-darkviolet';
    }


    rows.forEach(row => {
        row.classList.replace(a,b);
    })
}


function LargestOurWorkRow(){
    const ourWork = document.querySelectorAll('.ourwork-row .inner-bcs-row');
    let x = 0;
    ourWork.forEach(el =>{
        if(el.clientHeight > x){
            x = el.clientHeight;
        }
    })

    ourWork.forEach(el => {
        el.style = `min-height: ${x}px;`;
    })
}

function animateElements(){
    const elements = document.querySelectorAll('.animate');

    elements.forEach(e => {
        let top = e.getBoundingClientRect().top;
        if(top <= window.innerHeight * .65) {
            e.classList.replace('animate', e.getAttribute('data-animate'));
        }
    })
}


function FixedImages(){
    const images = document.querySelectorAll('.pf');
    let sy = window.scrollY/10 * -1;
    images.forEach(image => {
        let top = image.getBoundingClientRect().top;
        let bottom = image.getBoundingClientRect().bottom;

        if(top <= 0 && bottom < window.innerHeight) {
            image.style="background-position: center " + sy + "px";
        }

    })
}

document.querySelectorAll('.direction-arrows button').forEach(button => button.addEventListener('click', ()=>{
    ScrollCards(button.getAttribute('data-direction'), button.getAttribute('data-cards-target'));
}))

var offsetScrollCards = 0;
var sbWidth = 10;
let scrolledAmount = 0;
function ScrollCards(direction, targetCards){
    
    const cards = document.querySelectorAll(`${targetCards} .wh-card`);
    const sb = document.querySelector(`${targetCards} .custom-scrollbar span`)
    const container = document.querySelector(`${targetCards} .cards-container`);
    const sections = document.querySelectorAll(`${targetCards} .section`);


    const totalScrollAmount = (cards.length - 2) * cards[cards.length - 2].clientWidth;


    switch (direction){
        case "right":
            if(scrolledAmount > 0 ){
                scrolledAmount += (document.querySelector(`${targetCards} .last-wh-card`).clientWidth) *-1;
                container.scrollLeft = scrolledAmount;
                sections.forEach(section =>{
                    if((section.getBoundingClientRect().right <= (window.innerWidth / .90)  && section.getBoundingClientRect().left <= document.querySelector('.inner-bcs-row').clientWidth)){
                        document.querySelector(`${targetCards} .custom-scrollbar span`).setAttribute('data-slider-color', section.getAttribute('data-slider-color'));
                        document.querySelector(`${targetCards} .slider-section-titles`).textContent = section.getAttribute('data-title');
                    }
                })
            }

            break;
        case "left":
            if(((scrolledAmount/totalScrollAmount)*100) < 100){
                scrolledAmount += (document.querySelector(`${targetCards} .last-wh-card`).clientWidth);
                container.scrollLeft = scrolledAmount;
                sections.forEach(section =>{
                    if(section.getBoundingClientRect().left <= (window.innerWidth / 1.5)){
                        document.querySelector(`${targetCards} .custom-scrollbar span`).setAttribute('data-slider-color', section.getAttribute('data-slider-color'));
                        document.querySelector(`${targetCards} .slider-section-titles`).textContent = section.getAttribute('data-title');
                    }
                })
            }
            break;
    }

    sb.style = `width: ${(scrolledAmount/totalScrollAmount) *100}%`;

}

function PageProgress(){
    const el = document.getElementById('page-progress');
    const per = document.querySelector('#page-percent strong');
    var f = window.scrollY
      , n = document.querySelector(".footer")
      , r = n.getBoundingClientRect().top - window.innerHeight + n.clientHeight
      , u = document.querySelector("main").clientHeight - window.innerHeight
      , t = (1 - r / u) * 100;
      el.style = "width: " + t + "%;";
      let percent = Math.ceil(t);
      if(percent > 100){
        percent = 100;
      }
      per.textContent = percent + '%';
}

const states = {
    0: {state:"Arkansas", title:"Arkansas", served:"312", programs:"1", locations:"1", expenditures:"223,163"},
    1: {state:"California", title:"California", served:"1,981", programs:"20", locations:"5", expenditures:"5,651,840"},
    2: {state:"Colorado & Texas", title:"Colorado & Texas", served:"1,396", programs:"5", locations:"3", expenditures:"2,927,738"},
    3: {state:"Florida", title:"Florida", served:"2,708", programs:"6", locations:"3", expenditures:"2,927,738"},
    4: {state:"Georgia", title:"Georgia", served:"3,589", programs:"20", locations:"5", expenditures:"10,863,312"},
    5: {state:"Illinois", title:"Illinois", served:"10,398", programs:"7", locations:"1", expenditures:"1,985,081"},
    6: {state:"Indiana", title:"Indiana", served:"698", programs:"5", locations:"1", expenditures:"3,715,650"},
    7: {state:"Maryland & DC", title:"Maryland & DC", served:"1,277", programs:"7", locations:"2", expenditures:"3,882,078"},
    8: {state:"Michigan", title:"Michigan", served:"11,786", programs:"66", locations:"14", expenditures:"76,612,607"},
    9: {state:"Minnesota", title:"Minnesota", served:"24", programs:"0", locations:"0", expenditures:"95,309"},
    10: {state:"Missouri", title:"Missouri", served:"795", programs:"10", locations:"4", expenditures:"4,282,546"},
    11: {state:"Nebraska & Iowa", title:"Nebraska & Iowa", served:"200", programs:"5", locations:"2", expenditures:"453,065"},
    12: {state:"New England (Massachusetts, Road Island, Vermont, New Hampshire, Maine)", title:"New England", served:"1,514", programs:"8", locations:"4", expenditures:"3,746,016"},
    13: {state:"New Jersey, Delaware, Pennsylvania, and West Virginia & New York", title:"North East", served:"7,611", programs:"49", locations:"14", expenditures:"30,012,970"},
    14: {state:"North Carolina", title:"North Carolina", served:"892", programs:"3", locations:"1", expenditures:"3,962,907"},
    15: {state:"South Carolina", title:"South Carolina", served:"500", programs:"2", locations:"1", expenditures:"807,940"},
    16: {state:"South Dakota", title:"South Dakota", served:"79", programs:"5", locations:"1", expenditures:"359,409"},
    17: {state:"Tennessee", title:"Tennessee", served:"1,351", programs:"13", locations:"5", expenditures:"4,645,233"},
    18: {state:"Virginia", title:"Virginia", served:"623", programs:"7", locations:"1", expenditures:"892,373"},
    19: {state:"Wisconsin", title:"Wisconsin", served:"208", programs:"8", locations:"2", expenditures:"3,420,350"}
}

const globalObj = {
    0: {name:"United States", title:"United States", served: usaTotal().served, programs: usaTotal().programs, locations: usaTotal().locations, expenditures: usaTotal().expenditures},
    1: {name:"Colombia", title:"Colombia", served: 7127, programs: 1, locations: 5, expenditures: 473141},
    2: {name:"Ghana", title:"Ethiopia", served: 1687, programs: 4, locations: 4, expenditures: 1374268},
    3: {name:"Haiti", title:"Haiti", served: 16, programs: 2, locations: 1, expenditures: 192932}
}

var InsertStateCardsIsRan = false;
function InsertStateCards(isClicked){

    let prevRandom = 0;
    const cardContainerTop = document.getElementById('impact-at-home-cards-top');
    const cardContainerBottom = document.getElementById('impact-at-home-cards-bottom');

    var animate = isClicked == true ? 'fade-up-translate' : 'fade-up-translate';

    if(cardContainerTop.getBoundingClientRect().top <= (window.innerHeight*2) && !InsertStateCardsIsRan){
        
        for(let i in states){
            let rand = Math.floor(Math.random() * (4 - 10 + 1)) * -1;
            while(rand == prevRandom){
                rand = Math.floor(Math.random() * (4 - 10 + 1)) * -1;
            }

            let cardCode = `<div class="summary-card d-flex justify-content-between flex-column p-3 init-animation ${animate}" style="background-color: rgba(71, 60, 147, .${rand})" data-animate="fade-up-translate">
                <div class="title pl-3">
                    <h3 style="text-transform: uppercase; color: #59CAE8 !important; mix-blend-mode: normal !important;" class="">${states[i].title}</h3>
                </div>
                <div class="d-flex flex-column pl-3 justify-content-end mb-0">
                    <h1 class="mb-0 light-font " style="mix-blend-mode: normal !important;">${states[i].served}</h1>
                    <h5>people served</h5>
                </div>
            </div>`;
            cardContainerTop.insertAdjacentHTML('beforeend', cardCode);
            //cardContainerBottom.insertAdjacentHTML('afterbegin', cardCode);
            prevRandom = rand;
        }
        InsertStateCardsIsRan = true;
    }
}

function ShowAllCards(){
    const cards = document.querySelectorAll('.impact-at-home-card.d-none');

    cards.forEach(card =>{
        card.classList.add(card.getAttribute('data-animate'));
        card.classList.replace('d-none', 'd-flex');
    })

    document.querySelector('.show-all-container').style = 'display: none;';
}

function CardToList(){
    const cardContainerTop = document.getElementById('impact-at-home-cards-top');
    const worldContainer = document.getElementById('impact-around-world-cards');
    const cardContainerBottom = document.getElementById('impact-at-home-cards-bottom');
    const list = document.getElementById('impact-at-home-cards-list');
    cardContainerTop.innerHTML = '';
    list.style = '';

    for(let g in globalObj){

        
    let countries = `
        <div class="d-flex impact-at-home-card flex-column animate mt-5 mr-3" data-animate="fade-up-translate" style="width: 40%;">
            <h5>${globalObj[g].title}</h5>
            <div class="d-flex flex-column my-1">
                <div class="d-flex flex-row ">
                    <div class="marker cs-darkcoral mr-3"></div>
                    <p class="my-auto mr-3"><strong>${globalObj[g].title == 'United States' ? globalObj[g].served.servedSum.toLocaleString() : globalObj[g].served.toLocaleString()}</strong> served</p>
                </div>
                <div class="d-flex flex-row">
                    <div class="marker cs-blue mr-3"></div>
                    <p class="my-auto mr-3"><strong>${globalObj[g].title == 'United States' ? globalObj[g].programs.programSum : globalObj[g].programs}</strong> programs</p>
                </div>
                <div class="d-flex flex-row">
                    <div class="marker cs-lightgray mr-3"></div>
                    <p class="my-auto mr-3"><strong>${globalObj[g].title == 'United States' ? globalObj[g].locations.locationsSum : globalObj[g].locations}</strong> locations</p>
                </div>
            </div>
            <div class="d-flex flex-row  my-1">
                <div class="marker cs-green mr-3 mt-2"></div>
                <p class="my-auto mr-3"><strong>$${globalObj[g].title == 'United States' ? globalObj[g].expenditures.expendituresSum.toLocaleString() : globalObj[g].expenditures.toLocaleString()}</strong> <br/> in expenditures</p>
            </div>
        </div>`;

        worldContainer.insertAdjacentHTML('beforeend', countries);
    }


    //list.insertAdjacentHTML('beforeend', initCode);
    let counter = 0;
    for(let i in states){

        let dipslay = i > 3 && window.innerWidth > 768 ? `d-none` : 'd-flex animate';
        let code = `
        <div class="${dipslay} impact-at-home-card flex-column mt-5 mr-3" data-animate="fade-up-translate" >
            <h5>${states[i].title}</h5>
            <div class="d-flex flex-column my-1">
                <div class="d-flex flex-row ">
                    <div class="marker cs-darkcoral mr-3"></div>
                    <p class="my-auto mr-3"><strong>${states[i].served}</strong> served</p>
                </div>
                <div class="d-flex flex-row">
                    <div class="marker cs-blue mr-3"></div>
                    <p class="my-auto mr-3"><strong>${states[i].programs}</strong> program${states[i].programs < 1 || states[i].programs > 1  ? 's' : ''}</p>
                </div>
                <div class="d-flex flex-row">
                    <div class="marker cs-lightgray mr-3"></div>
                    <p class="my-auto mr-3"><strong>${states[i].locations}</strong> location${states[i].locations < 1 || states[i].locations > 1  ? 's' : ''}</p>
                </div>
            </div>
            <div class="d-flex flex-row  my-1">
                <div class="marker cs-green mr-3 mt-2"></div>
                <p class="my-auto mr-3"><strong>$${states[i].expenditures.toLocaleString()}</strong> <br/> in expenditures</p>
            </div>
        </div>`;
        list.insertAdjacentHTML('beforeend', code);

    }

    const summary = document.getElementById('impact-at-home-summary');


    let summaryCode = `
    <div class="d-flex flex-row scroll">
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0">people served</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().served.servedSum}</h1>
        </div>
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0">locations</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().locations.locationsSum}</h1>
        </div>
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0 ">programs</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().programs.programSum}</h1>
        </div>
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0">people served</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().served.servedSum}</h1>
        </div>
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0">locations</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().locations.locationsSum}</h1>
        </div>
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0 ">programs</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().programs.programSum}</h1>
        </div>
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0">people served</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().served.servedSum}</h1>
        </div>
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0">locations</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().locations.locationsSum}</h1>
        </div>
        <div class="d-flex flex-column " style="margin-right: 7rem;">
        <h5 class="mb-0 ">programs</h5>
            <h1 class="light-font" style="font-size: calc(100vw / 15);">${usaTotal().programs.programSum}</h1>
        </div>
    </div>
    `;

    summary.insertAdjacentHTML('afterbegin', summaryCode);



}

function usaTotal(){
    let programSum = 0, servedSum = 0, locationsSum = 0, expendituresSum = 0;
    for(let s in states){
        let state = states[s];


        programSum += removeCharcters(state.programs);
        servedSum += removeCharcters(state.served);
        locationsSum += removeCharcters(state.locations);
        expendituresSum += removeCharcters(state.expenditures);
    }

    programSum = programSum.toLocaleString();
    servedSum = servedSum.toLocaleString();
    locationsSum = locationsSum.toLocaleString();
    expendituresSum = expendituresSum.toLocaleString();

    let obj = {
        programs: {programSum},
        served: {servedSum},
        locations: {locationsSum},
        expenditures: {expendituresSum}
    }

    return obj;
}

function removeCharcters(obj){

    let str = '';
    if((obj).indexOf(',')){
        str = obj;
        str = str.replaceAll(',','');
    }else {
        str = obj;
    }
 

    return +str;
}

const sum = removeCharcters(globalObj[0].served.servedSum);
var usaScrollSumCounter = sum - 1000;
function usaScrollSum(){
    const usaServedSum = document.getElementById('usa-served-sum');
    if(usaServedSum.getBoundingClientRect().top <= window.innerHeight*.75 && usaServedSum.getAttribute('data-ran') != "true"){
        usaServedSum.setAttribute('data-ran', true);
        setInterval(()=>{
            if(usaScrollSumCounter < sum){
                usaServedSum.textContent = usaScrollSumCounter.toLocaleString();
            } 
            usaScrollSumCounter += 10
        }, 10)
    }else if(usaServedSum.getAttribute('data-ran') != "true"){
        usaServedSum.textContent = usaScrollSumCounter.toLocaleString();
    }
}

const globalSum = removeCharcters(globalObj[0].served.servedSum) + globalObj[1].served + globalObj[2].served + globalObj[3].served;
var globalScrollSumCounter = globalSum - 1000;
function globalScrollSum(){
    const totalServedSum = document.getElementById('total-served-sum');
    if(document.getElementById('around-the-world-v2').getBoundingClientRect().top <= window.innerHeight*.5 && totalServedSum.getAttribute('data-ran') != "true"){
        totalServedSum.setAttribute('data-ran', true);
        setInterval(()=>{
            if(globalScrollSumCounter < globalSum){
                totalServedSum.textContent = globalScrollSumCounter.toLocaleString();
            } 
            globalScrollSumCounter += 10
        }, 10)
    }else if(totalServedSum.getAttribute('data-ran') != "true"){
        totalServedSum.textContent = globalScrollSumCounter.toLocaleString();
    }
}

let iahSummaryIdCountScrolled = 0
function atHomeSummaryScroll(){
    var iahSummaryId = document.querySelector('#impact-at-home-summary .scroll');

    if(iahSummaryId.getBoundingClientRect().top <= window.innerHeight && iahSummaryId.getBoundingClientRect().bottom >= 0){
        if(sUp){iahSummaryIdCountScrolled += .25}else{iahSummaryIdCountScrolled -= .25};
        iahSummaryId.style = `transform: translateX(${iahSummaryIdCountScrolled}%);`;
    }
}

document.querySelector('.menu').addEventListener('click', ()=>{
    menu();
})

function menu(){
    const nav = document.getElementById('navigation');
    const menu = document.querySelector('.menu');

    let status = nav.getAttribute('menu-status');


    if(status == "open"){
        nav.setAttribute('menu-status', "close");
        document.getElementById('main').style = '';
    }else {
        nav.setAttribute('menu-status', "open");
        document.getElementById('main').style = 'filter: blur(20px) brightness(.7);';
    }
}

function jsScrollToPageElement(x){
    try {
        let headerHeight = 0;
        let element = document.querySelector(x);
        let t = element.getBoundingClientRect().top - headerHeight - 50 + window.scrollY;
        window.scrollTo({
            top: t,
            left: 0,
            behavior: "smooth"
        })
    }catch(e){
        console.log(e);
    }
}

function workInUsNumber(){
    const number = document.querySelector('#work-in-us-number');

    let sum = number.getAttribute('number');
    let counterForGeneralNumbers = sum - 1000;
    if(number.getBoundingClientRect().top <= window.innerHeight*.75 && number.getAttribute('data-ran') != "true"){
        number.setAttribute('data-ran', true);
        setInterval(()=>{
            if(counterForGeneralNumbers < sum){
                number.textContent = usaScrollSumCounter.toLocaleString();
                counterForGeneralNumbers += 10;

            } 
        }, 10)
    }else if(number.getAttribute('data-ran') != "true"){
        number.textContent = usaScrollSumCounter.toLocaleString();
    }
}

const usNumber = document.querySelector('#work-in-us-number');
let usSum = usNumber.getAttribute('number');
let counterForGeneralNumbersUs = Number(usSum) - 1000;
function workInUsNumber(){
    if(usNumber.getBoundingClientRect().top <= window.innerHeight*.65 && usNumber.getAttribute('data-ran') != "true"){
        usNumber.setAttribute('data-ran', true);
        setInterval(()=>{
            if(counterForGeneralNumbersUs <= usSum){
                usNumber.textContent = counterForGeneralNumbersUs.toLocaleString();
                counterForGeneralNumbersUs += 10;

            } 
        }, 10)
    }else if(usNumber.getAttribute('data-ran') != "true"){
        usNumber.textContent = counterForGeneralNumbersUs.toLocaleString();
    }
}


const worldNumber = document.querySelector('#work-in-world-number');
let worldSum = worldNumber.getAttribute('number');
let counterForGeneralNumbersWorld = Number(worldSum) - 1000;
function workInWoorldNumber(){
    if(worldNumber.getBoundingClientRect().top <= window.innerHeight*.65 && worldNumber.getAttribute('data-ran') != "true"){
        worldNumber.setAttribute('data-ran', true);
        setInterval(()=>{
            if(counterForGeneralNumbersWorld <= worldSum){
                worldNumber.textContent = counterForGeneralNumbersWorld.toLocaleString();
                counterForGeneralNumbersWorld += 10;

            } 
        }, 10)
    }else if(worldNumber.getAttribute('data-ran') != "true"){
        worldNumber.textContent = counterForGeneralNumbersWorld.toLocaleString();
    }
}

const riNumberId = document.querySelector('#refugee-immigrant-number');
let riSum = riNumberId.getAttribute('number');
let counterForGeneralRiNumber = Number(riSum) - 1000;
function refugeeImmigrantNumber(){
    if(riNumberId.getBoundingClientRect().top <= window.innerHeight*.65 && riNumberId.getAttribute('data-ran') != "true"){
        riNumberId.setAttribute('data-ran', true);
        setInterval(()=>{
            if(counterForGeneralRiNumber <= riSum){
                riNumberId.textContent = counterForGeneralRiNumber.toLocaleString();
                counterForGeneralRiNumber += 10;

            } 
        }, 10)
    }else if(riNumberId.getAttribute('data-ran') != "true"){
        riNumberId.textContent = counterForGeneralRiNumber.toLocaleString();
    }
}

const accordianTitles = document.querySelectorAll('#accordian-container .header');

accordianTitles.forEach(title => title.addEventListener('click', ()=>{
    let target = title.getAttribute('data-target');

    const copy = document.querySelectorAll('#accordian-container .copy');
    let scrollTo = '#' + target;
    accordian(target, title);
    jsScrollToPageElement(scrollTo);

}))

function accordian(copy, parent){
    let copyEl = document.getElementById(copy);
    

    if(copyEl.getAttribute('data-visibility') == 'hidden'){
        copyEl.setAttribute('data-visibility', 'shown');
    }else {
        copyEl.setAttribute('data-visibility', 'hidden');
    }

    if(parent.getAttribute('data-visibility') == 'hidden'){
        parent.setAttribute('data-visibility', 'shown');
    }else {
        parent.setAttribute('data-visibility', 'hidden');
    }

}


let centerStartingTranslate = 0;
function centerTitleChange(){
    const selctors = document.querySelectorAll('.hasTitle');
    const height = document.querySelector('#section-title p').clientHeight;
    document.querySelector('#section-title').style = `height: ${height}px;`;
    for(let i = 0; i < selctors.length; i++){
        let selctor = selctors[i];

        if(selctor.getBoundingClientRect().top <= window.innerHeight / 4){
            centerStartingTranslate = (height)*i;
        }
    }

    document.querySelectorAll('#section-title p').forEach(p => {
        p.style = `transform: translateY(-${centerStartingTranslate}px); margin-bottom: 0px; transition: .3s ease all;`;
    })

}


var tStyle = [0,0,0];
function ourWorkImagesAnimation(){
    const images = document.querySelectorAll('.ourwork-row .image img');

    for(var i = 0; i < images.length; i++){
        let image = images[i];
        if(image.getBoundingClientRect().top <= window.innerHeight){
            
            if(sUp){
                if(tStyle[i] <= 15){
                    tStyle[i] = (tStyle[i] += .25);

                }
            }else{
                if(tStyle[i] >= -15){
                    tStyle[i] = (tStyle[i] -= .25);
                }
            }
            image.style = `top: ${tStyle[i]}%;`;
        }
    }
}

function InsertSvg(){
    const selctors = document.querySelectorAll('.insert-svg.set');

    selctors.forEach(selector => {
        let svg = selector.getAttribute('svg-code');
        let position = selector.getAttribute('svg-position');
        if(selector.getBoundingClientRect().top <= window.innerHeight * 1.25){
            selector.classList.remove('set');
            selector.insertAdjacentHTML(position, svg);
            console.log(svg);
        }
    })
}
function downloadResources(){
    const element = document.getElementById('download-report');
    let attr = element.getAttribute('status');

    if(attr == "open"){
        element.setAttribute('status', 'close');
    }else {
        element.setAttribute('status', 'open');
    }
}

function headerColorSwaps(){
    const menu = document.querySelector('#custom-header');

    pickColors.forEach(row => {
        if(row.getBoundingClientRect().top <= menu.clientHeight){
            if(row.getAttribute('data-is-dark') == true){
                menu.setAttribute('data-color', 'white');
            }else {
                menu.setAttribute('data-color', 'violet');
            }
        }
    })

}