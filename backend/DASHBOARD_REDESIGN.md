# Centenary Bank Admin Dashboard - Jazmin Redesign

## Overview

The Django admin dashboard has been redesigned using **Jazzmin** (a modern admin dashboard UI for Django) to provide a professional, role-based administration interface for the Centenary Bank Allocation Management System.

## Key Features

### 1. **System Admin Role**
A new `SYSTEM_ADMIN` role has been added to the user role hierarchy:
- **LOAN_OFFICER**: Loan Officer (basic access)
- **CREDIT_OFFICER**: Credit Officer (mid-level access) 
- **SYSTEM_ADMIN**: System Administrator (⭐ NEW - high-level technical access)
- **SUPER_ADMIN**: Super Administrator (full access)

The System Admin role is clearly indicated with:
- 🔒 Red/danger badge with lock icon
- Special styling and highlighting in user lists
- Distinctive sidebar appearance

### 2. **Enhanced Admin Interface**

#### Dashboard Features:
- **Beautiful Dashboard**: Clean, modern interface with color-coded sections
- **Role-Based Appearance**: User's role is prominently displayed with visual badges
- **Organized Navigation**: Logical grouping of models into functional sections
- **Quick Stats**: Cards showing key metrics and system information
- **User-Friendly Design**: Intuitive navigation and controls

#### Organized Navigation Sections:
1. **System Management**
   - Bank Users (with role indicators)
   
2. **Bank Administration**
   - Branches
   
3. **Auctioneer Management**
   - Auctioneers (with workload indicators)
   
4. **Recovery Cases**
   - Recovery Cases
   - Allocations
   
5. **System Activity**
   - Notifications
   - Audit Logs (read-only)

### 3. **Visual Enhancements**

