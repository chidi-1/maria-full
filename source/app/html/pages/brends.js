$(document).on('click', '.brends-list li img', function () {
    var el = $(this).closest('li');

    if ((device.tablet() || device.mobile()) || $(window).width() <= 992) {
        $('.brends-content').removeClass('hidden-block').empty().append(el.find('.content-wrap .content .mCSB_container').html())
    }
    else{
        if (el.hasClass('active')) {
            el.removeClass('active');
        }
        else {
            $('.brends-list li').removeClass('active');
            el.addClass('active');
        }

    }
})