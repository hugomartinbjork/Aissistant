from django.urls import path
from . import views, ws_views, task_views

urlpatterns = [
    # path("", views.default, name="default"),
    path("login", views.Login.as_view()),
    # User
    path("users", views.Users.as_view()),
    ## Reset users daily counts
    path("reset", views.Command),
    # Create workspace
    path("workspaces/<int:user_id>", ws_views.WorkSpaceView.as_view()),
    path("workspace/<int:ws_id>", ws_views.ws_detail),
    ## TASk
    # Create workspace
    path("tasks/<int:ws_id>", task_views.TaskView.as_view()),
    path("task/<int:task_id>", task_views.task_detail),
    path("tasks", task_views.get_all_tasks),
]
