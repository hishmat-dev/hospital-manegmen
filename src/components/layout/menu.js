import {
  Home,
  Users,
  UserCheck,
  Calendar,
  Bed,
  Stethoscope,
  FlaskRoundIcon as Flask,
  FileText,
  AlertTriangle,
  Activity,
} from "lucide-react"

export const menu = [
  {
    title: "Dashboard",
    icon: <Home size={18} />,
    path: "/dashboard",
  },
  {
    title: "Patient Management",
    icon: <Users size={18} />,
    children: [
    //   { title: "Profile", path: "/patients/profile" },
      { title: "Add Patient", path: "/patients/add" },
      { title: "All Patients", path: "/patients/list" },
      // { title: "Patient Details", path: "/patients/details" },
    ],
  },
  {
    title: "Doctor Management",
    icon: <UserCheck size={18} />,
    children: [
      { title: "Add Doctor", path: "/doctors/add" },
      { title: "All Doctors", path: "/doctors/list" },
      // { title: "Doctor Profile", path: "/doctors/profile" },
      // { title: "Edit Profile", path: "/doctors/edit" },
    ],
  },
  {
    title: "Appointments",
    icon: <Calendar size={18} />,
    children: [
      { title: "Book Appointment", path: "/appointments/book" },
      { title: "Appointment List", path: "/appointments/list" },
      // { title: "Calendar View", path: "/appointments/calendar" },
      { title: "Edit Appointment", path: "/appointments/edit" },
    ],
  },
  {
    title: "Bed Management",
    icon: <Bed size={18} />,
    children: [
      { title: "Bed List", path: "/beds/list" },
      { title: "Assign Bed", path: "/beds/assign" },
      { title: "Transfer Bed", path: "/beds/transfer" },
      { title: "Bed Availability", path: "/beds/availability" },
    ],
  },
  {
    title: "OPD",
    icon: <Stethoscope size={18} />,
    children: [
      { title: "OPD Queue", path: "/opd/queue" },
      { title: "OPD Consultation", path: "/opd/consultation" },
      { title: "OPD Billing", path: "/opd/billing" },
    ],
  },
  {
    title: "Laboratory",
    icon: <Flask size={18} />,
    children: [
      { title: "Add Lab Test", path: "/laboratory/add" },
      { title: "Lab Reports", path: "/laboratory/reports" },
      { title: "Patient Lab History", path: "/laboratory/history" },
    ],
  },
  {
    title: "Reports",
    icon: <FileText size={18} />,
    children: [
      { title: "Medical Reports", path: "/reports/medical" },
      { title: "Discharge Summary", path: "/reports/discharge" },
      { title: "Prescription View", path: "/reports/prescription" },
    ],
  },
  {
    title: "Emergency",
    icon: <AlertTriangle size={18} />,
    children: [
      { title: "Emergency Intake", path: "/emergency/intake" },
      { title: "Triage Management", path: "/emergency/triage" },
      { title: "Emergency Queue", path: "/emergency/queue" },
    ],
  },
  {
    title: "Nursing",
    icon: <Activity size={18} />,
    children: [
      { title: "Vitals Tracking", path: "/nursing/vitals" },
      { title: "Medication Schedule", path: "/nursing/medications" },
      { title: "Shift Handover", path: "/nursing/shifts" },
    ],
  },
]