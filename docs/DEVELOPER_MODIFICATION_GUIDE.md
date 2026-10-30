# IDEAL ENGLISH SCHOOL ERP 5.0 (ENTERPRISE PRO)
## Developer Modification & Modular Customization Guide

Welcome to the modular codebase of **IES School ERP 5.0**. This package is structured so that you can easily modify any screen, module, fee rate, curriculum subject, report layout, or theme style independently.

---

### 1. Directory Structure Overview

`
IES_School_ERP_Modular_Package/
â”‚
â”œâ”€â”€ index.html                           <-- Ready-to-run 100% offline standalone application
â”œâ”€â”€ IES_School_ERP_v5_Pro.html            <-- Master standalone single-file ERP
â”œâ”€â”€ modular_development.html             <-- Modular development entry point (loads separate files)
â”‚
â”œâ”€â”€ css/                                 <-- STYLING & THEMES
â”‚   â”œâ”€â”€ 01_theme_system.css              <-- Day & Night mode color tokens, dark/light variables
â”‚   â”œâ”€â”€ 02_core_layout.css               <-- Responsive app container, sidebar, topbar, mobile drawer
â”‚   â”œâ”€â”€ 03_components.css                <-- Cards, tables, forms, buttons, badges, stat chips, modals
â”‚   â””â”€â”€ 04_print_documents.css           <-- Official print styles (Admit Cards, Marksheets, Payslips, IDs)
â”‚
â”œâ”€â”€ js/                                  <-- JAVASCRIPT SYSTEM
â”‚   â”œâ”€â”€ core/
â”‚   â”‚   â”œâ”€â”€ config_and_state.js          <-- Academic year, class roster, student/staff records, local storage
â”‚   â”‚   â”œâ”€â”€ theme_controller.js          <-- Day/Night/System theme switcher and OS listener
â”‚   â”‚   â””â”€â”€ rbac_navigation.js           <-- Role permissions (Admin, Principal, Accounts, Teacher, Student)
â”‚   â”‚
â”‚   â”œâ”€â”€ modules/                         <-- EVERY SECTION INDIVIDUALLY SEPARATED
â”‚   â”‚   â”œâ”€â”€ 01_overview_dashboard.js     <-- Admin/Principal executive metrics & KPI charts
â”‚   â”‚   â”œâ”€â”€ 02_student_directory.js      <-- Student roll, 360Â° profile, admit card & marksheet actions
â”‚   â”‚   â”œâ”€â”€ 03_admissions_intake.js      <-- Fresh admissions, document desk & RTE Act quota tracking
â”‚   â”‚   â”œâ”€â”€ 04_classes_and_sections.js   <-- Class creation, section capacities, class teacher mapping
â”‚   â”‚   â”œâ”€â”€ 05_subjects_curriculum.js    <-- Subject catalogue, syllabus tracking, teacher assignment
â”‚   â”‚   â”œâ”€â”€ 06_teacher_management.js     <-- Faculty directory, workload heatmaps & qualifications
â”‚   â”‚   â”œâ”€â”€ 07_timetable_scheduler.js    <-- Weekly timetable grid & live teacher conflict detector
â”‚   â”‚   â”œâ”€â”€ 08_student_attendance.js     <-- Daily roll-call register & attendance percentage tracker
â”‚   â”‚   â”œâ”€â”€ 09_staff_attendance.js       <-- Biometric/manual staff register & leave management
â”‚   â”‚   â”œâ”€â”€ 10_examinations_results.js   <-- 4-Evaluation Continuous Evaluation & controlled marks reopening
â”‚   â”‚   â”œâ”€â”€ 11_fees_and_payments.js      <-- Cashier counter, 3-copy receipts, concessions & RTE subsidies
â”‚   â”‚   â”œâ”€â”€ 12_accounts_and_expenses.js  <-- Daily daybook, voucher register & cash in hand balance
â”‚   â”‚   â”œâ”€â”€ 13_payroll_bank_annexure.js  <-- Staff salary computation & SBI Bank Salary Annexure
â”‚   â”‚   â”œâ”€â”€ 14_homework_assignments.js   <-- Assignment creation, submission tracking & grading
â”‚   â”‚   â”œâ”€â”€ 15_iep_inclusion.js          <-- Individualized Education Program for diverse learners
â”‚   â”‚   â”œâ”€â”€ 16_notices_communication.js  <-- Circular broadcasts, holiday alerts, parent communications
â”‚   â”‚   â”œâ”€â”€ 17_parent_portal_admin.js    <-- Parent portal preferences & feedback management
â”‚   â”‚   â”œâ”€â”€ 18_reports_and_analytics.js  <-- Financial, attendance & academic CSV/PDF exports
â”‚   â”‚   â”œâ”€â”€ 19_print_centre.js           <-- Official document issuance hub (Hall tickets, Marksheets, IDs)
â”‚   â”‚   â”œâ”€â”€ 20_audit_trail.js            <-- Immutable action logging & audit history
â”‚   â”‚   â””â”€â”€ 21_settings_and_backup.js    <-- School info, session rollover, JSON backup & restore
â”‚   â”‚
â”‚   â””â”€â”€ workspaces/                      <-- DEDICATED TEACHER & STUDENT HUBS (NO DASHBOARD!)
â”‚       â”œâ”€â”€ teacher_workspace.js         <-- Teacher Home, daily timetable, roll call & leave desk
â”‚       â””â”€â”€ student_learning.js          <-- Student Home, class schedule, homework queue, results & receipts
â”‚
â”œâ”€â”€ templates/                           <-- DOCUMENT TEMPLATES (Easy to customize layouts)
â”‚   â”œâ”€â”€ exam_admit_card_template.html    <-- Official Hall Ticket layout with principal signature
â”‚   â”œâ”€â”€ marksheet_cce_template.html      <-- 4-Evaluation Marksheet progress card
â”‚   â”œâ”€â”€ pvc_id_card_template.html        <-- PVC Student & Employee identity cards
â”‚   â”œâ”€â”€ fee_receipt_voucher.html         <-- 3-Copy Fee Voucher (Student, School, Bank)
â”‚   â”œâ”€â”€ sbi_bank_annexure_template.html  <-- SBI Bank Salary Annexure document
â”‚   â””â”€â”€ transfer_certificate.html        <-- Official Transfer Certificate & withdrawal form
â”‚
â””â”€â”€ build_bundle.ps1                     <-- ONE-CLICK COMPILER: Bundles all modular files into index.html
`

