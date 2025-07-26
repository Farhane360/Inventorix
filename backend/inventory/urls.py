from django.urls import path
from .views import ProductListCreateView, ProductRetrieveUpdateDestroyView, CategoryListView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),
    path('products/', ProductListCreateView.as_view()),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyView.as_view()),
    path('categories/', CategoryListView.as_view()),
]
