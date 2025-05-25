"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
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
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"

const menu = [
  {
    title: "Dashboard",
    icon: <Home size={18} />,
    path: "/dashboard",
  },
  {
    title: "Patient Management",
    icon: <Users size={18} />,
    children: [
      { title: "Profile", path: "/patients/profile" },
      { title: "Add Patient", path: "/patients/add" },
      { title: "All Patients", path: "/patients/list" },
      { title: "Patient Details", path: "/patients/details" },
    ],
  },
  {
    title: "Doctor Management",
    icon: <UserCheck size={18} />,
    children: [
      { title: "Add Doctor", path: "/doctors/add" },
      { title: "All Doctors", path: "/doctors/list" },
      { title: "Doctor Profile", path: "/doctors/profile" },
      { title: "Edit Profile", path: "/doctors/edit" },
    ],
  },
  {
    title: "Appointments",
    icon: <Calendar size={18} />,
    children: [
      { title: "Book Appointment", path: "/appointments/book" },
      { title: "Appointment List", path: "/appointments/list" },
      { title: "Calendar View", path: "/appointments/calendar" },
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

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({})
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (children) => {
    return children?.some((child) => location.pathname === child.path)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:inset-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
      
        {/* Navigation */}
        <nav className="mt-4 px-4 h-full overflow-y-auto pb-20">
          {menu.map((item, index) => (
            <div key={index} className="mb-2">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors duration-200
                      ${
                        isParentActive(item.children)
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {openMenus[item.title] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {openMenus[item.title] && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          onClick={() => setIsMobileOpen(false)}
                          className={`
                            block px-4 py-2 text-sm rounded-lg transition-colors duration-200
                            ${
                              isActive(child.path)
                                ? "bg-blue-100 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            }
                          `}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                    ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}
