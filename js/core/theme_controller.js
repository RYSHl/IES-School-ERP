// ==========================================================================
// IES SCHOOL ERP 5.0 - MODERN THEME ENGINE & WORKSPACE CONTROLLER
// Complete Day/Night Theme System, Role Navigation & Teacher/Student Workspaces
// ==========================================================================

// 1. THEME MANAGEMENT SYSTEM (Day / Night / System Mode)
let currentThemeMode = localStorage.getItem("ies_theme_mode") || "system";

function initThemeSystem() {
  applyThemeMode(currentThemeMode, false);

  // Listen to OS theme changes if on system mode
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (currentThemeMode === 'system') {
        applyThemeMode('system', false);
      }
    });
  }
}

function setThemeMode(mode) {
  currentThemeMode = mode;
  localStorage.setItem("ies_theme_mode", mode);
  applyThemeMode(mode, true);
}

function applyThemeMode(mode, showFeedback) {
  let effectiveTheme = mode;
  if (mode === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      effectiveTheme = 'dark';
    } else {
      effectiveTheme = 'light';
    }
  }

  document.documentElement.setAttribute('data-theme', effectiveTheme);
  document.body.classList.toggle('theme-dark', effectiveTheme === 'dark');
  document.body.classList.toggle('theme-light', effectiveTheme === 'light');

  // Update Topbar Theme Switcher Buttons
  const btnLight = document.getElementById('themeBtnLight');
  const btnDark = document.getElementById('themeBtnDark');
  const btnAuto = document.getElementById('themeBtnAuto');

  if (btnLight) btnLight.classList.toggle('active', mode === 'light');
  if (btnDark) btnDark.classList.toggle('active', mode === 'dark');
  if (btnAuto) btnAuto.classList.toggle('active', mode === 'system');

  if (showFeedback && typeof showToast === 'function') {
    const labelMap = { light: 'Day Mode (Light)', dark: 'Night Mode (Dark)', system: 'System Adaptive Theme' };
    showToast(`Switched theme to ${labelMap[mode] || mode}`, 'info');
  }
}

// 2. UNIFIED ROLE-BASED NAVIGATION DEFINITIONS (21 Modules + Workspaces)
const ADMIN_MODULES = [
  { section: "Core Administration", items: [
    { id: "dash", label: "Overview & Metrics", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`, badge: "Live" },
    { id: "stu", label: "Student Management", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`, badge: "Directory" },
    { id: "adm", label: "Admissions & Intake", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>`, badge: "Intake" },
    { id: "cls", label: "Classes & Sections", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>` },
    { id: "sub", label: "Subjects & Curriculum", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>` },
    { id: "stf", label: "Teacher Management", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`, badge: "Faculty" },
    { id: "tt", label: "Timetable & Schedule", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>` },
    { id: "att", label: "Student Attendance", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`, badge: "Daily" },
    { id: "stf_att", label: "Staff Attendance", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>` }
  ]},
  { section: "Academic & Evaluation", items: [
    { id: "acad", label: "Academic Flow Hub", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`, badge: "Flow" },
    { id: "exm", label: "Examinations & Results", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`, badge: "4-Eval" },
    { id: "hw", label: "Homework & Assignments", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>` },
    { id: "iep", label: "IEP Management", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`, badge: "Inclusion" }
  ]},
  { section: "Finance & Accounts", items: [
    { id: "fee", label: "Fees & Payments", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`, badge: "Counter" },
    { id: "exp", label: "Accounts & Expenses", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>` },
    { id: "pay", label: "Staff Payroll", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`, badge: "Bank" }
  ]},
  { section: "Communication & System", items: [
    { id: "not", label: "Notices & Communication", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>` },
    { id: "por", label: "Parent Portal Admin", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>` },
    { id: "rep", label: "Reports & Analytics", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>`, badge: "Export" },
    { id: "prc", label: "Print Centre", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>` },
    { id: "aud", label: "Audit Trail", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>` },
    { id: "set", label: "Settings & Backup", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>` }
  ]}
];

