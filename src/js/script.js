$(document).ready(function() {
$('.rullete__case_btn a').click(function(e){
    e.preventDefault();
    $('.rullete__case').fadeOut(300,function(){
        for (i = 0; i < 4; i++) {
            $(".rullete__slider .rullete__item").clone().appendTo(".rullete__slider");
        }
        $('.rullete').fadeIn(500, function(){
                function selfRandom(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                $('.rullete__slider_wrapper').css({
                    right: "0"
                })
                var x = selfRandom($('.rullete__slider .rullete__item').length/2, $('.rullete__slider .rullete__item').length-1);
                $('.rullete__slider .rullete__item:eq('+x+')').addClass("win_lotery");
                var koef=0;
                if($( window ).width()>1600){
                    koef=0;
                }
                if($( window ).width()<1600 && $( window ).width()>1199){
                    koef= 100;
                }else if($( window ).width()<1200 && $( window ).width()>991){
                    koef= 140;
                }
                else if($( window ).width()<990 && $( window ).width()>768){
                    koef= 180;
                }
                else if($( window ).width()<769 ){
                    koef= 280;
                }
                $('.rullete__slider').animate({
                 right: ((x*180)-(170*2)+koef)
                }, 10000 , function(){
                    var wonImg = $('.win_lotery .item__image img').attr('src');
                    var wonName = $('.win_lotery .item__name').text();
                    var wonDesc = $('.win_lotery .item__desc').text();
                    var parsePrice =$('.win_lotery').attr('data-price');
                    var winHeader =$('.win_head_name');
                    var winPrice =$('.win_head_price');
                    var ImageBody =$('.rullete__win_body');
                    var ImagePaste = $('.rullete__win_body img');
                    $('.rullete').fadeOut(300,function(){
                        winHeader.html(wonName +" | " + wonDesc );
                        ImagePaste.attr('src',wonImg);
                        winPrice.html(parsePrice+'р');
                        $('.rullete__win').fadeIn(400,function(){
                            $('.rullete__win_body').addClass('active');
                        });
                    });
                });
         
        });
    })
})
$('.mainmenu_toggle').click(function(e){
e.preventDefault();
$('.mainmenu_toggle , header#header .mainmenu__wrapper .mainmenu ul').toggleClass('active');
$(' .mainmenu__wrapper .mainmenu ul').slideToggle(400);
});

});

/*

$(document).ready(function () {
            for (i = 0; i < 5; i++) {
                $(".list li").clone().appendTo(".list");
            }
            $('.button').click(function () {
                $('.window').css({
                    right: "0"
                })
                $('.list li').css({
                    border: '4px solid transparent'
                })
                function selfRandom(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                var x = selfRandom(50, 100);
                $('.list li:eq('+x+')').css({
                    border:'4px solid #00ba00'
                })
                $('.window').animate({
                    right: ((x*130)+(x*8-12)-210)
                }, 10000);
            });
        });*/