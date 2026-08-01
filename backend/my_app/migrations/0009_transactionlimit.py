from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("my_app", "0008_update_bankuser_roles")]

    operations = [
        migrations.CreateModel(
            name="TransactionLimit",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("level", models.CharField(max_length=100, unique=True)),
                ("minimum", models.DecimalField(decimal_places=2, max_digits=15)),
                ("maximum", models.DecimalField(decimal_places=2, max_digits=15)),
                ("approval_required", models.BooleanField(default=False)),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["minimum", "level"]},
        )
    ]
