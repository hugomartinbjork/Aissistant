# Generated by Django 4.1.1 on 2023-05-15 14:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('aisistant', '0003_userextended_delete_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userextended',
            name='documents',
        ),
        migrations.AddField(
            model_name='userextended',
            name='daily_count',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('todo', models.TextField()),
                ('stage', models.IntegerField(default=1)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='aisistant.userextended')),
            ],
        ),
        migrations.AddField(
            model_name='userextended',
            name='tasks',
            field=models.ManyToManyField(to='aisistant.task'),
        ),
    ]