#### Color Scheme:
- **Primary**: Bank Blue (#1e40af)
- **Secondary**: Deep Blue (#0369a1)
- **Accent**: Gold (#f59e0b)
- **Dark**: Charcoal (#111827)

#### Styling Elements:
- **Badges**: Color-coded status indicators
  - 🔴 Red (danger/system admin)
  - ⚫ Dark (super admin)
  - 🔵 Blue (credit officer)
  - ⚪ Secondary (other roles)
  
- **Icons**: Font Awesome icons for quick identification
- **Progress Bars**: Visual workload indicators for auctioneers
- **Hover Effects**: Smooth transitions and feedback

### 4. **Improved List Views**

#### BankUser Admin:
- Full name display
- Role badge with icon
- Branch assignment
- Staff/Active status
- Searchable by username, employee number, email, or branch

#### Branch Admin:
- Quick employee count badge
- Region filtering
- District search
- Active status indicator

#### Auctioneer Admin:
- License expiry status (Active/Expired)
- Workload capacity visual bar
- Current vs maximum case load display
- Region-based filtering

#### RecoveryCase Admin:
- Priority badges (Low, Medium, High, Critical)
- Status badges with colors
- Outstanding balance display
- Case number and customer info
- Sortable by priority and status

#### Allocation Admin:
- Allocation method badge (Automatic/Manual)
- Status indicators
- Auctioneer and case information
- Chronological ordering

#### Notification Admin:
- Priority level indicators
- Read/Unread status
- Message type filtering
- User filtering

#### AuditLog Admin:
- Read-only (no editing/deletion)
- Complete action history
- User and IP tracking
- Timestamped records
- Filterable by action, model, and date

## Installation & Setup

### Step 1: Install Jazzmin

```bash
cd backend
pip install django-jazzmin==3.0.1
pip install -r requirements.txt
```

### Step 2: Run Migrations

```bash
python manage.py migrate
```

This will apply the migration that adds the SYSTEM_ADMIN role to the BankUser model.

### Step 3: Create System Admin User

```bash
python manage.py createsuperuser
```

When prompted, create a user and optionally set the role to "SYSTEM_ADMIN" through:
1. Django shell: `python manage.py shell`
2. Update the user manually in the admin interface

Or create via Django shell:

```python
python manage.py shell
from my_app.models import BankUser

user = BankUser.objects.create_superuser(
    username='admin',
    email='admin@centenarybank.com',
    password='secure_password',
    role='SYSTEM_ADMIN',
    employee_number='SYS001'
)
```

### Step 4: Access Admin Dashboard

Navigate to: `http://localhost:8000/admin/`

## Configuration

### Jazzmin Settings

The Jazzmin configuration is in `/backend/config/settings.py`:

```python
JAZZMIN_SETTINGS = {
    'site_title': 'Centenary Bank Admin',
    'site_header': 'Centenary Bank - Allocation Management System',
    ...
}
```

Key configurations:
- **Navigation**: Custom menu organization with icons
- **Theme Colors**: Primary, secondary, and accent colors
- **Icons**: Font Awesome icons for models and actions
- **UI Tweaks**: Sidebar behavior, navbar styling, body styling

### Custom Admin Site

A custom AdminSite class (`CentenaryBankAdminSite`) is used to:
- Display user role badges on the index page
- Customize site headers and branding
- Add role-based permission checking
- Provide consistent styling across all admin pages

## User Role Levels

| Role | Icon | Color | Permissions |
|------|------|-------|-------------|
| Loan Officer | 👤 | Secondary | Limited access |
| Credit Officer | 👔 | Blue | Mid-level access |
| **System Admin** ⭐ | 🔒 | Red/Danger | High-level technical access |
| Super Admin | 👑 | Dark | Full admin access |

## Sidebar Features

The sidebar maintains consistency across all admin pages:
- **Responsive Design**: Collapses on mobile devices
- **Dark Theme**: Professional dark sidebar with light text
- **Hover Effects**: Active state highlighting
- **Icon Integration**: Visual model identification
- **Organized Groups**: Models grouped by functionality

## Customization

### Adding New Admin Classes

To add custom admin styling to new models:

```python
@admin_site.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('field1', 'field2', 'get_status_badge')
    
    def get_status_badge(self, obj):
        return format_html(
            '<span class="badge badge-success">{}</span>',
            obj.status
        )
    
    get_status_badge.short_description = 'Status'
```

### Modifying Colors

Update the color scheme in:
1. `config/settings.py` - Jazzmin theme configuration
2. `static/css/admin_enhancements.css` - Custom CSS variables

### Adding Custom Templates

Create custom admin templates in:
`my_app/templates/admin/` 

And reference them in your admin classes using the `change_list_template` attribute.

## Troubleshooting

### Jazzmin Not Loading
- Ensure `'jazzmin'` is listed BEFORE `'django.contrib.admin'` in INSTALLED_APPS
- Run `python manage.py collectstatic` to collect static files
- Clear browser cache

### Custom CSS Not Applied
- Run `python manage.py collectstatic --clear --noinput`
- Ensure the CSS file path is correct in admin.py Media class

### Role Not Appearing
- Run migrations: `python manage.py migrate`
- Create/update user in Django shell with correct role
- Verify role value matches ROLE_CHOICES in models.py

## Best Practices

1. **Consistent Naming**: Use clear, descriptive names for models and fields
2. **Icon Selection**: Choose appropriate Font Awesome icons for models
3. **Permission Control**: Always check user permissions before displaying sensitive data
4. **Readonly Fields**: Mark audit-related fields as readonly
5. **Search Fields**: Add searchable fields to improve usability
6. **List Filters**: Provide relevant filters for data refinement

## Files Modified/Created

### Modified:
- `backend/config/settings.py` - Added Jazzmin to INSTALLED_APPS and configurations
- `backend/config/urls.py` - Updated to use custom admin site
- `backend/my_app/models.py` - Added SYSTEM_ADMIN role to BankUser
- `backend/my_app/admin.py` - Complete redesign with enhanced styling and role indicators

### Created:
- `backend/my_app/migrations/0011_add_system_admin_role.py` - Migration for new role
- `backend/static/css/admin_enhancements.css` - Custom CSS styling
- `DASHBOARD_REDESIGN.md` - This documentation

## Support & Documentation

- Jazzmin Docs: https://django-jazzmin.readthedocs.io/
- Django Admin Customization: https://docs.djangoproject.com/en/stable/ref/contrib/admin/
- Font Awesome Icons: https://fontawesome.com/icons

---

**Last Updated**: August 2026
**Version**: 1.0
**Status**: Production Ready ✅
