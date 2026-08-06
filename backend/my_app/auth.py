from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import BankUser
from .serializers import BankUserSerializer


class EmployeeNumberTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Authenticate with username, employee number, or email."""

    def validate(self, attrs):
        identifier = attrs.get(self.username_field, "") or attrs.get("employee_number", "")
        identifier = identifier.strip() if isinstance(identifier, str) else ""

        user = None
        if identifier:
            user = BankUser.objects.filter(username__iexact=identifier).first()
            if not user:
                user = BankUser.objects.filter(employee_number__iexact=identifier).first()
            if not user:
                user = BankUser.objects.filter(email__iexact=identifier).first()

        if user:
            attrs[self.username_field] = user.username

        data = super().validate(attrs)
        data["user"] = BankUserSerializer(self.user).data
        return data


class EmployeeNumberTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmployeeNumberTokenObtainPairSerializer
