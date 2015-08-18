(function($)
{
    $(function()
    {
        //var touch;
        //if ($('body').width() < 992 || Modernizr.touch)
        //    touch = true;
        //else
        //    touch = false;

        $('.parallax').parallax();
        $('.button-collapse').sideNav();

        // jQuery to collapse the navbar on scroll
        $(window).scroll(function()
        {
            if ($("nav").offset().top > 50)
                $("nav, .navbar-fixed").addClass("notTop");
            else
                $("nav, .navbar-fixed").removeClass("notTop");
        });
        $('.button-collapse').click(function()
        {
            if ($('.navbar-fixed').css("z-index") < 998)
                $('.navbar-fixed').css("z-index", 998);
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space