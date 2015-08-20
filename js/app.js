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
            strings: ["> Bienvenue.^1000<br>" +
            "> Je m'appelle Maxime Miramond.^1000<br>" +
            "> J'aime le code, ^1000les films, ^1000la musique ^2000et le ^200b^200a^200c^200o^200n^200.^200"],
            typeSpeed: 30,
            backDelay: 500,
            loop: false,
            loopCount: false,
            showCursor: false
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space
