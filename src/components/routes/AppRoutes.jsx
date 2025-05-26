import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard"

// Import modular components
import { PatientCreate, PatientListing, PatientDetail, PatientUpdate } from "../../modules/Patient"
// import { DoctorCreate, DoctorListing, DoctorDetail, DoctorUpdate } from "../../modules/Doctor"
import { DoctorCreate, DoctorDetail, DoctorUpdate } from "../../modules/Doctor"
import { AppointmentCreate, AppointmentListing } from "../../modules/Appointment"
import { BedCreate, BedListing } from "../../modules/Bed"
import { LaboratoryCreate, LaboratoryListing } from "../../modules/Laboratory"
import { EmergencyCreate, EmergencyListing } from "../../modules/Emergency"
import { NursingCreate, NursingListing } from "../../modules/Nursing"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Patient Management - Fully Modular */}
      <Route path="/patients/list" element={<PatientListing />} />
      <Route path="/patients/add" element={<PatientCreate />} />
      <Route path="/patients/create" element={<PatientCreate />} />
      {/* <Route path="/patients/details" element={<PatientDetail />} /> */}
      <Route path="/patients/details/:id" element={<PatientDetail />} />
      <Route path="/patients/update/:id" element={<PatientUpdate />} />

      {/* Doctor Management - Fully Modular */}
      {/* <Route path="/doctors/list" element={<DoctorListing />} /> */}
      <Route path="/doctors/add" element={<DoctorCreate />} />
      <Route path="/doctors/create" element={<DoctorCreate />} />
      {/* <Route path="/doctors/list" element={<AllDoctor/>} /> */}
      <Route path="/doctors/detail/:id" element={<DoctorDetail />} />
      <Route path="/doctors/update/:id" element={<DoctorUpdate />} />

      {/* Appointments - Modular */}
      <Route path="/appointments/list" element={<AppointmentListing />} />
      <Route path="/appointments/book" element={<AppointmentCreate />} />
      <Route path="/appointments/create" element={<AppointmentCreate />} />

      {/* Bed Management - Modular */}
      <Route path="/beds/list" element={<BedListing />} />
      <Route path="/beds/assign" element={<BedCreate />} />
      <Route path="/beds/create" element={<BedCreate />} />

      {/* Laboratory - Modular */}
      <Route path="/laboratory/reports" element={<LaboratoryListing />} />
      <Route path="/laboratory/add" element={<LaboratoryCreate />} />
      <Route path="/laboratory/create/:id" element={<LaboratoryCreate />} />

      {/* Emergency - Modular */}
      <Route path="/emergency/queue" element={<EmergencyListing />} />
      <Route path="/emergency/intake" element={<EmergencyCreate />} />
      <Route path="/emergency/create" element={<EmergencyCreate />} />

      {/* Nursing - Modular */}
      <Route path="/nursing/vitals" element={<NursingListing />} />
      <Route path="/nursing/vitals/add" element={<NursingCreate />} />
      <Route path="/nursing/create" element={<NursingCreate />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
