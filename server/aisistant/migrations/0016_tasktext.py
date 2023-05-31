# Generated by Django 4.1.5 on 2023-05-31 09:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("aisistant", "0015_rename_id_task_task_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="TaskText",
            fields=[
                (
                    "task",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        serialize=False,
                        to="aisistant.task",
                    ),
                ),
                ("title", models.TextField(null=True)),
                ("content", models.TextField(null=True)),
            ],
        ),
    ]