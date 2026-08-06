from django.db import migrations


def migrate_legacy_roles(apps, schema_editor):
    BankUser = apps.get_model("my_app", "BankUser")
    BankUser.objects.filter(role="LOAN_OFFICER").update(role="LOAN_OFFICER_BRANCH")
    BankUser.objects.filter(role="CREDIT_OFFICER").update(role="CREDIT_OFFICER_H/O")
    BankUser.objects.filter(role="CREDIT_ADMIN").update(role="CREDIT_OFFICER_H/O")


class Migration(migrations.Migration):

    dependencies = [
        ("my_app", "0012_alter_bankuser_role"),
    ]

    operations = [
        migrations.RunPython(migrate_legacy_roles, migrations.RunPython.noop),
    ]