---

### 2. How to Modify Common Sections

#### A. How to Modify Day Mode / Night Mode Colors
1. Open css/01_theme_system.css.
2. To modify **Day Mode**, edit values under ody.theme-light.
3. To modify **Night Mode**, edit values under :root.
4. Changes will immediately take effect when running modular_development.html!

#### B. How to Modify the Fee Schedule
1. Open js/modules/11_fees_and_payments.js or js/core/config_and_state.js.
2. Look for IES_DETAILED_FEE_SCHEDULE.
3. Modify tuition amounts, admission fee, examination fees, or development charges.

#### C. How to Modify Teacher Workspace (No Dashboard)
1. Open js/workspaces/teacher_workspace.js.
2. You can add or reorder periods, leave balance widgets, and active homework tables.

#### D. How to Modify Student & Parent Learning Desk (No Dashboard)
1. Open js/workspaces/student_learning.js.
2. You can customize the 4-Evaluation summary meters, class timetable cards, or fee receipt links.

#### E. How to Modify Printable Document Layouts
1. Go to the 	emplates/ folder.
2. Edit exam_admit_card_template.html, marksheet_cce_template.html, or ee_receipt_voucher.html.

---

### 3. One-Click Compiler (uild_bundle.ps1)
Whenever you make changes to the modular files, you can recompile everything into the standalone index.html file by right-clicking uild_bundle.ps1 and selecting **Run with PowerShell**!