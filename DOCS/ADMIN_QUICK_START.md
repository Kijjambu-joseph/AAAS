# Quick Start Guide - Centenary Bank Admin Dashboard

## 🚀 Getting Started

### Start the Development Server
```bash
cd /home/joseph/Desktop/AAAS/backend
source venv/bin/activate
python3 manage.py runserver
```

### Access the Admin Dashboard
Navigate to: **http://localhost:8000/admin/**

### Login Credentials
Use your superuser account (created during project setup)

---

## 👥 User Roles Overview

| Role | Icon | Badge | Color | Purpose |
|------|------|-------|-------|---------|
| **System Admin** ⭐ | 🔒 | Lock | Red | Technical administration |
| **Super Admin** | 👑 | Crown | Dark | Full administrative access |
| **Credit Officer** | 👔 | Tie | Blue | Mid-level management |
| **Loan Officer** | 👤 | User | Gray | Basic operations |

---

## 📋 Main Admin Sections

### 1. System Management
- **Bank Users** - Manage all users with role assignment
- View: Username, Employee ID, Full Name, Role Badge, Branch, Status
- Filter by: Role, Department, Active Status
- Search by: Name, Employee Number, Email, Branch

### 2. Bank Administration  
- **Branches** - Manage bank branch locations
- View: Branch Code, Name, Region, District, Employee Count Badge
- Filter by: Region, Active Status
- Overview of branch hierarchy

### 3. Auctioneer Management
- **Auctioneers** - Manage approved auctioneer companies
- View: Company Name, Contact, Region, License Status Badge, Workload Capacity Bar
- Filter by: Region, Active Status, License Expiry
- Visual workload indicator (Green < 50%, Yellow 50-80%, Red > 80%)

### 4. Recovery Cases
- **Recovery Cases** - Track loan recovery operations
- View: Case Number, Customer, Branch, Priority Badge, Status Badge, Outstanding Balance
- Filter by: Priority, Status, Branch, Recovery Stage
- Color-coded priority: Low (Green), Medium (Yellow), High (Red), Critical (Dark)

### 5. Allocations
- **Allocations** - Assign cases to auctioneers
- View: Case, Auctioneer, Allocated By, Method Badge (Automatic/Manual), Status
- Filter by: Method, Status, Auctioneer, Date
- Track allocation history and decisions

### 6. System Activity
- **Notifications** - System notifications to users
- View: Title, Recipient, Type, Priority, Read Status
- Filter by: Type, Priority, Read Status, Date

- **Audit Log** (Read-Only) - Complete system change history
- View: Timestamp, User, Action, Model, Object, IP Address
- Filter by: Action, Model Type, User, Date
- Fully searchable audit trail

---

## 🎯 Key Features

### ✨ Visual Indicators
- **Role Badges**: Instantly see user roles with color-coded badges
- **Priority Colors**: Priority levels color-coded (Green → Yellow → Red)
- **Status Badges**: Status clearly shown with visual badges
- **Progress Bars**: Workload capacity visualized with progress bars
- **Icons**: Font Awesome icons for quick model identification

### 🔍 Search & Filter
- **Quick Search**: Search across multiple fields
- **Advanced Filters**: Filter by multiple criteria simultaneously
- **Sortable Columns**: Click column headers to sort
- **Saved Filters**: Recently used filters readily available

### 📊 Data Organization
- **Fieldsets**: Information organized into logical groups
- **Collapsible Sections**: Timestamps and audit info collapse to save space
- **Readonly Fields**: Audit trails protected from modification
- **Clear Labels**: Descriptive labels for all fields

### 🎨 Professional Design
- **Consistent Styling**: Cohesive look across all models
- **Dark Sidebar**: Professional dark sidebar navigation
- **Responsive Layout**: Works on desktop, tablet, mobile
- **Smooth Transitions**: Hover effects and animations
- **Centenary Bank Colors**: Official bank color scheme

---

## ⚡ Common Tasks

### Add New User
1. Click **Users** in System Management
2. Click **Add User** button (top right)
3. Enter username, password, email
4. Scroll down to **Bank Information** section
5. Enter: Employee Number, Phone, Role (select SYSTEM_ADMIN for system admin), Branch
6. Upload Profile Picture (optional)
7. Click **Save**

### Create Recovery Case
1. Click **Recovery Cases** in Recovery Cases section
2. Click **Add Recovery Case** button
3. Fill in: Case Number, Customer Details, Loan Information, Collateral Details
4. Select: Branch, Priority, Status
5. Click **Save**

### Assign Auctioneer
1. Click **Allocations** in Recovery Cases section
2. Click **Add Allocation** button
3. Select: Recovery Case, Auctioneer, Allocation Method
4. Click **Save**
5. System tracks who allocated it and when

### View System Activity
1. Click **Audit Logs** in System Activity section
2. View all changes: User → Action → Model → When
3. Filter by action type, model, or user
4. Search by description or IP address
5. No editing allowed - complete audit trail

---

## 🔐 System Admin Role Features

### Why System Admin Role?
- **Technical Focus**: For IT administrators managing system access
- **Clear Visibility**: Distinctive red badge with lock icon 🔒
- **Consistent Appearance**: Sidebar looks the same as Super Admin
- **Easy Identification**: Quickly spot system admins in user lists
- **Non-Intrusive**: Doesn't interfere with existing role hierarchy

### System Admin vs Super Admin
- **System Admin**: Technical administration, system configuration
- **Super Admin**: Business administration, full access to all features

---

## 📱 Sidebar Navigation

### Dark Theme
- Professional dark sidebar with light text
- Organized sections by function
- Expandable/collapsible menu items
- Active page highlighted
- Smooth hover transitions

### Section Categories
- 🔐 System Management (Users)
- 🏦 Bank Administration (Branches)
- ⚖️ Auctioneer Management (Auctioneers)
- 📋 Recovery Cases (Cases, Allocations)
- 📊 System Activity (Notifications, Audit Logs)

---

## ⚙️ Tips & Tricks

### Efficiency Tips
1. **Use Search**: Type names to quickly find records
2. **Apply Filters**: Narrow down results before searching
3. **Mass Export**: Select multiple rows for bulk operations
4. **Keyboard Navigation**: Tab through form fields quickly
5. **Responsive Design**: Use on mobile for field work

### Customization
1. **Column Visibility**: Show/hide columns as needed
2. **Sort Order**: Click headers to change sorting
3. **Items per Page**: Adjust list display count
4. **Filter Combinations**: Combine multiple filters for precision
5. **Save Filters**: Frequently used filter combinations

### Data Integrity
1. **Readonly Fields**: Timestamps and audit info can't be edited
2. **Audit Trail**: Every change is logged and timestamped
3. **Relationship Protection**: Related records protected from deletion
4. **Validation**: Form validation prevents invalid data entry
5. **Undo**: Check audit logs to see all historical changes

---

## 🆘 Troubleshooting

### Dashboard Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Check server is running: `python3 manage.py runserver`

### Styling Not Showing
- Run: `python3 manage.py collectstatic --clear --noinput`
- Refresh page: `Ctrl+F5` (hard refresh)
- Check staticfiles folder exists

### Can't Edit a Field
- Check if field is marked as Readonly
- Check user permissions for that model
- Verify no active locks on record

### Missing System Admin Badge
- User role in BankUser must be set to "SYSTEM_ADMIN"
- Run migrations: `python3 manage.py migrate`
- Reload page to see changes

### Role Not in Dropdown
- Check ROLE_CHOICES in models.py
- Run migrations: `python3 manage.py migrate`
- Ensure 'SYSTEM_ADMIN' is in the list

---

## 📞 Support Resources

- **Admin Documentation**: See DASHBOARD_REDESIGN.md in backend folder
- **Setup Summary**: See JAZMIN_REDESIGN_SUMMARY.md in root folder
- **Django Docs**: https://docs.djangoproject.com/en/stable/ref/contrib/admin/
- **Jazzmin Docs**: https://django-jazzmin.readthedocs.io/
- **Font Awesome**: https://fontawesome.com/icons

---

**Last Updated**: August 4, 2026
**Version**: 1.0
**Status**: Ready to Use ✅
