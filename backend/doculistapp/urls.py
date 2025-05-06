from django.urls import path
from doculistapp.views import document_list
from doculistapp.views import mock_document_detail

urlpatterns = [
    path("list/", document_list, name="document_list"),
    path("<int:pk>/", mock_document_detail, name="mock_document_detail"),
]