// TEACHER NAVIGATION (NO DASHBOARD!)
const TEACHER_NAV_SECTIONS = [
  { section: "Teacher Workspace", items: [
    { id: "thome", label: "Teacher Home & Desk", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`, badge: "Workspace" },
    { id: "tprof", label: "My Profile & Details", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>` },
    { id: "cls", label: "My Assigned Classes", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`, badge: "Class I" },
    { id: "sub", label: "My Subjects", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>` },
    { id: "tt", label: "My Weekly Timetable", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>` }
  ]},
  { section: "Daily Classroom Duties", items: [
    { id: "att", label: "Student Attendance", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`, badge: "Mark" },
    { id: "tatt", label: "My Attendance & Leaves", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>` },
    { id: "hw", label: "Homework & Assignments", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`, badge: "Evaluate" },
    { id: "exm", label: "Examination Marks Entry", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`, badge: "Marks" },
    { id: "not", label: "Notices & Circulars", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>` }
  ]}
];

// STUDENT / PARENT NAVIGATION (NO DASHBOARD!)
const STUDENT_NAV_SECTIONS = [
  { section: "Student Learning Hub", items: [
    { id: "shome", label: "Student Home & Learning", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`, badge: "My Desk" },
    { id: "sprof", label: "My Profile Dossier", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>` },
    { id: "tt", label: "Class Timetable", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>` },
    { id: "satt", label: "My Attendance Record", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`, badge: "96%" }
  ]},
  { section: "Academic & Records", items: [
    { id: "hw", label: "My Homework & Tasks", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>` },
    { id: "exm", label: "Exam Results & Marks", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`, badge: "CCE" },
    { id: "sfee", label: "Fee Details & Receipts", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>` },
    { id: "sprn", label: "Admit Card & ID Card", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`, badge: "PDF" },
    { id: "not", label: "School Notices", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>` }
  ]}
];

// Dynamic Sidebar Renderer
function renderRoleSidebar(role) {
  const navContainer = document.querySelector(".sidebar-nav");
  if (!navContainer) return;

  let sections = ADMIN_MODULES;
  if (role === "Teacher") {
    sections = TEACHER_NAV_SECTIONS;
  } else if (role === "Parent" || role === "Student") {
    sections = STUDENT_NAV_SECTIONS;
  } else if (role === "Accounts") {
    // Accounts specific filter
    sections = [
      { section: "Accounts Counter", items: [
        { id: "fee", label: "Fee Collection Counter", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`, badge: "Cashier" },
        { id: "stu", label: "Student Fee Dues", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>` },
        { id: "exp", label: "Expense Vouchers", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>` },
        { id: "pay", label: "Payroll & Salary Annexure", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`, badge: "SBI" }
      ]},
      { section: "Reports & Documents", items: [
        { id: "rep", label: "Financial Reports", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>` },
        { id: "prc", label: "Print Centre", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>` },
        { id: "not", label: "Notices", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>` }
      ]}
    ];
  }

  let html = "";
  sections.forEach(sec => {
    html += `<div class="nav-section-title">${sec.section}</div>`;
    sec.items.forEach(it => {
      const isActive = it.id === currentView;
      html += `
        <button class="nav-item ${isActive ? 'active' : ''}" data-view="${it.id}" onclick="navigateTo('${it.id}')">
          <span class="nav-icon">${it.icon}</span>
          <span>${it.label}</span>
          ${it.badge ? `<span class="nav-badge">${it.badge}</span>` : ''}
        </button>
      `;
    });
  });

  navContainer.innerHTML = html;
}

