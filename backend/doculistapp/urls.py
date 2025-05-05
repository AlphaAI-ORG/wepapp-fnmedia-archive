from django.urls import path
from doculistapp.views import document_list
from doculistapp.views import document_detail

urlpatterns = [
    path("list/", document_list, name="document_list"),
    path("<int:pk>/", document_detail, name="document_detail"),
]
