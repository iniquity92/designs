$(function(){
    $("ul#menu > a").on("click",function(e){
        e.preventDefault();
        var hash = e.target.hash;
        if(hash !==""){
            if(hash ==="#home"){
                hash = ".main-photo";
            }
           
           $('html,body').animate({
               scrollTop: $(hash).offset().top
           },1000,function(){
               if(hash===".main-photo"){
                   hash = "#home";
               }
               window.location.hash = hash;
           });
        }
    });
});