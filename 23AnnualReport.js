
var sUp = true;
console.log('ran');
let words = [];
const str = 'fifty six thousand seven hundred sixty two ';
let newStr = '';
let complete = '';
window.addEventListener('load', ()=>{
//Colors();
//FixedImages();
InsertStateCards();

document.getElementById('year-container').style = `min-height: ${document.querySelector('#year-container').clientHeight}px`;

for(let i = 0; i < str.length; i++){
if(str[i] === ' '){
    words.push(newStr);
    newStr = "";
}else {
    newStr += str[i];
}
}

words.forEach(word =>{
complete += '<span class="animate" data-animate="fade-up-opacity">' + word + '</span> ';
})

console.log(complete);
})

var scrolled = 0;
window.addEventListener('scroll', ()=>{
    const header = document.querySelector('#custom-header');

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


    centerTitleChange();
    try{yearInReview();}catch(e){}
    try{PageProgress();}catch(e){ }
    try{globalScrollSum();}catch(e){}
    try{atHomeSummaryScroll();}catch(e){}
    try{animateElements();}catch(e){}
    try{workInUsNumber();}catch(e){}
    //srollSum();
    try{refugeeImmigrantNumber();}catch(e){}
    try{workInWoorldNumber();}catch(e){}

    let tmp = window.scrollY;


    try {
        if(document.querySelector('#home .annual-report-title').getBoundingClientRect().top <= 200){
            document.querySelector('.year').style = `transition: .7s ease all; font-size: calc(100vw / 7); line-height: calc(100vw / ${25});`
    
        }else {
            document.querySelector('.year').style = `transition: .7s ease all;`
    
        }
    }catch(e){}

    if(window.scrollY <= scrolled){
        sUp = true;
    }else {
        sUp = false;
    }

    scrolled = window.scrollY;
})

function Colors(){
const rows = document.querySelectorAll('.bcs-widget-row');
const body = document.querySelector('#main');

rows.forEach(row => {
let top = row.getBoundingClientRect().top;
if(top <= window.innerHeight) {
body.setAttribute('data-color', row.getAttribute('data-bg'));
}
})

if(window.scrollY <= 10){
body.setAttribute('data-color', 'init');

}
}

var i = 0;
function yearInReview(){

    let sticky = document.querySelector('#year-in-review .row-half');
    const yir = document.getElementById('year-in-review');
    let maxHeight = document.querySelector('.overflow h1').clientHeight;
    let l = document.querySelector('#targetElement-yir').getBoundingClientRect().left;
    let t = document.querySelector('#targetElement-yir').getBoundingClientRect().top;
    
    if(yir.getBoundingClientRect().top > sticky.getBoundingClientRect().top){
        sticky.style = 'position: absolute; top: ' + 50 + '%; transform: translate(10%, -50%); left: ' + (50) + '%; z-index: 2;';
    }else {
        sticky.style = 'position: absolute; top: ' + 50 + '%; transform: translate(10%, -50%); left: ' + (50) + '%; z-index: 2;';
    }

    if(yir.getBoundingClientRect().top <= window.innerHeight){
        const targetElement = document.getElementById('targetElement-yir');

        var targetRect = yir.getBoundingClientRect().top - 100;

        if(sUp){
            targetRect = yir.getBoundingClientRect().top + window.innerHeight/5;
        }

        if(targetRect <= window.innerHeight * .20 && targetRect < window.innerHeight * .40){
            i = maxHeight * 2;
        }else if(targetRect <= window.innerHeight * .40 && targetRect < window.innerHeight * .60){
            i = maxHeight;
        }else if(targetRect <= window.innerHeight * .60 && targetRect < window.innerHeight * .80){
            i = 0;
        }

        document.querySelectorAll('.overflow h1').forEach(el =>{

            el.style = 'transform: translateY(-' + i + 'px);';
        })
    }
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
    ScrollCards(button.getAttribute('data-direction'));
}))

