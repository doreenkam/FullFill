# Generated by Django 4.0.5 on 2022-06-07 09:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0009_alter_community_creator'),
    ]

    operations = [
        migrations.RenameField(
            model_name='communitypost',
            old_name='community_id',
            new_name='community',
        ),
        migrations.RenameField(
            model_name='communitypost',
            old_name='user_id',
            new_name='user',
        ),
    ]