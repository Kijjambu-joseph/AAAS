from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import BankUser
from .serializers import BankUserSerializer


class EmployeeNumberTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Authenticate with either Django username or the bank employee number."""

    def validate(self, attrs):
        identifier = attrs.get(self.username_field, "")
        user = BankUser.objects.filter(employee_number__iexact=identifier).first()
        if user:
            attrs[self.username_field] = user.username

        data = super().validate(attrs)
        data["user"] = BankUserSerializer(self.user).data
        return data


class EmployeeNumberTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmployeeNumberTokenObtainPairSerializer
