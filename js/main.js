var scrollPos = 0;

$(document).ready(function() {
    $('#close-modal').click(function(){
        closeModal();
    });

    $('#up').click(function(){
        spinner('up');
    });
    
    $('#down').click(function(){
        spinner('down');
    });

    $(document).scroll(function () {
        var $nav = $('#navbar-fixed');
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        scrollPos = $(document).scrollTop();
    });

    $('.scroll-link, .arrow-link, .btn').click(function() {
        var sectionTo = $(this).attr('href');
        var offset = Math.abs($(sectionTo).offset().top - scrollPos);

        $('html, body').animate({
          scrollTop: $(sectionTo).offset().top-30
        }, offset/2);
    });

    if( $(document).scrollTop()>60) {
        $('#navbar-fixed').addClass('scrolled');
    }


    Ecwid.OnCartChanged.add(function(cart){
        $('.cart-item-counter').html(cart.productsQuantity);
    });
});




function openModal(product){

    $('#product-name').text(product.name);
    $('#product-price').text('US$'+product.price);
    $('#product-image').attr('src','img/'+product.image);
    $('#qty').val(parseInt($('#qty').attr('min')));

    $('#cart-modal').attr('data-productid',product.id);
    
    $('#cart-modal').css('display', 'flex');

    $('#error-message').hide();

}

function closeModal(){
    $('#cart-modal').css('display', 'none');
}

function spinner(direction){
    var qty = parseInt($('#qty').val());
    var min = parseInt($('#qty').attr('min'));
    if(isNaN(qty))qty=0;
    qty+=(direction==='up')?1:-1;
    if(qty<min)qty=min;
    $('#qty').val(qty);
}

function checkout(){
    var qty = parseInt($('#qty').val());
    var pid = $('#cart-modal').attr('data-productid');

    // remove the previous items from the cart
    Ecwid.Cart.clear();

    var product = {
        id: pid,
        quantity: qty,
    };

    product.callback = function(success, product, cart){

        if(success === true) {
            //skip the cart, go to checkout page
            window.location.hash = 'ecwid:mode=checkoutPD';
        }
    }
    
    closeModal();
    Ecwid.Cart.addProduct(product);
}

function addToCart(){
    var qty = parseInt($('#qty').val());
    var pid = $('#cart-modal').attr('data-productid');
    
    var product = {
        id: pid,
        quantity: qty
    };

    product.callback = function(success, product, cart){
        if(!success){
           $('#error-message').html('Out of stock.');
           $('#error-message').show();
        }else{
            closeModal();
        }
    }
    Ecwid.Cart.addProduct(product);
}






