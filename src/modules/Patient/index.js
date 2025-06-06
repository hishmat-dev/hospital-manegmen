
export { default as PatientCreate } from "./pages/create";
export { default as PatientListing } from "./pages/listing";
export { default as PatientDetail } from "./pages/detail";
export { default as PatientUpdate } from "./pages/update";
export { patientService } from "./services/patientService";
export { default as patientSlice } from "../../store/slices/patientSlice";
export {
  fetchPatients,
  fetchPatientById,
  addPatient,
  updatePatient,
  deletePatient,
  setSelectedPatient,
  setFilters,
  setPagination,
  clearError,
} from "../../store/slices/patientSlice";