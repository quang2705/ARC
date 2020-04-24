from rest_framework import permissions

#This permission checks if the user is tutor or admin
# if the user is tutor: gives them all access
# if the user is admin: gives them readonly access: GIVE, OPTIONS and HEAD
class IsTutorOrIsAdminReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.userprofiles.is_tutor:
            return True
        elif request.user.userprofiles.is_admin or request.user.userprofiles.is_headtutor:
            if request.method in permissions.SAFE_METHODS:
                return True
            else:
                return False
        else:
            return False
