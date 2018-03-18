
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Menu open
  $(document).ready(function() {
      $('.navbar-toggler').click(function() {
         $('.collapse').slideToggle();
      });
      $(window).resize(function() {
         if ($(window).width() > 992) {
            $('.collapse').show();
         } else {
            $('.collapse').hide();
         }
      });
  });

  // Menu close on click
  $('.navbar-collapse ul li a').click(function() {
      $('.navbar-toggler:visible').click();
  });
