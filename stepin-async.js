window.addEventListener("load", redirect());
const currentWindowPathT = window.location.pathname;
var initWindowWidthT = window.innerWidth;
function redirect(){
    var paramsT = window.location.search;
    let widthT = window.innerWidth;

    if(widthT != initWindowWidthT){
        if(widthT < 801){
            if(currentWindowPathT != '/campaign/step-in'){
                window.location.href = 'https://bethany.org/campaign/step-in' + paramsT;
            }        
            }else{
            if(currentWindowPathT != '/campaigns/step-in/dev'){
                window.location.href = 'https://bethany.org/campaigns/step-in' + paramsT;
            }
        }
    }
}
