from django.urls import path
from arc_app import views

urlpatterns = [
    path('api/userprofiles/', views.UserProfileListCreate.as_view()),
    path('api/userprofiles/<int:pk>/', views.UserProfileDetail.as_view()),
    path('api/users/', views.UserListCreate.as_view()),
    path('api/users/<int:pk>/', views.UserDetail.as_view()),
]