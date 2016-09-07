$(function(){
    //calls the json text file to get data
        var data;
        $('body').scrollspy({ target:'#navigation'});
        $(window).on("load",function(){
                $.ajax({
                    url:"json_data.txt",
                    dataType:"json",
                    method:"GET",
                    success:function(arg){
                        data = arg;
                    }
                });
          });
          //displays feature specific data in the modal. The data is retrieved above
         $("#modal").on('show.bs.modal',function(e){
            var button = $(e.relatedTarget);
            var caller = button.data('title');
            var modal = $(this);
            var about = data[caller]['about'];
            var images = data[caller]['images'];
            var out = "<div class='container-fluid'><div class='row'>";
            for(i=0;i<images.length;i++){
                  out += "<div class='col-md-4' style='padding:5px;'>"+
                  "<div class='modal-image-box'>"+
                  "<div class='modal-image'>"+ 
                  "<img src='" + images[i]['p_url'] + "' class='img-thumbnail' alt='"+ images[i]['p_name']+"' height='60' width='100'> "+
                  "<div class='modal-image-overlay'>"+
                  "</div>"+ //closed .modal-image-overlay
                  "<div class='modal-image-overlay-text'>"+
                  "<a href='" + images[i]['p_url'] + "'>"+
                  "<button class='btn btn-modal-image'>"+
                  "<span class='glyphicon glyphicon-search'></span>"+
                  "</button>"+
                  "</a>"+
                  "</div>"+ // closed .modal-image-overlay-text
                  "</div>"+ //closed .modal-image
                  "<div class='modal-image-box-text'>"+
                  "<h4>"+ images[i]['p_name']+"</h4>"+
                  "<p>"+ images[i]['p_about']+"</p>"+
                  "</div>"+ //closed .modal-image-box-text
                  "</div>"+ //close .modal-image-box
                  "</div>"; //close .col-md-4 
            }
            out += "</div></div>"; //close .row and .container-fluid
            about += out;
            modal.find('.modal-title').text(caller.toUpperCase());
            modal.find('.modal-body').html(about);
        });

        //Smooth scrollspy

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