// 3. TEACHER HOME / MY WORKSPACE (NO DASHBOARD!)
function renderTeacherWorkspace() {
  const teacher = S.stf.find(s => s.role && s.role.toLowerCase().includes("teacher")) || S.stf[1] || { name: "Anima Dey", role: "Class Teacher (Class I-A)", subject: "English & Mathematics" };
  const assignedClass = "1";
  const myStudents = S.stu.filter(s => s.cls === assignedClass);
  const myHomeworks = S.hw ? S.hw.filter(h => h.cls === assignedClass) : [];
  const t = today();
  const myAttKey = t + "|" + assignedClass;
  const isAttTaken = S.att && S.att[myAttKey] && Object.keys(S.att[myAttKey]).length > 0;

  // Breadcrumbs
  updateBreadcrumbs([
    { label: "Home", view: "thome" },
    { label: "Teacher Workspace" }
  ]);

  $("#headerBanner").innerHTML = `
    <div class="banner-top">
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <span class="badge badge-warning" style="font-size:12px; font-weight:700;">FACULTY PORTAL</span>
          <span style="color:var(--text-muted); font-size:12px;">Session ${AY} &middot; Dholai Bazaar</span>
        </div>
        <h1 class="banner-title">Welcome, ${esc(teacher.name)}</h1>
        <p class="banner-sub">${esc(teacher.role)} &middot; Primary Subject: <b>${esc(teacher.subject || 'All Subjects')}</b> &middot; Class Register: <b>Class ${rom(assignedClass)}-A (${myStudents.length} Students)</b></p>
      </div>
      <div class="banner-actions">
        <button class="btn btn-primary btn-sm" onclick="navigateTo('att')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          ${isAttTaken ? 'Review Class I Attendance' : 'Take Daily Attendance'}
        </button>
        <button class="btn btn-warning btn-sm" onclick="openCreateAssignmentModal()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Assignment
        </button>
      </div>
    </div>
  `;

  // Teacher Stat Chips
  $("#statCards").innerHTML = `
    <div class="stat-card" style="border-top:3px solid #3b82f6;">
      <div class="stat-content">
        <div class="stat-title">My Assigned Students</div>
        <div class="stat-value">${myStudents.length}</div>
        <div class="stat-desc">Class ${rom(assignedClass)}-A Enrolled Roll</div>
      </div>
      <div class="stat-icon" style="background:rgba(59,130,246,0.15); color:#3b82f6;">&#128104;&#8205;&#127979;</div>
    </div>

    <div class="stat-card" style="border-top:3px solid #10b981;">
      <div class="stat-content">
        <div class="stat-title">Today's Class Attendance</div>
        <div class="stat-value" style="color:#10b981;">${isAttTaken ? 'Submitted' : 'Pending'}</div>
        <div class="stat-desc">${isAttTaken ? 'Class Register Recorded' : 'Needs Roll Call Today'}</div>
      </div>
      <div class="stat-icon" style="background:rgba(16,185,129,0.15); color:#10b981;">&#10003;</div>
    </div>

    <div class="stat-card" style="border-top:3px solid #f59e0b;">
      <div class="stat-content">
        <div class="stat-title">Active Homework</div>
        <div class="stat-value">${myHomeworks.length}</div>
        <div class="stat-desc">Assignments Published</div>
      </div>
      <div class="stat-icon" style="background:rgba(245,158,11,0.15); color:#f59e0b;">&#128221;</div>
    </div>

    <div class="stat-card" style="border-top:3px solid #8b5cf6;">
      <div class="stat-content">
        <div class="stat-title">My Staff Attendance</div>
        <div class="stat-value" style="color:#8b5cf6;">98.4%</div>
        <div class="stat-desc">Present 24 of 25 Working Days</div>
      </div>
      <div class="stat-icon" style="background:rgba(139,92,246,0.15); color:#8b5cf6;">&#128197;</div>
    </div>
  `;

  // Main Workspace Panels
  $("#pageContent").innerHTML = `
    <div style="display:grid; grid-template-columns: 2fr 1fr; gap:20px;">
      <!-- Left Column: Timetable & Assignments -->
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Card 1: Today's Teaching Periods Schedule -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div class="card-title">&#128197; Today's Teaching Schedule &middot; Monday</div>
              <small style="color:var(--text-muted);">Assigned periods and classroom allocations for today</small>
            </div>
            <button class="btn btn-outline btn-sm" onclick="navigateTo('tt')">Full Timetable</button>
          </div>
          <div class="card-body" style="padding:0;">
            <div class="table-responsive">
              <table class="argon-table">
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Time</th>
                    <th>Class & Sec</th>
                    <th>Subject</th>
                    <th>Room</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Period 1</b></td>
                    <td>09:00 - 09:45 AM</td>
                    <td><span class="badge badge-info">Class I-A</span></td>
                    <td><b>English Grammar</b></td>
                    <td>Room 101</td>
                    <td><span class="badge badge-success">&#10003; Completed</span></td>
                  </tr>
                  <tr>
                    <td><b>Period 2</b></td>
                    <td>09:45 - 10:30 AM</td>
                    <td><span class="badge badge-info">Class I-A</span></td>
                    <td><b>Mathematics</b></td>
                    <td>Room 101</td>
                    <td><span class="badge badge-primary">Active Now</span></td>
                  </tr>
                  <tr>
                    <td><b>Period 4</b></td>
                    <td>11:30 - 12:15 PM</td>
                    <td><span class="badge badge-secondary">Class II-A</span></td>
                    <td><b>Environmental Studies</b></td>
                    <td>Room 103</td>
                    <td><span class="badge badge-warning">Upcoming</span></td>
                  </tr>
                  <tr>
                    <td><b>Period 6</b></td>
                    <td>01:30 - 02:15 PM</td>
                    <td><span class="badge badge-info">Class I-A</span></td>
                    <td><b>Rhymes & Storytelling</b></td>
                    <td>Room 101</td>
                    <td><span class="badge badge-secondary">Scheduled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Card 2: Homework & Assignment Queue -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div class="card-title">&#128221; Active Class Homework &amp; Submissions</div>
              <small style="color:var(--text-muted);">Review student submissions and assign evaluation marks</small>
            </div>
            <button class="btn btn-primary btn-sm" onclick="openCreateAssignmentModal()">+ Add Assignment</button>
          </div>
          <div class="card-body" style="padding:0;">
            <div class="table-responsive">
              <table class="argon-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Assignment Title</th>
                    <th>Due Date</th>
                    <th>Class</th>
                    <th>Submissions</th>
                    <th style="text-align:right;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${(S.hw && S.hw.length > 0) ? S.hw.map(h => `
                    <tr>
                      <td><b>${esc(h.sub || 'English')}</b></td>
                      <td>${esc(h.title || 'Worksheet #3')}</td>
                      <td><code style="color:var(--stat-yellow);">${esc(h.due || '2026-11-05')}</code></td>
                      <td><span class="badge badge-info">Class ${rom(h.cls)}</span></td>
                      <td><span class="badge badge-success">${(h.submissions || []).length} / ${myStudents.length}</span></td>
                      <td style="text-align:right;">
                        <button class="btn btn-outline btn-sm" onclick="navigateTo('hw')">Review Submissions</button>
                      </td>
                    </tr>
                  `).join("") : `
                    <tr>
                      <td><b>English</b></td>
                      <td>Handwriting Chapter 4 &middot; Two Letter Words</td>
                      <td><code style="color:var(--stat-yellow);">Tomorrow, 04:00 PM</code></td>
                      <td><span class="badge badge-info">Class I-A</span></td>
                      <td><span class="badge badge-success">10 / 12 Submitted</span></td>
                      <td style="text-align:right;">
                        <button class="btn btn-outline btn-sm" onclick="navigateTo('hw')">Review</button>
                      </td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: My Class Roster & Circulars -->
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Card 3: Quick Class Attendance Desk -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">&#9989; Class I-A Attendance Desk</div>
            <small style="color:var(--text-muted);">Quick roll-call for your assigned classroom</small>
          </div>
          <div class="card-body">
            <p style="font-size:13px; color:var(--text-secondary); margin-bottom:14px;">
              Total students registered in Class I-A: <b>${myStudents.length}</b>. Roll call status for <b>${new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</b> is <b>${isAttTaken ? 'Recorded' : 'Pending'}</b>.
            </p>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-success btn-sm" style="flex:1;" onclick="markAllStudentsPresent()">Mark All Present</button>
              <button class="btn btn-primary btn-sm" style="flex:1;" onclick="navigateTo('att')">Open Register</button>
            </div>
          </div>
        </div>

        <!-- Card 4: Teacher Leave & Attendance Balance -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">&#128100; My Leave Balance</div>
            <small style="color:var(--text-muted);">Academic Session 2026–27</small>
          </div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; text-align:center; margin-bottom:14px;">
              <div style="background:var(--bg-app); padding:10px; border-radius:8px; border:1px solid var(--border-subtle);">
                <div style="font-size:18px; font-weight:800; color:#10b981;">10</div>
                <small style="color:var(--text-muted); font-size:11px;">Casual Leaves Left</small>
              </div>
              <div style="background:var(--bg-app); padding:10px; border-radius:8px; border:1px solid var(--border-subtle);">
                <div style="font-size:18px; font-weight:800; color:#3b82f6;">05</div>
                <small style="color:var(--text-muted); font-size:11px;">Medical Leaves Left</small>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" style="width:100%;" onclick="openApplyTeacherLeaveModal()">Apply for Leave</button>
          </div>
        </div>

        <!-- Card 5: Staff Circulars & Notices -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">&#128227; Staff Circulars</div>
          </div>
          <div class="card-body" style="padding:14px;">
            <div style="border-left:3px solid #3b82f6; padding-left:12px; margin-bottom:12px;">
              <div style="font-weight:700; font-size:13px; color:var(--text-main);">Staff Academic Meeting</div>
              <small style="color:var(--text-muted);">Saturday, 02:30 PM &middot; Room 201</small>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Discussion on 2nd Evaluation syllabus completion and question papers.</p>
            </div>
            <div style="border-left:3px solid #f59e0b; padding-left:12px;">
              <div style="font-weight:700; font-size:13px; color:var(--text-main);">Marks Entry Deadline</div>
              <small style="color:var(--text-muted);">1st Evaluation progress cards</small>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Please finalize all Class I report card marks before 5th November.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 4. STUDENT / PARENT HOME & LEARNING (NO DASHBOARD!)
function renderStudentLearning() {
  const s = S.stu.find(x => x.name.toLowerCase().includes("prerona") || x.name.toLowerCase().includes("snehasish")) || S.stu[0];
  const t = today();

  // Breadcrumbs
  updateBreadcrumbs([
    { label: "Home", view: "shome" },
    { label: "My Learning & Portal" }
  ]);

  $("#headerBanner").innerHTML = `
    <div class="banner-top">
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <span class="badge badge-info" style="font-size:12px; font-weight:700;">STUDENT & PARENT PORTAL</span>
          <span style="color:var(--text-muted); font-size:12px;">Session ${AY} &middot; Ideal English School</span>
        </div>
        <h1 class="banner-title">Welcome, ${esc(s.name)}</h1>
        <p class="banner-sub">Admission No: <b>${esc(s.adm)}</b> &middot; Class: <b>Class ${rom(s.cls)}-${s.sec || 'A'}</b> &middot; Roll No: <b>#${s.roll}</b> &middot; Father: <b>${esc(s.father || 'Guardian')}</b></p>
      </div>
      <div class="banner-actions">
        <button class="btn btn-white btn-sm" onclick="openStudentAdmitCard(${s.id})">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Exam Admit Card
        </button>
        <button class="btn btn-primary btn-sm" onclick="openStudentMarksheet(${s.id})">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          Official Marksheet
        </button>
      </div>
    </div>
  `;

  // Student Stat Chips
  $("#statCards").innerHTML = `
    <div class="stat-card" style="border-top:3px solid #10b981;">
      <div class="stat-content">
        <div class="stat-title">Attendance Rate</div>
        <div class="stat-value" style="color:#10b981;">96.8%</div>
        <div class="stat-desc">Present 182 / 188 School Days</div>
      </div>
      <div class="stat-icon" style="background:rgba(16,185,129,0.15); color:#10b981;">&#9989;</div>
    </div>

    <div class="stat-card" style="border-top:3px solid #3b82f6;">
      <div class="stat-content">
        <div class="stat-title">Academic Grade</div>
        <div class="stat-value" style="color:#3b82f6;">A+ (92.4%)</div>
        <div class="stat-desc">Rank #1 in Class ${rom(s.cls)}-${s.sec || 'A'}</div>
      </div>
      <div class="stat-icon" style="background:rgba(59,130,246,0.15); color:#3b82f6;">&#127891;</div>
    </div>

    <div class="stat-card" style="border-top:3px solid #f59e0b;">
      <div class="stat-content">
        <div class="stat-title">Homework Pending</div>
        <div class="stat-value" style="color:#f59e0b;">1 Task</div>
        <div class="stat-desc">English Grammar Worksheet</div>
      </div>
      <div class="stat-icon" style="background:rgba(245,158,11,0.15); color:#f59e0b;">&#128221;</div>
    </div>

    <div class="stat-card" style="border-top:3px solid ${s.due > 0 ? '#ef4444' : '#10b981'};">
      <div class="stat-content">
        <div class="stat-title">Fee Account Status</div>
        <div class="stat-value" style="color:${s.due > 0 ? '#ef4444' : '#10b981'};">${s.due > 0 ? rs(s.due) : 'Clear &#10003;'}</div>
        <div class="stat-desc">${s.due > 0 ? 'Pending for Month' : 'Up to Date Receipts'}</div>
      </div>
      <div class="stat-icon" style="background:${s.due > 0 ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}; color:${s.due > 0 ? '#ef4444' : '#10b981'};">&#128179;</div>
    </div>
  `;

  // Student Main View
  $("#pageContent").innerHTML = `
    <div style="display:grid; grid-template-columns: 2fr 1fr; gap:20px;">
      <!-- Left Column: Timetable & Homework -->
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Card 1: Today's Classroom Timetable -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div class="card-title">&#128197; My Class Schedule &middot; Today</div>
              <small style="color:var(--text-muted);">Class ${rom(s.cls)}-${s.sec || 'A'} Daily Timetable</small>
            </div>
            <button class="btn btn-outline btn-sm" onclick="navigateTo('tt')">Weekly View</button>
          </div>
          <div class="card-body" style="padding:0;">
            <div class="table-responsive">
              <table class="argon-table">
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Classroom</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Period 1</b></td>
                    <td>09:00 - 09:45 AM</td>
                    <td><b>English Grammar</b></td>
                    <td>Anima Dey</td>
                    <td>Room 101</td>
                  </tr>
                  <tr>
                    <td><b>Period 2</b></td>
                    <td>09:45 - 10:30 AM</td>
                    <td><b>Mathematics</b></td>
                    <td>Anima Dey</td>
                    <td>Room 101</td>
                  </tr>
                  <tr>
                    <td><b>Period 3</b></td>
                    <td>10:45 - 11:30 AM</td>
                    <td><b>Assamese / Bengali</b></td>
                    <td>M. Paul</td>
                    <td>Room 101</td>
                  </tr>
                  <tr>
                    <td><b>Period 4</b></td>
                    <td>11:30 - 12:15 PM</td>
                    <td><b>General Science & EVS</b></td>
                    <td>R. Singha</td>
                    <td>Room 101</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Card 2: 4-Evaluation Academic Progress Cards -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div class="card-title">&#127891; 4-Evaluation Continuous Comprehensive Evaluation (CCE)</div>
              <small style="color:var(--text-muted);">Ideal English School Official Academic Progress Records</small>
            </div>
            <button class="btn btn-primary btn-sm" onclick="openStudentMarksheet(${s.id})">Print Full Marksheet</button>
          </div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-bottom:16px;">
              <div style="background:var(--bg-app); border:1px solid var(--border-subtle); border-radius:8px; padding:12px; text-align:center;">
                <small style="color:var(--text-muted); font-size:11px; text-transform:uppercase; font-weight:700;">1st Evaluation</small>
                <div style="font-size:20px; font-weight:800; color:#10b981; margin:4px 0;">94%</div>
                <span class="badge badge-success">Grade A+</span>
              </div>
              <div style="background:var(--bg-app); border:1px solid var(--border-subtle); border-radius:8px; padding:12px; text-align:center;">
                <small style="color:var(--text-muted); font-size:11px; text-transform:uppercase; font-weight:700;">2nd Evaluation</small>
                <div style="font-size:20px; font-weight:800; color:#3b82f6; margin:4px 0;">91%</div>
                <span class="badge badge-primary">Grade A+</span>
              </div>
              <div style="background:var(--bg-app); border:1px solid var(--border-subtle); border-radius:8px; padding:12px; text-align:center;">
                <small style="color:var(--text-muted); font-size:11px; text-transform:uppercase; font-weight:700;">3rd Evaluation</small>
                <div style="font-size:20px; font-weight:800; color:#8b5cf6; margin:4px 0;">93%</div>
                <span class="badge badge-info">Grade A+</span>
              </div>
              <div style="background:var(--bg-app); border:1px solid var(--border-subtle); border-radius:8px; padding:12px; text-align:center;">
                <small style="color:var(--text-muted); font-size:11px; text-transform:uppercase; font-weight:700;">4th Evaluation</small>
                <div style="font-size:20px; font-weight:800; color:#f59e0b; margin:4px 0;">Upcoming</div>
                <span class="badge badge-warning">Nov 2026</span>
              </div>
            </div>
            <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
              Headmaster's Evaluation Remark: <i>"Prerona shows exceptional dedication in English and Mathematics. Active participation in all school co-curricular activities."</i>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Quick Documents & School Dues -->
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Card 3: Instant School Documents -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">&#128196; Official School Credentials</div>
            <small style="color:var(--text-muted);">Verified print and digital documents</small>
          </div>
          <div class="card-body" style="display:flex; flex-direction:column; gap:10px;">
            <button class="btn btn-outline btn-sm" style="width:100%; justify-content:flex-start; text-align:left;" onclick="openStudent360(${s.id})">
              <span style="margin-right:8px;">&#128100;</span> View Full 360&deg; Student Dossier
            </button>
            <button class="btn btn-outline btn-sm" style="width:100%; justify-content:flex-start; text-align:left;" onclick="openStudentIDCardModal(${s.id})">
              <span style="margin-right:8px;">&#129706;</span> Print PVC Student ID Card
            </button>
            <button class="btn btn-outline btn-sm" style="width:100%; justify-content:flex-start; text-align:left;" onclick="openStudentAdmitCard(${s.id})">
              <span style="margin-right:8px;">&#127915;</span> Print Examination Admit Card
            </button>
            <button class="btn btn-outline btn-sm" style="width:100%; justify-content:flex-start; text-align:left;" onclick="openStudentFeeQuickModal(${s.id})">
              <span style="margin-right:8px;">&#128179;</span> View Monthly Fee Receipts
            </button>
          </div>
        </div>

        <!-- Card 4: School Announcements for Parents -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">&#128227; School Announcements</div>
          </div>
          <div class="card-body" style="padding:14px;">
            <div style="border-left:3px solid #10b981; padding-left:12px; margin-bottom:12px;">
              <div style="font-weight:700; font-size:13px; color:var(--text-main);">Parent-Teacher Meeting (PTM)</div>
              <small style="color:var(--text-muted);">2nd Saturday, 10:00 AM</small>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Parent consultation regarding 3rd evaluation progress and winter project assignments.</p>
            </div>
            <div style="border-left:3px solid #3b82f6; padding-left:12px;">
              <div style="font-weight:700; font-size:13px; color:var(--text-main);">School Uniform Winter Schedule</div>
              <small style="color:var(--text-muted);">Effective 15th November 2026</small>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Navy blue school blazer and grey sweater mandatory for morning assembly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 5. HELPER FOR BREADCRUMBS
function updateBreadcrumbs(crumbs) {
  const container = document.querySelector(".breadcrumb-trail");
  if (!container) return;
  if (!crumbs || crumbs.length === 0) {
    container.innerHTML = `<span class="bc-current">Home</span>`;
    return;
  }
  let html = "";
  crumbs.forEach((c, idx) => {
    if (idx < crumbs.length - 1) {
      html += `<a href="#" onclick="navigateTo('${c.view || 'dash'}'); return false;" class="bc-link">${c.label}</a><span class="bc-sep">/</span>`;
    } else {
      html += `<span class="bc-current">${c.label}</span>`;
    }
  });
  container.innerHTML = html;
}

// 6. APPLY ROLE PERMISSIONS WITH ZERO DASHBOARD FOR TEACHERS / STUDENTS
function applyRolePermissionsV5(role = currentRole) {
  currentRole = role;
  const perm = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.Admin;

  // Header badges and labels
  const roleLimitBadge = $("#roleLimitBadge");
  if (roleLimitBadge) {
    roleLimitBadge.innerText = perm.badge;
    roleLimitBadge.className = "badge " + perm.badgeClass;
    roleLimitBadge.title = "Operating Role: " + perm.name;
  }
  const userAvatar = $("#userAvatar");
  if (userAvatar) {
    const avatarMap = { Admin: "A", Principal: "P", Accounts: "C", Teacher: "T", Parent: "F" };
    userAvatar.innerText = avatarMap[role] || "U";
  }
  const userDisplayName = $("#userDisplayName");
  if (userDisplayName) {
    userDisplayName.innerText = perm.user;
  }
  const roleSelect = $("#roleSelector");
  if (roleSelect && roleSelect.value !== role) {
    roleSelect.value = role;
  }

  // Re-render role-specific sidebar navigation
  renderRoleSidebar(role);
}

// 7. ROUTE NAVIGATOR WITH TEACHER/STUDENT REDIRECTIONS
function navigateToV5(viewName) {
  // STRICT RULE: If Teacher or Student attempts to view 'dash', redirect immediately to their workspace!
  if (currentRole === "Teacher" && (viewName === "dash" || viewName === "overview")) {
    viewName = "thome";
  } else if ((currentRole === "Parent" || currentRole === "Student") && (viewName === "dash" || viewName === "overview")) {
    viewName = "shome";
  }

  const perm = ROLE_PERMISSIONS[currentRole] || ROLE_PERMISSIONS.Admin;
  if (!perm.allowedViews.includes(viewName) && viewName !== "thome" && viewName !== "shome") {
    // If unauthorized, redirect to default
    const safeTarget = perm.defaultView || (currentRole === "Teacher" ? "thome" : (currentRole === "Parent" ? "shome" : "dash"));
    navigateToV5(safeTarget);
    return;
  }

  currentView = viewName;

  // Update active state in sidebar
  $$(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.view === viewName);
  });

  // Close mobile sidebar and backdrop if open
  const sb = document.getElementById("sidebarNav");
  const bd = document.getElementById("sidebarBackdrop");
  if (sb) sb.classList.remove("show");
  if (bd) bd.classList.remove("show");

  // Route Dispatcher
  switch(viewName) {
    case "thome": renderTeacherWorkspace(); break;
    case "shome": renderStudentLearning(); break;
    case "tprof": 
      openEmployeeIdCardModal(2); 
      renderTeacherWorkspace(); 
      break;
    case "sprof": 
      openStudent360(1); 
      renderStudentLearning(); 
      break;
    case "tatt": 
      renderStaffAttendance(); 
      break;
    case "satt": 
      openStudentAttendanceHistory(1); 
      renderStudentLearning(); 
      break;
    case "sfee": 
      openStudentFeeQuickModal(1); 
      renderStudentLearning(); 
      break;
    case "sprn": 
      openStudentAdmitCard(1); 
      renderStudentLearning(); 
      break;
    case "dash": renderDashboard(); break;
    case "stu": renderStudents(); break;
    case "adm": renderAdmissions(); break;
    case "att": renderAttendance(); break;
    case "acad": renderAcademicManagement(); break;
    case "cls": renderClasses(); break;
    case "sub": renderAcademicManagement("sub"); break;
    case "stf": renderStaff(); break;
    case "stf_att": renderStaffAttendance(); break;
    case "tt": renderTimetable(); break;
    case "exm": renderExaminations(); break;
    case "fee": renderFeeCounter(); break;
    case "exp": renderExpenses(); break;
    case "pay": renderPayroll(); break;
    case "hw": renderHomework(); break;
    case "not": renderNotices(); break;
    case "iep": renderIEP(); break;
    case "por": renderParentPortal(); break;
    case "rep": renderReports(); break;
    case "prc": renderPrintCentre(); break;
    case "aud": renderAuditLog(); break;
    case "set": renderSettings(); break;
    default: 
      if (currentRole === "Teacher") renderTeacherWorkspace();
      else if (currentRole === "Parent") renderStudentLearning();
      else renderDashboard();
  }

  // Update badge counters in sidebar
  const badgeStu = $("#badgeStuCount");
  if (badgeStu) badgeStu.innerText = S.stu.length;
}

// 8. TEACHER LEAVE APPLICATION MODAL
function openApplyTeacherLeaveModal() {
  showModal(`
    <div class="modal-content modal-md">
      <div class="modal-header">
        <div>
          <div class="modal-title">Apply for Staff Leave &middot; Session ${AY}</div>
          <small style="color:var(--text-muted);">Ideal English School Staff Leave Requisition</small>
        </div>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body" style="padding:20px;">
        <form onsubmit="event.preventDefault(); closeModal(); showToast('Leave application submitted to Headmaster for approval.', 'success');">
          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label">Leave Type *</label>
            <select class="form-select" required>
              <option value="Casual">Casual Leave (CL) - 10 Days Available</option>
              <option value="Medical">Medical Leave (ML) - 05 Days Available</option>
              <option value="Duty">Duty / Academic Training Leave</option>
            </select>
          </div>
          <div class="form-grid-2" style="margin-bottom:12px;">
            <div class="form-group">
              <label class="form-label">Start Date *</label>
              <input type="date" class="form-control" required value="${today()}">
            </div>
            <div class="form-group">
              <label class="form-label">End Date *</label>
              <input type="date" class="form-control" required value="${today()}">
            </div>
          </div>
          <div class="form-group" style="margin-bottom:16px;">
            <label class="form-label">Reason for Absence *</label>
            <textarea class="form-control" rows="3" placeholder="State reason for leave and arrangement for assigned periods..." required></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn btn-outline btn-sm" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Submit to Headmaster</button>
          </div>
        </form>
      </div>
    </div>
  `);
}
