from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.store, name='store'),
    path('crate/', views.crate, name='crate'),
    path('checkout/', views.checkout, name='checkout'),
    path('update-item/', csrf_exempt(views.updateitem), name='updateitem'),
    path('process_order/', views.processOrder, name='update_items'),
    path('review/', views.review, name='review')
]
