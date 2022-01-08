from .models import *
import json


def cookieCart(request):
    try:
        cart = json.loads(request.COOKIES['cart'])
    except:
        cart = {}
    print(cart)
    items = []
    order = {
        'get_cart_total': 0,
        'get_cart_item': 0
    }

    cartitems = order['get_cart_item']
    for i in cart:
        try:
            cartitems += cart[i]['quantity']
            product = Product.objects.get(id=i)

            total = float(product.price * cart[i]['quantity'])
            order['get_cart_total'] += total
            order['get_cart_item'] += cart[i]['quantity']

            item = {
                'product': {
                    'id': product.id,
                    'name': product.name,
                    'image.cdn_url': product.image.cdn_url,
                    'price': product.price
                },
                'quantity': cart[i]['quantity'],
                'get_total': total
            }
            items.append(item)
        except:
            pass

    return {'items':items, 'cartitems':cartitems, 'order':order}



def cratedata(request):
    if request.user.is_authenticated:
        if request.user.is_authenticated:
            if not Customer.objects.filter(user=request.user).exists():
                Customer.objects.create(user=request.user)
        customer = request.user.customer
        order, created = Order.objects.get_or_create(owner=customer, completed=False)
        items = order.orderitem_set.all()
        cartitems = order.get_cart_item
    else:
        cookieData = cookieCart(request)
        items = cookieData['items']
        order = cookieData['order']
        cartitems = cookieData['cartitems']
    return {'items': items, 'order': order, 'cartitems': cartitems, }

def guestorder(request, data):
    print(request.COOKIES)
    first_name = data['user_info']['first_name']
    last_name = data['user_info']['last_name']
    email = data['user_info']['email']
    cookie_checkout = cookieCart(request)
    items = cookie_checkout['items']

    customer, completed = Customer.objects.get_or_create(
        email=email
    )
    customer.first_name = first_name
    customer.last_name = last_name
    customer.save()

    order = Order.objects.create(
        owner=customer,
        completed=False
    )
    for item in items:
        product = Product.objects.get(id=item['product']['id'])
        orderitem = OrderItem.objects.create(
            product=product,
            order=order,
            quantity=item['quantity']

        )

    return customer,order