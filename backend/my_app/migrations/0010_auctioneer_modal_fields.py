from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("my_app", "0009_transactionlimit")]

    operations = [
        migrations.AddField(model_name="auctioneer", name="ura_registration", field=models.CharField(blank=True, max_length=50)),
        migrations.AddField(model_name="auctioneer", name="regions", field=models.JSONField(blank=True, default=list)),
        migrations.AlterField(model_name="auctioneer", name="office_address", field=models.TextField(blank=True)),
        migrations.AddField(model_name="auctioneer", name="maximum_caseload", field=models.PositiveIntegerField(default=15)),
        migrations.AddField(model_name="auctioneer", name="license_document", field=models.FileField(blank=True, null=True, upload_to="auctioneer_licenses/")),
    ]
