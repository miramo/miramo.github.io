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

        var defaultError = 0.04;
        var defaultTime = 100;
        $('#typed-text')
            .typetype("> ", {e: 0, t: 0})
            .delay(1000)
            .typetype("Bienvenue.", {
                e: defaultError,
                t: defaultTime,
                callback: function() {
                    $('#typed-text').append('<br>');
                }
            })
            .typetype("> ", {e: 0, t: 0})
            .delay(1000)
            .typetype("Je m'appelle Maxime MIRAMOND.", {e: defaultError, t: defaultTime})
            .delay(500)
            .typetype(" Je suis étudiant", {e: defaultError, t: defaultTime})
            .backspace(8)
            .typetype("Développeur.", {
                e: defaultError,
                t: defaultTime,
                callback: function() {
                    $('#typed-text').append('<br>');
                }
            })
            .typetype("> ", {e: 0, t: 0})
            .delay(1000)
            .typetype("J'aime le code, ", {e: defaultError, t: defaultTime})
            .delay(1000)
            .typetype("les films, ", {e: defaultError, t: defaultTime})
            .delay(1000)
            .typetype("la musique ", {e: defaultError, t: defaultTime})
            .delay(1000)
            .typetype("et ", {e: defaultError, t: defaultTime})
            .delay(1000)
            .typetype("le ", {e: defaultError, t: defaultTime})
            .delay(1000)
            .typetype("bacon. :)", {
                e: defaultError,
                t: defaultTime + 100,
                callback: function() {
                    $("#typed-text").html($("#typed-text").html().replace("code","<a target='_blank' href='https://github.com/miramo'>code</a>"));
                    $("#typed-text").html($("#typed-text").html().replace("films","<a target='_blank' href='http://trakt.tv/users/koalapwned'>films</a>"));
                    $("#typed-text").html($("#typed-text").html().replace("musique","<a target='_blank' href='https://player.spotify.com/user/max832511'>musique</a>"));
                }
            });

        $("nav ul li a, a.brand-logo, a#page-scroll-link").click(function (event) {
            $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top - $("nav").height()},
                {duration: 1500, easing: "easeInOutExpo"});
            event.preventDefault();
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space
