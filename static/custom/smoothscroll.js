$(function(){
    $("ul#menu > li > a, a.navbar-brand, p.lead > a").on("click",function(e){
        e.preventDefault();
        var target = e.target;
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