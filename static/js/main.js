/*  ---------------------------------------------------
    Template Name: Male Fashion
    Description: Male Fashion - ecommerce teplate
    Author: Colorib
    Author URI: https://www.colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.product__filter').length > 0) {
            var containerEl = document.querySelector('.product__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*-----------------------
        Hero Slider
    ------------------------*/
    $(".hero__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='arrow_left'><span/>", "<span class='arrow_right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*-------------------
		Radio Btn
	--------------------- */
    $(".product__color__select label, .shop__sidebar__size label, .product__details__option__size label").on('click', function () {
        $(".product__color__select label, .shop__sidebar__size label, .product__details__option__size label").removeClass('active');
        $(this).addClass('active');
    });

    /*-------------------
		Scroll
	--------------------- */
    $(".nice-scroll").niceScroll({
        cursorcolor: "#0d0d0d",
        cursorwidth: "5px",
        background: "#e5e5e5",
        cursorborder: "",
        autohidemode: true,
        horizrailenabled: false
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview start
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if(mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end


    // Uncomment below and use your date //

    /* var timerdate = "2020/12/30" */

    $("#countdown").countdown(timerdate, function (event) {
        $(this).html(event.strftime("<div class='cd-item'><span>%D</span> <p>Days</p> </div>" + "<div class='cd-item'><span>%H</span> <p>Hours</p> </div>" + "<div class='cd-item'><span>%M</span> <p>Minutes</p> </div>" + "<div class='cd-item'><span>%S</span> <p>Seconds</p> </div>"));
    });

    /*------------------
		Magnific
	--------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="add-cart fa fa-angle-up dec qtybtn"  data-action="add"></span>');
    proQty.append('<span class="add-cart fa fa-angle-down inc qtybtn" data-action="remove"></span>' );
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

    var proQty = $('.pro-qty-2');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

    /*------------------
        Achieve Counter
    --------------------*/
    $('.cn_num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);

console.log('Hello world')
var AddtoCart = document.getElementsByClassName('add-cart')
var i =0;
for (i=0; i <AddtoCart.length;i++){
    AddtoCart[i].addEventListener('click', function () {
        var action = this.dataset.action
        var productId = this.dataset.product
        console.log('USER',user)
        if (user === 'AnonymousUser'){
            addCookieitem(productId,action)
        }
        else {
        UpdateUserOrder(productId,action)

        }
    })
}

 function UpdateUserOrder(productId, action) {
    console.log('you are logged in')
     console.log(productId)
     var url = '/update-item/'
                fetch(url,{
                    method:'POST',
                    headers:{
                        'Type':'application/json'
                    },

                    body:JSON.stringify({'productId':productId,'action':action})
                })
                    .then((r) =>{
                        console.log(r);
                        return r.json()

                    })
                    .then((data)=>{
                        console.log('data',data);
                        location.reload()

                    })
            }

var form = document.getElementById('form')
form.addEventListener('submit',function (e) {
    e.preventDefault()
    $('#payment-info').show()
    $('#make-payment').hide()
})
document.getElementById('paypal').addEventListener('click',function (e) {
    submitFormData()
})
function submitFormData() {
    console.log('data submitted')
    var userFormData ={
        'first_name':null,
        'last_name':null,
        'email':null,
        'total':total
    }
    var shippingInfo ={
        'address':null,
        'city':null,
        'state':null,
        'zipcode':null
    }
    if (user === 'AnonymousUser'){
        userFormData.first_name = form.first_name.value
        userFormData.last_name = form.last_name.value
        userFormData.email = form.email.value
    }
        shippingInfo.address = form.address.value
        shippingInfo.city = form.city.value
        shippingInfo.state = form.state.value
        shippingInfo.zipcode = form.zipcode.value

    var url = '/process_order/'
    fetch(url,{
                        method:'POST',
                        headers:{
                            'Type':'application/json',
                            'X-CSRFToken':csrftoken
                        },

                        body:JSON.stringify({'user_info':userFormData,'shippingInfo':shippingInfo})
                    })
                        .then((r) => r.json())
                        .then((data)=>{
                            console.log('data',data);
                            alert('Transaction completed');
                            cart ={}
                            document.cookie = 'cart=' + JSON.stringify(cart)+";domain=;path=/"
                            window.location.href = "{% url 'store' %}"

                        })

}
function addCookieitem(productId, action) {
    console.log('User is not authenticated')
    if (action ==='add'){
        if (cart[productId]===undefined){
            cart[productId] = {'quantity':1}
        }
        else {
            cart[productId]['quantity'] +=1
        }
    }
    if (action ==='remove'){
        cart[productId]['quantity'] -=1
        if (cart[productId]['quantity'] <=0) {
            console.log('remove item')
            delete cart[productId]
        }
    }
    console.log('cart:',cart)
    document.cookie = 'cart=' + JSON.stringify(cart)+ ";domain=;path=/"
    location.reload()
}