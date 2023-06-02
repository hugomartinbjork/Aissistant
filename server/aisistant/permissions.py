from rest_framework.permissions import BasePermission
from .models import WorkSpace, UserExtended, Task

class IsWorkspaceMember(BasePermission):
    message = 'You must be a member of the workspace to perform this action.'
    def has_permission(self, request, view):
        ws_id = view.kwargs.get('ws_id') 
        if ws_id is not None:
            user = UserExtended.objects.get(user=request.user)
            try: 
                return WorkSpace.objects.get(id=ws_id, users=user.user_id)
            except:
                return False
        else:
            task_id = view.kwargs.get('task_id') 
            if task_id is not None:
                user = UserExtended.objects.get(user=request.user)
                try: 
                    task = Task.objects.get(task_id=task_id)
                    return WorkSpace.objects.get(id=task.workspace.id, users=user.user_id)
                except:
                    return False
                

class UserIsAuth(BasePermission):
    message = 'You perform this action for your own entities'
    def has_permission(self, request, view):
        user_id = view.kwargs.get('user_id') 
        if (request.user.id == user_id):
            return True
        else:
            return False
            
   
                
