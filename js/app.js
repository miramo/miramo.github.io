(function($)
{
    $(function()
    {
        var touch;
        if ($('body').width() < 992 || Modernizr.touch)
            touch = true;
        else
            touch = false;

        $('.parallax').parallax();
        $('.button-collapse').sideNav();
    }); // end of document ready
})(jQuery); // end of jQuery name space