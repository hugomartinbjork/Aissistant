# Generated by Django 4.1.5 on 2023-05-16 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aisistant", "0013_remove_task_stage"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="deadline",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]