/*-----------------------------------------------------------------------------------

    Theme Name: Yoga - Health Fitness & Yoga HTML Template
    Description: Health Fitness & Yoga HTML Template
    Author: Chitrakoot Web
    Version: 1.0

    /* ----------------------------------

    JS Active Code Index
            
        01. Preloader
        02. Sticky Header
        03. Scroll To Top
        04. Parallax
        05. Wow animation - on scroll
        06. Video
        07. Current Year
        08. Resize function
        09. FullScreenHeight function
        10. ScreenFixedHeight function
        11. FullScreenHeight and screenHeight with resize function
        12. Sliders
        13. CountUp
        14. Cursor Helper
        15. Portfolio
        
    ---------------------------------- */    

(function($) {

    "use strict";

    var $window = $(window);

        /*------------------------------------
            01. Preloader
        --------------------------------------*/

        $('#preloader').fadeOut('normall', function() {
            $(this).remove();
        });

        /*------------------------------------
            02. Sticky Header
        --------------------------------------*/

        $window.on('scroll', function() {
            var scroll = $window.scrollTop();
            var logochange = $(".navbar-brand img");
            var logodefault = $(".navbar-brand.logodefault img");
            if (scroll <= 175) {
                $("header").removeClass("scrollHeader").addClass("fixedHeader");
                logochange.attr('src', 'other/img/logos/logo-inner.png');
                logodefault.attr('src', 'other/img/logos/logo.png');
            } 
            else {
                $("header").removeClass("fixedHeader").addClass("scrollHeader");
                logochange.attr('src', 'other/img/logos/logo.png');
                logodefault.attr('src', 'other/img/logos/logo.png');
            }
        });

        /*------------------------------------
            03. Scroll To Top
        --------------------------------------*/

        $window.on('scroll', function() {
            if ($(this).scrollTop() > 500) {
                $(".scroll-to-top").fadeIn(400);

            } else {
                $(".scroll-to-top").fadeOut(400);
            }
        });

        $(".scroll-to-top").on('click', function(event) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
        });

        /*------------------------------------
            04. Parallax
        --------------------------------------*/

        // sections background image from data background
        var pageSection = $(".parallax,.bg-img");
        pageSection.each(function(indx) {

            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });

        /*------------------------------------
            05. Wow animation - on scroll
        --------------------------------------*/
        
        var wow = new WOW({
            boxClass: 'wow', // default
            animateClass: 'animated', // default
            offset: 0, // default
            mobile: false, // default
            live: true // default
        })
        wow.init();

        /*------------------------------------
            06. Video
        --------------------------------------*/

        // It is for local video
        $('.story-video').magnificPopup({
            delegate: '.video',
            type: 'iframe'
        });

        $('.source-modal').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 160
        });

        /*------------------------------------
            07. Current Year
        --------------------------------------*/

        $('.current-year').text(new Date().getFullYear());
        
        if ($(".copy-clipboard").length !== 0) {
            new ClipboardJS('.copy-clipboard');
            $('.copy-clipboard').on('click', function() {
                var $this = $(this);
                var originalText = $this.text();
                $this.text('Copied');
                setTimeout(function() {
                    $this.text('Copy')
                    }, 2000);
            });
        };

        /*------------------------------------
            08. Resize function
        --------------------------------------*/

        $window.resize(function(event) {
            setTimeout(function() {
                SetResizeContent();
            }, 500);
            event.preventDefault();
        });

        /*------------------------------------
            09. FullScreenHeight function
        --------------------------------------*/

        function fullScreenHeight() {
            var element = $(".full-screen");
            var $minheight = $window.height();
            element.css('min-height', $minheight);
        }

        /*------------------------------------
            10. ScreenFixedHeight function
        --------------------------------------*/

        function ScreenFixedHeight() {
            var $headerHeight = $("header").height();
            var element = $(".screen-height");
            var $screenheight = $window.height() - $headerHeight;
            element.css('height', $screenheight);
        }

        /*------------------------------------
            11. FullScreenHeight and screenHeight with resize function
        --------------------------------------*/        

        function SetResizeContent() {
            fullScreenHeight();
            ScreenFixedHeight();
            if ($(window).width() < 992) {
                $(".navbar-nav .dropdown-menu.sub-menu").css("display", "none");
            }
            
        }

        SetResizeContent();

    // === when document ready === //
    $(document).ready(function(){

        /*------------------------------------
            12. Sliders
        --------------------------------------*/

        // testmonial-carousel1
        $('.testimonial-carousel1').owlCarousel({
            loop: true,
            responsiveClass: true,
            autoplay: true,
            smartSpeed: 1500,
            nav: false,
            dots: false,
            thumbs: true,
            thumbsPrerendered: true,
            center:false,
            margin: 50,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                768: {
                    items: 1
                },
                992: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });

        // testmonial-carousel3
        $('.testimonial-carousel3').owlCarousel({
            loop: true,
            responsiveClass: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1500,
            nav: false,
            dots: false,
            thumbs: false,
            thumbsPrerendered: false,
            center:false,
            margin: 50,
            items: 1
        });

        // portfolio-carousel1
        $('.portfolio-carousel3').owlCarousel({
            loop: true,
            responsiveClass: true,
            autoplay: true,
            smartSpeed: 1500,
            nav: false,
            dots: true,
            center:false,
            margin: 20,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });

        // history-carousel
        $('.history-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            autoplay: false,
            autoplayTimeout: 5000,
            smartSpeed: 1500,
            nav: false,
            dots: false,
            center:false,
            responsive: {
                0: {
                    items: 1
                },
                481: {
                    items: 2
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200:{
                    items: 4
                },
                1400:{
                    items: 5
                }
            }
        });

        // client-carousel
        $('.client-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1500,
            nav: false,
            dots: false,
            center:false,
            margin: 30,
            responsive: {
                0: {
                    items: 1
                },
                481: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1200:{
                    items: 6
                }
            }
        });

        // Clients carousel
        $('.client-style1').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            smartSpeed:800,
            autoplayTimeout: 3000,
            responsiveClass: true,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 2,
                    margin: 10
                },
                481: {
                    items: 2,
                    margin: 15
                },
                576: {
                    items: 4,
                    margin: 20
                },
                992: {
                    items: 5,
                    margin: 30
                },
                1200: {
                    items: 6,
                    margin: 50
                },
            }
        });

        // Sliderfade
        $('.slider-fade').owlCarousel({
            items: 1,
            loop:true,
            dots: true,
            margin: 0,
            nav: false,
            autoplay: true,
            smartSpeed:1500,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'           
        });
        
        // Default owlCarousel
        $('.owl-carousel').owlCarousel({
            items: 1,
            loop:true,
            dots: false,
            margin: 0,
            autoplay:true,
            smartSpeed:500
        });   

        // Slider text animation
        var owl = $('.slider-fade');
        owl.on('changed.owl.carousel', function(event) {
            var item = event.item.index - 2;     // Position of the current item
            $('span').removeClass('animated fadeInUp');
            $('h1').removeClass('animated fadeInUp');
            $('a').removeClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('span').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('a').addClass('animated fadeInUp');
        });

        /*------------------------------------
            13. CountUp
        --------------------------------------*/

        $('.countup').counterUp({
            delay: 25,
            time: 2000
        });

        $( ".navbar-nav li.has-sub" ).removeClass( "active" );

        /*------------------------------------
            14. Cursor Helper
        --------------------------------------*/
        
        if ($(".cursor-helper").length) {

            var cursor = document.querySelector('.cursor-helper-outer');
            var cursorinner = document.querySelector('.cursor-helper-inner');
            var a = document.querySelectorAll('a');
            var footer = document.querySelectorAll('footer');
            var owlcarousel = document.querySelectorAll('.owl-carousel');
            
            document.addEventListener('mousemove', function (e) {
              var x = e.clientX;
              var y = e.clientY;
              cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
            });

            document.addEventListener('mousemove', function (e) {
              var x = e.clientX;
              var y = e.clientY;
              cursorinner.style.left = x + 'px';
              cursorinner.style.top = y + 'px';
            });

            document.addEventListener('mousedown', function () {
              cursor.classList.add('click');
              cursorinner.classList.add('cursor-helper-innerhover')
            });

            document.addEventListener('mouseup', function () {
              cursor.classList.remove('click')
              cursorinner.classList.remove('cursor-helper-innerhover')
            });

            a.forEach(item => {
              item.addEventListener('mouseover', () => {
                cursor.classList.add('cursor-link');
              });
              item.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-link');
              });
            });

            footer.forEach(item => {
              item.addEventListener('mouseover', () => {
                cursor.classList.add('cursor-light');
              });
              item.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-light');
              });
            });

            owlcarousel.forEach(item => {
              item.addEventListener('mouseover', () => {
                cursor.classList.add('cursor-slider');
              });
              item.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-slider');
              });
            });

          }
      
    });

    // === when window loading === //
    $window.on("load", function() {

        /*------------------------------------
            15. Portfolio
        --------------------------------------*/

        $('.portfolio-gallery').lightGallery();

        $('.portfolio-link').on('click', (e) => {
            e.stopPropagation();
        });

    });

})(jQuery);