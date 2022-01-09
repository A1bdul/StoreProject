from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Customer(models.Model):
    user = models.OneToOneField(User, blank=True, null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField()

    def __str__(self):
        return self.first_name


class Product(models.Model):
    from pyuploadcare.dj.models import ImageGroupField
    image = ImageGroupField(blank=True, null=True, )
    name = models.CharField(max_length=200)
    price = models.FloatField()

    # label = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Order(models.Model):
    owner = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=200, null=True)

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        return total

    @property
    def get_cart_item(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total

    def __str__(self):
        return self.id

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)

    @property
    def get_total(self):
        return self.quantity * self.product.price


class DeliveryAddress(models.Model):
    owner = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True),
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    zipcode = models.CharField(max_length=10)
    datetime = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    ratings = models.IntegerField(default=0)
    ip = models.GenericIPAddressField(blank=True, null=True, auto_created=True)
    reviewed = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now=True)


class WishList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    wishes = models.ManyToManyField(Product)
