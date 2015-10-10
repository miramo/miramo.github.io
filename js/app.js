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
        $('#typed-text')
            .typetype("> ", {e: 0, t: 0})
            .delay(1000)
            .typetype("Bienvenue.", {
                e: 0.04,
                t: 70,
                callback: function() {
                    $('#typed-text').append('<br>');
                }
            })
            .typetype("> ", {e: 0, t: 0})
            .delay(1000)
            .typetype("Je m'appelle Maxime MIRAMOND.", {e: 0.04, t: 100})
            .delay(500)
            .typetype(" Je suis étudiant", {e: 0.04, t: 100})
            .backspace(8)
            .typetype("Développeur.", {
                e: 0.04,
                t: 100,
                callback: function() {
                    $('#typed-text').append('<br>');
                }
            })
            .typetype("> ", {e: 0, t: 0})
            .delay(1000)
            .typetype("J'aime le code, ", {e: 0.04, t: 100})
            .delay(1000)
            .typetype("les films, ", {e: 0.04, t: 100})
            .delay(1000)
            .typetype("la musique ", {e: 0.04, t: 100})
            .delay(1000)
            .typetype("et ", {e: 0.04, t: 100})
            .delay(1000)
            .typetype("le ", {e: 0.04, t: 100})
            .delay(1000)
            .typetype("bacon. :)", {e: 0.04, t: 200});

        $("nav ul li a, a.brand-logo, a#page-scroll-link").click(function (event) {
            $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top - $("nav").height()},
                {duration: 1500, easing: "easeInOutExpo"});
            event.preventDefault();
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space
