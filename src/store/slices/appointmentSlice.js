import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  appointments: [
    {
      id: "A-001",
      patientId: "P-1001",
      patientName: "John Smith",
      doctorId: "D-001",
      doctorName: "Dr. Sarah Wilson",
      date: "2024-01-20",
      time: "10:00 AM",
      department: "Cardiology",
      type: "Consultation",
      status: "Scheduled",
      notes: "Regular checkup",
    },
    {
      id: "A-002",
      patientId: "P-1002",
      patientName: "Emma Johnson",
      doctorId: "D-002",
      doctorName: "Dr. Michael Brown",
      date: "2024-01-20",
      time: "2:00 PM",
      department: "Orthopedics",
      type: "Follow-up",
      status: "Completed",
      notes: "Post-surgery checkup",
    },
  ],
  selectedAppointment: null,
  loading: false,
  error: null,
}

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload)
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex((a) => a.id === action.payload.id)
      if (index !== -1) {
        state.appointments[index] = action.payload
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter((a) => a.id !== action.payload)
    },
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload
    },
  },
})

export const { addAppointment, updateAppointment, deleteAppointment, setSelectedAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer
