import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { appointmentService } from "../services/appointmentService"

export const fetchAppointments = createAsyncThunk("appointments/fetchAppointments", async (params) => {
  return await appointmentService.getAll(params)
})

export const createAppointment = createAsyncThunk("appointments/createAppointment", async (appointmentData) => {
  return await appointmentService.create(appointmentData)
})

export const updateAppointment = createAsyncThunk("appointments/updateAppointment", async ({ id, data }) => {
  return await appointmentService.update(id, data)
})

export const deleteAppointment = createAsyncThunk("appointments/deleteAppointment", async (id) => {
  await appointmentService.delete(id)
  return id
})

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
  filters: {
    search: "",
    status: "",
    department: "",
    date: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
}

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false
        state.appointments = action.payload.data
        state.pagination.total = action.payload.total
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload)
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex((a) => a.id === action.payload.id)
        if (index !== -1) {
          state.appointments[index] = action.payload
        }
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter((a) => a.id !== action.payload)
      })
  },
})

export const { setSelectedAppointment, setFilters, setPagination, clearError } = appointmentSlice.actions
export default appointmentSlice.reducer
