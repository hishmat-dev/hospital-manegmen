import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  patients: [
    {
      id: "P-1001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1-555-0123",
      email: "john.smith@email.com",
      address: "123 Main St, City, State 12345",
      bloodGroup: "O+",
      department: "Cardiology",
      doctor: "Dr. Sarah Wilson",
      admissionDate: "2024-01-15",
      status: "Admitted",
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
    },
    {
      id: "P-1002",
      name: "Emma Johnson",
      age: 32,
      gender: "Female",
      phone: "+1-555-0124",
      email: "emma.johnson@email.com",
      address: "456 Oak Ave, City, State 12345",
      bloodGroup: "A+",
      department: "Orthopedics",
      doctor: "Dr. Michael Brown",
      admissionDate: "2024-01-14",
      status: "Discharged",
      medicalHistory: ["Fracture History"],
    },
  ],
  selectedPatient: null,
  loading: false,
  error: null,
}

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload)
    },
    updatePatient: (state, action) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.patients[index] = action.payload
      }
    },
    deletePatient: (state, action) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload)
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { addPatient, updatePatient, deletePatient, setSelectedPatient, setLoading, setError } =
  patientSlice.actions

export default patientSlice.reducer
