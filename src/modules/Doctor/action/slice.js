import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { doctorService } from "../services/doctorService"

export const fetchDoctors = createAsyncThunk("doctors/fetchDoctors", async (params) => {
  return await doctorService.getAll(params)
})

export const fetchDoctorById = createAsyncThunk("doctors/fetchDoctorById", async (id) => {
  return await doctorService.getById(id)
})

export const createDoctor = createAsyncThunk("doctors/createDoctor", async (doctorData) => {
  return await doctorService.create(doctorData)
})

export const updateDoctor = createAsyncThunk("doctors/updateDoctor", async ({ id, data }) => {
  return await doctorService.update(id, data)
})

export const deleteDoctor = createAsyncThunk("doctors/deleteDoctor", async (id) => {
  await doctorService.delete(id)
  return id
})

const initialState = {
  doctors: [
  {
    id: 1,
    name: "Dr. Ahmed Khan",
    specialty: "Cardiology",
    department: "Cardiology",
    contact: "+92-300-1234567",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Fatima Siddiqui",
    specialty: "Neurology",
    department: "Neurology",
    contact: "+92-321-9876543",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Muhammad Usman",
    specialty: "Orthopedics",
    department: "Orthopedics",
    contact: "+92-333-4567890",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Dr. Ayesha Malik",
    specialty: "Pediatrics",
    department: "Pediatrics",
    contact: "+92-302-5551234",
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Hassan Raza",
    specialty: "General Surgery",
    department: "Surgery",
    contact: "+92-301-6789012",
    status: "Inactive",
  },
],
  selectedDoctor: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    specialty: "",
    department: "",
    status: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
}

export const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload
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
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false
        state.doctors = action.payload.data
        state.pagination.total = action.payload.total
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        const existingIndex = state.doctors.findIndex((d) => d.id === action.payload.id)
        if (existingIndex !== -1) {
          state.doctors[existingIndex] = action.payload
        } else {
          state.doctors.push(action.payload)
        }
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload)
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex((d) => d.id === action.payload.id)
        if (index !== -1) {
          state.doctors[index] = action.payload
        }
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter((d) => d.id !== action.payload)
      })
  },
})

export const { setSelectedDoctor, setFilters, setPagination, clearError } = doctorSlice.actions
export default doctorSlice.reducer
