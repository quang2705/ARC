from django.urls import path
from arc_app import views

urlpatterns = [
	path('api/', views.api_root),

    path('api/userprofiles/', 
    	views.UserProfileListCreate.as_view(),
    	name='userprofile-list'),
    path('api/users/', 
    	views.UserList.as_view(), 
    	name='user-list'),
    path('api/contracts/', 
    	views.ContractListCreate.as_view(), 
    	name='contract-list'),

    path('api/userprofiles/<int:pk>/', views.UserProfileDetail.as_view(),
    	name='userprofile-detail'),
    path('api/users/<int:pk>/', 
    	views.UserDetail.as_view(), 
    	name='user-detail'),
    path('api/contracts/<int:pk>/', 
    	views.ContractDetail.as_view(),
    	name='contract-detail'),

]