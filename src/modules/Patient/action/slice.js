import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { patientService } from "../services/patientService"

export const fetchPatients = createAsyncThunk("patients/fetchPatients", async (params) => {
  return await patientService.getAll(params)
})

export const fetchPatientById = createAsyncThunk("patients/fetchPatientById", async (id) => {
  return await patientService.getById(id)
})

export const createPatient = createAsyncThunk("patients/createPatient", async (patientData) => {
  return await patientService.create(patientData)
})

export const updatePatient = createAsyncThunk("patients/updatePatient", async ({ id, data }) => {
  return await patientService.update(id, data)
})

export const deletePatient = createAsyncThunk("patients/deletePatient", async (id) => {
  await patientService.delete(id)
  return id
})

const initialState = {
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    gender: "",
    bloodGroup: "",
    status: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
}

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload
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
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false
        state.patients = action.payload.data
        state.pagination.total = action.payload.total
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        const existingIndex = state.patients.findIndex((p) => p.id === action.payload.id)
        if (existingIndex !== -1) {
          state.patients[existingIndex] = action.payload
        } else {
          state.patients.push(action.payload)
        }
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload)
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.patients[index] = action.payload
        }
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter((p) => p.id !== action.payload)
      })
  },
})

export const { setSelectedPatient, setFilters, setPagination, clearError } = patientSlice.actions
export default patientSlice.reducer
