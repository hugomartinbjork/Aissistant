from django.urls import path
from . import views, ws_views, task_views, stage_views

urlpatterns = [
    # path("", views.default, name="default"),
    path("login", views.Login.as_view()),
    # User
    path("users", views.Users.as_view()),
    path("users/<int:ws_id>", views.user_detail_by_ws),
    path("singleuser/<int:user_id>", views.single_user),
    # Create workspace
    path("workspaces/<int:user_id>", ws_views.WorkSpaceView.as_view()),
    path("workspaces/<int:ws_id>/<int:user_id>", ws_views.ws_leave),
    path("workspace/<int:ws_id>", ws_views.ws_detail),
    ## TASk
    # Create workspace
    path("tasks/<int:ws_id>", task_views.TaskView.as_view()),
    path("task/<int:task_id>", task_views.task_detail),
    path("tasks", task_views.get_all_tasks),
    ## Headings
    path("heading/<int:ws_id>/<int:order>", stage_views.heading_detail),
    path("headings/<int:ws_id>", stage_views.HeadingView.as_view()),
    ## TaskTexts
    path("tasktext/<int:task_id>", task_views.task_text),
    ## Assign user to task
    path("assign/<int:task_id>/<int:user_id>", task_views.assign_user),
    path("clearassigned/<int:task_id>", task_views.clear_assigned_user),
]
