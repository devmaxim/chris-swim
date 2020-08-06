(function($) {
  $(document).ready(function(){
    /**
     * AOS
     * https://michalsnik.github.io/aos/
     */
    AOS.init({
      once: true // Choose wheter animation should fire once, or every time you scroll up/down to element
    });

    /**
     * Hamburger Menu Toggle
     */
    function openMenu() {
      $('.menu-open').toggleClass('active');
      $(this).toggleClass('active');
    }
    $('.hamburger-menu').click(openMenu);

    /**
     * Header Text JS
     * @type {HTMLElement}
     */
    var typeText    = document.getElementById('type-text');
    var typewriter  = new Typewriter(typeText, { loop: true,  delay: 75 });
    typewriter.typeString('Moraga')
              .pauseFor(2000)
              .deleteAll()
              .typeString('Orinda')
              .pauseFor(2000)
              .deleteAll()
              .typeString('Lafayette')
              .pauseFor(2000)
              .deleteAll()
              .pauseFor(1000)
              .start();


  });

  $(window).load(function () {

  });

}(jQuery));