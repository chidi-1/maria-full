// удалить дисконтную карту
$(document).on('click', '.js--lk-remove-discount', function () {
    var btn = $(this);
    var url = btn.data('url');
    var method = btn.data('method');
    var id = btn.data('id');
    var block = btn.closest('.lk--discount-added--el');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function () {
            console.log('11')
            block.remove();
        }
    });

    return false;
});

var index_load_adres;

// Добавить адрес доставки
$(document).on('click', '.js--add-adress', function () {
    var btn = $(this);
    var url = btn.data('url');

    btn.prev().append('<div class="lk--adress--el"></div>');
    var block =  btn.prev().find('.lk--adress--el:last-child');
    block.load(btn.data('url'));
    index_load_adres = btn.prev().find('.lk--adress--el').length;

    return false;
});

function add_adress(){
   $('.js--select-styled').styler();
        var block =  $('.lk--adress--el:last-child');
        block.find('span.title').text(block.find('span.title').text() + index_load_adres);
        var name = block.find('select').attr('name');
        block.find('select').attr('name',  name + index_load_adres);
        block.find('.inp').each(function(){
            var name = $(this).attr('name');
            $(this).attr('name',  name + index_load_adres);
        })
}