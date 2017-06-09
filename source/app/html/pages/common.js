var owl_basket;

$(document).ready(function () {
    var timeout_link;

    if ($('.js--select-styled').length) {
        $('.js--select-styled').styler({
            onFormStyled: function () {
                $(this).css('outline', '3px solid red');
            },
            onSelectClosed: function () {
                var select = $(this);

                if (select.closest('form').hasClass('filter-form')) {
                    if (timeout_link) {
                        clearTimeout(timeout_link)
                    }
                    timeout_link = setTimeout(function () {
                        set_filter();
                    }, 1000)
                }

                if (select.parents().hasClass('condition')) {
                    var index = select.find('option:selected').index();
                    $('.tabs__caption li').eq(index).trigger('click');
                }

                if (select.parents().hasClass('item')) {
                    var index = select.find('option:selected').index();
                    $('.item--about .tabs__caption li').eq(index).trigger('click');
                }
            }
        });
    }
    ;

    if ($('.slider').length) {
        $(".slider").each(function () {
            var slider = $(this);
            var min = slider.data('min');
            var max = slider.data('max');
            var current = slider.data('current');
            var range = slider.data('range');

            slider.slider({
                range: range,
                min: min,
                max: max,
                value: current,
                create: function () {
                    $(this).closest('.slider-wrap').find('.value').text($(this).slider("value") + ' руб.');
                },
                slide: function (event, ui) {
                    $(this).closest('.slider-wrap').find('.value').text($(this).slider("value") + ' руб.');
                    if (timeout_link) {
                        clearTimeout(timeout_link)
                    }
                    timeout_link = setTimeout(function () {
                        set_filter();
                    }, 1000)
                }
            });
        })
    }

    $('.filter-form input').change(function () {
        if (timeout_link) {
            clearTimeout(timeout_link)
        }
        timeout_link = setTimeout(function () {
            set_filter();
        }, 1000)
    });

    $('.js--open-dropdown').click(function () {
        if ($('.dropdown-wrap.open').length && !($(this).closest('.dropdown-wrap').hasClass('open'))) {
            $('.dropdown-wrap.open').removeClass('open');
        }
        $(this).closest('.dropdown-wrap').toggleClass('open');
        return false;
    });

    if (device.tablet == false && device.mobile == false) {
        $('.header--bottom .dropdown-wrap').hover(function () {
                $(this).addClass('open')
            },
            function () {
                $(this).removeClass('open')
            });
    }

    $('body').click(function (event) {
        var target = $(event.target);

        if (!(target.parents().hasClass('dropdown-wrap'))) {
            $('.dropdown-wrap.open').removeClass('open');
        }
        if (!(target.parents().hasClass('brends-list'))) {
            $('.brends-list li').removeClass('active');
        }

    });

    $('.js--open-menu').click(function () {
        var block = $(this).closest('li');

        if (block.hasClass('open')) {
            block.removeClass('open')
        } else {
            block.addClass('open')
        }

        return false;
    });

    var window_width = $(window).width();

    if ($('.index--slider').length) {
        $('.index--slider').owlCarousel({
            loop: true,
            nav: true,
            dots: true,
            navText: [,],
            autoplay: true,
            autoplayTimeout: 100000,
            autoplayHoverPause: true,
            items: 1,
            onInitialized: function () {
                var section = $('.index--slider .owl-item.active .index--slider__el');

                if (section.hasClass('animation-wrap')) {
                    var active_section = section;
                    var inter = 0;
                    var timer = 300;

                    active_section.find('.animate-el').each(function () {
                        var item = $(this);
                        var animatetype = item.data('animate');

                        setTimeout(function () {
                            item.addClass('animated ' + [animatetype]);
                        }, inter * timer);
                        inter++;
                    });

                    section.removeClass('animation-wrap')
                }

                var top = section.find('.banner-content').height();
                var offset = section.find('.banner-content').position();

                $('.index--slider .owl-dots').css('top', top + offset.top + 20);

                if (section.hasClass('index--slider__el-right')) {
                    $('.index--slider .owl-dots').css('margin-left', offset.right);
                }
                else {
                    $('.index--slider .owl-dots').css('margin-left', offset.left);
                }
            },
            onTranslate: function () {
                $('.index--slider .owl-dots').fadeOut(100);

                var section = $('.index--slider .owl-item.active').next().find('.index--slider__el');

                var top = section.find('.banner-content').height();
                var offset = section.find('.banner-content').position();

                $('.index--slider .owl-dots').css('top', top + offset.top + 20);
                if (section.hasClass('index--slider__el-right')) {
                    $('.index--slider .owl-dots').css('margin-left', offset.right);
                }
                else {
                    $('.index--slider .owl-dots').css('margin-left', offset.left);
                }
            },
            onTranslated: function () {
                $('.index--slider .owl-dots').fadeIn(200);
                var section = $('.index--slider .owl-item.active .index--slider__el');
                if (section.hasClass('animation-wrap')) {
                    var active_section = section;
                    var inter = 0;
                    var inter = 0;
                    var timer = 300;

                    active_section.find('.animate-el').each(function () {
                        var item = $(this);
                        var animatetype = item.data('animate');

                        setTimeout(function () {
                            item.addClass('animated ' + [animatetype]);
                        }, inter * timer);
                        inter++;
                    });

                    section.removeClass('animation-wrap')
                }
            }
        });
    }

    if ($('.about-slider').length) {
        $('.about-slider').owlCarousel({
            margin: 0,
            loop: true,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 1,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1270: {
                    items: 5
                }
            }
        });
    }

    if ($('.slider-discount').length) {
        $('.slider-discount').owlCarousel({
            margin: 0,
            loop: true,
            nav: false,
            dots: true,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 1,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                480: {
                    items: 1,
                    margin: 15
                },
                768: {
                    items: 1
                },
                992: {
                    items: 3
                },
                1270: {
                    items: 3
                }
            }
        });
    }

    if ($('.slider-item').length) {
        $('.slider-item').owlCarousel({
            margin: 0,
            loop: true,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 1,
            responsive: {
                0: {
                    items: 1,
                    margin: 0,
                    dots: false,
                    nav: true
                },
                480: {
                    items: 2,
                    dots: false,
                    nav: true
                },
                768: {
                    items: 3,
                    dots: false,
                    nav: true

                },
                992: {
                    items: 4,
                    dots: false,
                    nav: true
                },
                1270: {
                    items: 4,
                    dots: false,
                    nav: true
                }
            }
        });
    }

    if ($('.trends-slider').length) {
        $('.trends-slider').owlCarousel({
            margin: 10,
            loop: true,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 2,
            responsive: {
                0: {
                    items: 2,
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 6
                },
                1270: {
                    items: 6
                }
            }
        });
    }


    if ($('.cart-list--slider').length && ((device.tablet() || device.mobile()) || $(window).width() <= 992)) {
        owl_basket = $('.cart-list--slider');

        owl_basket.owlCarousel({
            margin: 0,
            loop: false,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 2,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2
                },
                550: {
                    items: 3
                },
                768: {
                    items: 4
                }
            }
        });
    }

    if ($('.fancy').length) {
        $('.fancy').fancybox();
    }

    // изменение типа доставки в корзине

    $('.js--change-info').change(function () {
        var inp = $(this);
        if (inp.is(':checked')) {
            $('.dev--info').each(function () {
                $(this).addClass('disabled');
                $(this).find('.inp').attr('disabled', 'disabled');
            });
            inp.closest('label.radio').next().removeClass('disabled').find('.inp').removeAttr('disabled');
        }
    });

    $(document).on('click', '.js--form-submit', function () {
        var form = $(this).parents('.main-form');
        var errors = false;

        $(form).find('.required').each(function () {
            var val = $(this).prop('value');
            if (val == '') {
                $(this).addClass('error');
                errors = true;
            }
            else {
                if ($(this).hasClass('inp-mail')) {
                    if (validateEmail(val) == false) {
                        $(this).addClass('error');
                        errors = true;
                    }
                }
                if (form.find('.js--new-password').length) {
                    if (form.find('.js--new-password').val() != form.find('.js--new-password2').val()) {
                        form.find('.js--new-password').addClass('error')
                        form.find('.js--new-password2').addClass('error')
                    }
                }
            }
        });

        if (errors == false) {
            var button_value = $(form).find('.js--form-submit').prop('value');
            $(form).find('.js--form-submit').prop('value', 'Отправляем...');

            var method = form.attr('method');
            var action = form.attr('action');
            var data = form.serialize();
            $.ajax({
                type: method,
                url: action,
                data: data,
                success: function (data) {
                    form.find('.inp').each(function () {
                        $(this).prop('value', '')
                    });
                    $(form).find('.js--form-submit').text(button_value);
                    window.location.href = "thanks.html";
                },
                error: function (data) {
                    $(form).find('.js--form-submit').prop('value', 'Ошибка');
                    setTimeout(function () {
                        $(form).find('.js--form-submit').prop('value', button_value);
                    }, 2000);
                }
            });
        }

        return false;
    });

    $('.inp').focus(function () {
        $(this).removeClass('error')
    });

    if ($('#about-map').length) {
        var icon = $('#about-map').data('img');

        ymaps.ready(function () {
            var myMap = new ymaps.Map('about-map', {
                    center: [55.682516, 37.535900],
                    zoom: 14
                }, {
                    searchControlProvider: 'yandex#search'
                }),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
                    iconLayout: 'default#image',
                    iconImageHref: icon,
                    iconImageSize: [80, 100],
                    iconImageOffset: [-40, -50]
                });

            myMap.geoObjects.add(myPlacemark);
        });
    }

    $('.js--close-contacts').click(function () {
        $(this).closest('.map--contacts').fadeOut();
    });

    if ($('.accordeon').length) {

        $('.acc__container').hide();
        $('.acc__trigger:first').addClass('active').next().show();

        $('.acc__trigger').click(function () {
            if ($(this).next().is(':hidden')) {
                $('.acc__trigger').removeClass('active').next().slideUp();
                $(this).toggleClass('active').next().slideDown();
            }
            return false;
        });
    }

    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

});

function set_filter() {
    var form = $('.filter-form');
    var url = form.attr('action');
    var method = form.attr('method');
    var data = form.serialize();

    $.ajax({
        url: url,
        method: method,
        data: data,
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);
            $('.catalog .load-container').empty().html(parse_data.header_html);
        }
    });

    return false;
}

$(document).on('click', '.js--mobile-menu', function () {
    $('.header--bottom').toggleClass('is_open');
    $(this).toggleClass('is_open');
    $('.header').toggleClass('fixed');
    return false;
});

$(document).on('click', '.js--change-category', function () {
    var val = $(this).text();
    $('.change-category input').val(val);
    $('.dropdown-wrap.open').removeClass('open');

    return false;
});