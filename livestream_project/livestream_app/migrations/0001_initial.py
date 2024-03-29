# Generated by Django 4.1.5 on 2024-02-02 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Overlay",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("content", models.CharField(max_length=255)),
                ("position_x", models.IntegerField()),
                ("position_y", models.IntegerField()),
                ("size", models.IntegerField()),
            ],
        ),
    ]
