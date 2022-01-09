

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

// var form = document.getElementById('form')
// form.addEventListener('submit',function (e) {
//     e.preventDefault()
//     $('#payment-info').show()
//     $('#make-payment').hide()
// })
// document.getElementById('paypal').addEventListener('click',function (e) {
//     submitFormData()
// })
// function submitFormData() {
//     console.log('data submitted')
//     var userFormData ={
//         'first_name':null,
//         'last_name':null,
//         'email':null,
//         'total':total
//     }
//     var shippingInfo ={
//         'address':null,
//         'city':null,
//         'state':null,
//         'zipcode':null
//     }
//     if (user === 'AnonymousUser'){
//         userFormData.first_name = form.first_name.value
//         userFormData.last_name = form.last_name.value
//         userFormData.email = form.email.value
//     }
//         shippingInfo.address = form.address.value
//         shippingInfo.city = form.city.value
//         shippingInfo.state = form.state.value
//         shippingInfo.zipcode = form.zipcode.value
//
//     var url = '/process_order/'
//     fetch(url,{
//                         method:'POST',
//                         headers:{
//                             'Type':'application/json',
//                             'X-CSRFToken':csrftoken
//                         },
//
//                         body:JSON.stringify({'user_info':userFormData,'shippingInfo':shippingInfo})
//                     })
//                         .then((r) => r.json())
//                         .then((data)=>{
//                             console.log('data',data);
//                             alert('Transaction completed');
//                             cart ={}
//                             document.cookie = 'cart=' + JSON.stringify(cart)+";domain=;path=/"
//                             window.location.href = "{% url 'store' %}"
//
//                         })
//
// }
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

