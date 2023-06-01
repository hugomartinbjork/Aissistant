# Generated by Django 4.1.5 on 2023-06-01 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aisistant", "0016_tasktext"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="task",
            name="assigned",
        ),
        migrations.AddField(
            model_name="task",
            name="assigned",
            field=models.ManyToManyField(
                blank=True, related_name="users", to="aisistant.userextended"
            ),
        ),
    ]
