from django.db import migrations, models


def migrate_credit_admin_role(apps, schema_editor):
    BankUser = apps.get_model("my_app", "BankUser")
    BankUser.objects.filter(role="CREDIT_ADMIN").update(role="CREDIT_OFFICER")


class Migration(migrations.Migration):
    dependencies = [("my_app", "0007_auditlog")]

    operations = [
        migrations.RunPython(migrate_credit_admin_role, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="bankuser",
            name="role",
            field=models.CharField(
                choices=[
                    ("LOAN_OFFICER", "Loan Officer"),
                    ("CREDIT_OFFICER", "Credit Officer"),
                    ("SUPER_ADMIN", "Super Admin"),
                ],
                max_length=20,
            ),
        ),
    ]
