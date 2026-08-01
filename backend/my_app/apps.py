from django.apps import AppConfig


class MyAppConfig(AppConfig):
    name = 'my_app'
    
    def ready(self):
        """
        Register signal handlers when Django app is ready.
        This ensures auto-allocation signals are connected on startup.
        """
        import my_app.signals  # noqa: F401
