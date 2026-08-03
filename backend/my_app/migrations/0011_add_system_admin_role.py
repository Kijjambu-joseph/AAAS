from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_app', '0010_auctioneer_modal_fields'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bankuser',
            name='role',
            field=models.CharField(
                choices=[
                    ('LOAN_OFFICER', 'Loan Officer'),
                    ('CREDIT_OFFICER', 'Credit Officer'),
                    ('SYSTEM_ADMIN', 'System Admin'),
                    ('SUPER_ADMIN', 'Super Admin'),
                ],
                max_length=20,
            ),
        ),
    ]
