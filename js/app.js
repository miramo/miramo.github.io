(function($)
{
    $(function()
    {
        //var touch;
        //if ($(window).width() < 992 || Modernizr.touch)
        //    touch = true;
        //else
        //    touch = false;

        $('.parallax').parallax();
        $('.button-collapse').sideNav();

        $(window).scroll(function()
        {
            if ($("nav").offset().top > 50)
                $("nav, .navbar-fixed").addClass("notTop");
            else
                $("nav, .navbar-fixed").removeClass("notTop");
        });

        $("#typed-text").typed({
            strings: ["> ^1000Bienvenue.\n" +
            "> ^1000Je m'appelle Maxime MIRAMOND.^1000 Je suis Développeur\n" +
            "> ^1000J'aime le code, ^1000les films, ^1000la musique ^1000et ^1000le ^1000b^200a^200c^200o^200n^200.^200 ^200:)"],
            typeSpeed: 30,
            backDelay: 500,
            loop: false,
            loopCount: false,
            showCursor: false
        });
        $("nav ul li a, a.brand-logo, a.page-scroll").click(function (event) {
            $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top - $("nav").height()},
                {duration: 1500, easing: "easeInOutExpo"});
            event.preventDefault();
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space
