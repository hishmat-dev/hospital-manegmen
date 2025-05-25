import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  doctors: [
    {
      id: "D-001",
      name: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      phone: "+1-555-1001",
      email: "sarah.wilson@hospital.com",
      experience: "15 years",
      qualification: "MD, FACC",
      department: "Cardiology",
      status: "Available",
      shift: "Morning",
      patients: 23,
    },
    {
      id: "D-002",
      name: "Dr. Michael Brown",
      specialty: "Orthopedics",
      phone: "+1-555-1002",
      email: "michael.brown@hospital.com",
      experience: "12 years",
      qualification: "MD, MS Orthopedics",
      department: "Orthopedics",
      status: "On Duty",
      shift: "Evening",
      patients: 18,
    },
  ],
  selectedDoctor: null,
  loading: false,
  error: null,
}

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push(action.payload)
    },
    updateDoctor: (state, action) => {
      const index = state.doctors.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) {
        state.doctors[index] = action.payload
      }
    },
    deleteDoctor: (state, action) => {
      state.doctors = state.doctors.filter((d) => d.id !== action.payload)
    },
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload
    },
  },
})

export const { addDoctor, updateDoctor, deleteDoctor, setSelectedDoctor } = doctorSlice.actions
export default doctorSlice.reducer
