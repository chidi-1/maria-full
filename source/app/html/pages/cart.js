var timeout_link; // задержка при вводе в поле

// удалить позицию из корзины
$(document).on('click', '.js--delete-item', function () {
    var btn = $(this);
    var url = btn.closest('form').data('remove-url');
    var method = btn.closest('form').attr('method');
    var id = btn.closest('li').data('id');
    var block = btn.closest('li');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function (data) {

            var parse_data = jQuery.parseJSON(data);

            var number = parse_data.total_length.toString();
            var number_text = " товаров";
            number = Number(number.substr(number.length - 1, 1));

            if (number == 1) {
                number_text = " товар";
            }
            if (number == 2 || number == 3 || number == 4) {
                number_text = " товара";
            }

            $('.cart-list .total .cart-list--amount span').text(parse_data.total_amout);
            $('.cart-list .total .cart-list--total span').html(parse_data.total + ' руб.');
            $('.header--basket-summ').html(parse_data.total + ' р.');
            $('.header--basket-current span').html('<i>' + parse_data.total_length + '</i>' + number_text);
            $('.header--basket-full .dropdown .header--basket-list').html(parse_data.header_html);

            console.log($('.cart-list--slider').hasClass('owl-carousel'))

            if($('.cart-list--slider').hasClass('owl-carousel')){
                block.closest('.owl-item').remove();
                owl_basket.trigger('refresh.owl.carousel');
            }else{
                block.remove();
            }

            if (number == 0) {

                $('.cart-full').addClass('hidden-block');
                $('.cart-empty').removeClass('hidden-block');

                $('.cart-list .total .full').addClass('hidden-block');
                $('.cart-list .total .empty').removeClass('hidden-block');
                $('.header--basket-current').text('0 товаров');
                $('.header--basket-summ').text('0 руб.');
            }
        }
    });

    return false;
});

// удалить позицию из корзины в шапке
$(document).on('click', '.js--delete-header-item', function () {
    var btn = $(this);
    var url = btn.closest('ul').data('url');
    var method = btn.closest('ul').data('method');
    var id = btn.closest('li').data('id');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);

            $('.header--basket-full .dropdown .header--basket-list').html(parse_data.header_html);
            $('.header--basket-full .dropdown .flex-between .value').text(parse_data.total + ' руб.');
            $('.header--basket-summ').text(parse_data.total + ' р.');
            $('.header--current-mobile').text(parse_data.total_length);

            if($('.header--basket-full .dropdown .full ul li').length){
                if($('.cart').length){
                    $('.cart-list li[data-id=' + id + ']').remove();

                    var number = parse_data.total_length.toString();
                    var number_text = " товаров";
                    number = Number(number.substr(number.length - 1, 1));

                    if (number == 1) {
                        number_text = " товар";
                    }
                    if (number == 2 || number == 3 || number == 4) {
                        number_text = " товара";
                    }

                    $('.cart-list .total .cart-list--total span').html(parse_data.total + ' руб.');
                    $('.cart-list--amount span').text(parse_data.total_length);

                }
                else{
                    $('.cart-list .total .cart-list--total span').html(parse_data.total + ' руб.');
                }

            }
            else{
                $('.cart-list .total .full').addClass('hidden-block');
                $('.cart-list .total .empty').removeClass('hidden-block');
                $('.header--basket-current').text('0 товаров');
                $('.header--basket-summ').text('0 руб.');

                if($('.cart').length){
                    $('.cart-full').addClass('hidden-block');
                    $('.cart-empty').removeClass('hidden-block');
                }
            }


            if ($('.basket-list li').length == 0) {
                $('.basket-full').addClass('hidden-block');
                $('.basket-empty').removeClass('hidden-block');
                $('.header__links-bas').addClass('empty')
            }
        }
    });

    return false;
});

// изменить количество товаров в корзине
function change_basket(block) {
    var url = block.closest('form').data('change-url');
    var method = block.closest('form').data('method');
    var id = block.data('id');
    var amount = block.find('.cart-list--amount .input-number').prop('value');

    $.ajax({
        url: url,
        method: method,
        data: {id: id, amount: amount},
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);
            $('li.total .cart-list--total span').html(parse_data.total + ' руб.');
            $('.header--basket-summ').html(parse_data.total + ' р.');
            block.find('.cart-list--total span').html(parse_data.total_el + ' руб.');
        }
    });

    return false;
}


// ввод только цифр в поле количетво
$(document).on('keydown', '.inp-number', function () {
    input_number();
});

// ввод только цифр в поле
var input_number = function () {
    var allow_meta_keys = [86, 67, 65];
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 110 || event.keyCode == 191 ||
            // Разрешаем: Ctrl+A
        ($.inArray(event.keyCode, allow_meta_keys) > -1 && (event.ctrlKey === true || event.metaKey === true)) ||
            // Разрешаем: home, end, влево, вправо
        (event.keyCode >= 35 && event.keyCode <= 39)) {
        return
    }
    else {
        // Обеждаемся, что это цифра, и останавливаем событие keypress
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault();
        }
    }
};

// ввод количества с клавиатуры
$(document).on('input', '.inp-number', function () {
    var input = $(this);

    if (input.data("lastval") != input.val()) {
        if (input.val() == '') {
            input.prop('value', 1)
        }
        else {
            var value = input.prop('value');
            value = value.replace(/\s+/g, '');
            value = Number(value);
            value = value.toString();
            value = number_format(value);
            if (value == "NaN") {
                input.prop('value', 1)
            } else {
                input.prop('value', value);
            }
        }
        input.data("lastval", input.val());


        if (input.parents().hasClass('cart-list--amount')) {
            if (timeout_link) {
                clearTimeout(timeout_link)
            }
            timeout_link = setTimeout(function () {
                change_basket(input.closest('li'));
            }, 250)
        }
    }
});

// формат цифр
function number_format(str) {
    return str.replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
}

// применить скидку

$(document).on('click', '.js--card-discount', function () {
    var btn = $(this);
    var discount_value = btn.closest('.cart-list--discount').find('.inp').prop('value');

    if (discount_value != '') {

        var url = btn.closest('form').data('discount-url');
        var method = btn.closest('form').data('method');

        $.ajax({
            url: url,
            method: method,
            data: {value: discount_value},
            success: function (data) {
                var parse_data = jQuery.parseJSON(data);

                if (parse_data.is_active == 'true') {
                    $('li.total .cart-list--total span').html(parse_data.total + ' руб.');
                    $('.header--basket-summ').html(parse_data.total + ' р.');
                }
                else {
                    btn.closest('.cart-list--discount').find('.inp').addClass('error')
                }
            }
        });
    }

    return false;
});

$(document).on('focus', 'input', function () {
    $(this).removeClass('error');
});

$(document).on('click', '.js--open-history-list', function () {
    if((device.tablet() || device.mobile()) || $(window).width() >= '992'){
        $(this).closest('.flex-between').toggleClass('open-next').next('.item--list-wrap').stop().slideToggle(200);
    }
    return false;
});
