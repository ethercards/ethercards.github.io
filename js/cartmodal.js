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

    

});

function openModal(product/* id, name, price, qty, image */){

    $('#product-name').text(product.name);
    $('#product-price').text('US$'+product.price);
    $('#product-image').attr('src','img/'+product.image);
    $('#qty').val(parseInt($('#qty').attr('min')));

    $('#cart-modal').attr('data-productid',product.id);
    
    $('#cart-modal').show();

}

function closeModal(){
    $('#cart-modal').hide();
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
			
        console.log(success); // true or false
        console.log(product.name);
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
        quantity: qty,
    };

    closeModal();
    Ecwid.Cart.addProduct(product);

}