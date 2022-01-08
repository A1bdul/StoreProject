import datetime
import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string

from .models import *

# Create your views here.
from .utils import cookieCart, cratedata, guestorder


def store(request):
    products = Product.objects.all()
    data = cratedata(request)
    context = {
        'products': products,
        'items': data['items'],
        'order': data['order'],
        'cartitems': data['cartitems'],
    }
    return render(request, 'store.html', context)


def crate(request):
    data = cratedata(request)
    context = {
        'items': data['items'],
        'order': data['order'],
        'cartitems': data['cartitems'],
    }
    return render(request, 'crate.html', context)


def updateitem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    customer = request.user.customer
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(owner=customer, completed=False)
    orderitem, created = OrderItem.objects.get_or_create(order=order, product=product)
    if action == "add":
        orderitem.quantity = (orderitem.quantity + 1)
        orderitem.save()
    elif action == 'remove':
        orderitem.quantity = (orderitem.quantity - 1)
        orderitem.save()
    elif action == 'delete':
        orderitem.delete()

    if orderitem.quantity <= 0:
        orderitem.delete()

    cartitems = order.get_cart_item

    context = {
        'cartitems': cartitems,
    }
    return JsonResponse('item was added', safe=False)


def checkout(request):
    data = cratedata(request)
    context = {
        'items': data['items'],
        'order': data['order'],
        'cartitems': data['cartitems'],
    }
    return render(request, 'checkout.html', context)


def processOrder(request):
    data = json.loads(request.body)
    transaction_id = datetime.datetime.now().timestamp()
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(owner=customer, completed=False)

    else:
        customer, order = guestorder(request, data=data)
    DeliveryAddress.objects.create(
        order=order,
        address=data['shippingInfo']['address'],
        city=data['shippingInfo']['city'],
        state=data['shippingInfo']['state'],
        zipcode=data['shippingInfo']['zipcode'],
    )

    total = float(data['user_info']['total'])
    order.transaction_id = transaction_id
    if total == order.get_cart_total:
        order.completed = True
    order.save()

    return JsonResponse('payment completed', safe=False)


@login_required
def review(request):
    if request.method == 'GET':
        product_id = request.GET.get('product_id')
        print(product_id)