var offsetScrollCards = 0;
var sbWidth = 10;
let scrolledAmount = 0;
function ScrollCards(direction){
    const cards = document.querySelectorAll('#wins-and-highlights .wh-card');
    const sb = document.querySelector('#wins-and-highlights .custom-scrollbar span')
    const container = document.querySelector('#wins-and-highlights .cards-container');
    const sections = document.querySelectorAll('#wins-and-highlights .section')


    const totalScrollAmount = (cards.length - 2) * cards[cards.length - 2].clientWidth;


    switch (direction){
        case "right":
            if(scrolledAmount > 0 ){
                scrolledAmount += (document.querySelector('.last-wh-card').clientWidth) *-1;
                container.scrollLeft = scrolledAmount;
                sections.forEach(section =>{
                    if((section.getBoundingClientRect().right <= (window.innerWidth / .90)  && section.getBoundingClientRect().left <= document.querySelector('.inner-bcs-row').clientWidth)){
                        document.querySelector('.custom-scrollbar span').setAttribute('data-slider-color', section.getAttribute('data-slider-color'));
                        document.querySelector('.slider-section-titles').textContent = section.getAttribute('data-title');
                    }
                })
            }

            break;
        case "left":
            if(((scrolledAmount/totalScrollAmount)*100) < 100){
                scrolledAmount += (document.querySelector('.last-wh-card').clientWidth);
                container.scrollLeft = scrolledAmount;
                sections.forEach(section =>{
                    if(section.getBoundingClientRect().left <= (window.innerWidth / 1.5)){
                        document.querySelector('.custom-scrollbar span').setAttribute('data-slider-color', section.getAttribute('data-slider-color'));
                        document.querySelector('.slider-section-titles').textContent = section.getAttribute('data-title');
                    }
                })
            }
            break;
    }

    let tmp = document.querySelector('.last-wh-card').getBoundingClientRect().left + document.querySelector('.last-wh-card').clientWidth;
    tmp = document.querySelector('.inner-bcs-row').getBoundingClientRect().right / tmp;
    tmp = tmp * 100;

    console.log(scrolledAmount);
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
        CardToList();
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
            cardContainerBottom.insertAdjacentHTML('afterbegin', cardCode);
            prevRandom = rand;
        }
        InsertStateCardsIsRan = true;
    }
}

function CardToList(){
    const cardContainerTop = document.getElementById('impact-at-home-cards-top');
    const cardContainerBottom = document.getElementById('impact-at-home-cards-bottom');
    const list = document.getElementById('impact-at-home-cards-list');
    cardContainerTop.innerHTML = '';
    list.style = '';

    let initCode = `
    <div class="d-flex flex-row" style="width: 100%;">
        <div class="d-flex flex-wrap mr-3 fade-up-translate" data-animate="fade-up-translate">
            <div class="marker cs-darkcoral mr-3"></div>
            <p class="my-auto mr-3">People Served</p>
        </div>
        <div class="d-flex flex-wrap mr-3 fade-up-translate" data-animate="fade-up-translate">
            <div class="marker cs-blue mr-3"></div>
            <p class="my-auto mr-3">Total Programs</p>
        </div>
        <div class="d-flex flex-wrap mr-3 fade-up-translate" data-animate="fade-up-translate">
            <div class="marker cs-lightgray mr-3"></div>
            <p class="my-auto mr-3">Total Locations</p>
        </div>
        <div class="d-flex flex-wrap mr-3 fade-up-translate" data-animate="fade-up-translate">
            <div class="marker cs-green mr-3"></div>
            <p class="my-auto mr-3">Program Expenditures</p>
        </div>
    </div>
    `;


    //list.insertAdjacentHTML('beforeend', initCode);
    for(let i in states){
        let code = `
        <div class="d-flex impact-at-home-card flex-column mt-5 mr-3 animate" data-animate="fade-up-translate" >
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
                <p class="my-auto mr-3"><strong>$${states[i].expenditures}</strong> <br/> in expenditures</p>
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
    if(document.getElementById('year-in-review').getBoundingClientRect().top <= window.innerHeight*.76 && totalServedSum.getAttribute('data-ran') != "true"){
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
    jsScrollToPageElement(scrollTo);
    accordian(target, title);

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
