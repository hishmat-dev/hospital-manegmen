import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { emergencyService } from "../services/emergencyService"

export const fetchEmergencyCases = createAsyncThunk("emergency/fetchEmergencyCases", async (params) => {
  return await emergencyService.getAll(params)
})

export const createEmergencyCase = createAsyncThunk("emergency/createEmergencyCase", async (emergencyData) => {
  return await emergencyService.create(emergencyData)
})

export const updateEmergencyCase = createAsyncThunk("emergency/updateEmergencyCase", async ({ id, data }) => {
  return await emergencyService.update(id, data)
})

export const deleteEmergencyCase = createAsyncThunk("emergency/deleteEmergencyCase", async (id) => {
  await emergencyService.delete(id)
  return id
})

export const triagePatient = createAsyncThunk("emergency/triagePatient", async ({ id, triageData }) => {
  return await emergencyService.triage(id, triageData)
})

export const assignDoctor = createAsyncThunk("emergency/assignDoctor", async ({ id, doctorId }) => {
  return await emergencyService.assignDoctor(id, doctorId)
})

const initialState = {
  emergencyCases: [],
  selectedCase: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    severity: "",
    triageLevel: "",
    status: "",
    assignedDoctor: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  emergencyStats: {
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    waiting: 0,
    inTreatment: 0,
    discharged: 0,
  },
  queue: {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: [],
  },
}

export const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {
    setSelectedCase: (state, action) => {
      state.selectedCase = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    updateEmergencyStats: (state) => {
      const stats = {
        total: state.emergencyCases.length,
        critical: state.emergencyCases.filter((c) => c.severity === "Critical").length,
        high: state.emergencyCases.filter((c) => c.severity === "High").length,
        medium: state.emergencyCases.filter((c) => c.severity === "Medium").length,
        low: state.emergencyCases.filter((c) => c.severity === "Low").length,
        waiting: state.emergencyCases.filter((c) => c.status === "Waiting").length,
        inTreatment: state.emergencyCases.filter((c) => c.status === "In Treatment").length,
        discharged: state.emergencyCases.filter((c) => c.status === "Discharged").length,
      }
      state.emergencyStats = stats
    },
    updateQueue: (state) => {
      const queue = {
        level1: state.emergencyCases.filter((c) => c.triageLevel === "Level 1" && c.status === "Waiting"),
        level2: state.emergencyCases.filter((c) => c.triageLevel === "Level 2" && c.status === "Waiting"),
        level3: state.emergencyCases.filter((c) => c.triageLevel === "Level 3" && c.status === "Waiting"),
        level4: state.emergencyCases.filter((c) => c.triageLevel === "Level 4" && c.status === "Waiting"),
        level5: state.emergencyCases.filter((c) => c.triageLevel === "Level 5" && c.status === "Waiting"),
      }
      state.queue = queue
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmergencyCases.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEmergencyCases.fulfilled, (state, action) => {
        state.loading = false
        state.emergencyCases = action.payload.data
        state.pagination.total = action.payload.total
      })
      .addCase(fetchEmergencyCases.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createEmergencyCase.fulfilled, (state, action) => {
        state.emergencyCases.unshift(action.payload)
      })
      .addCase(updateEmergencyCase.fulfilled, (state, action) => {
        const index = state.emergencyCases.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.emergencyCases[index] = action.payload
        }
      })
      .addCase(deleteEmergencyCase.fulfilled, (state, action) => {
        state.emergencyCases = state.emergencyCases.filter((c) => c.id !== action.payload)
      })
      .addCase(triagePatient.fulfilled, (state, action) => {
        const index = state.emergencyCases.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.emergencyCases[index] = action.payload
        }
      })
      .addCase(assignDoctor.fulfilled, (state, action) => {
        const index = state.emergencyCases.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.emergencyCases[index] = action.payload
        }
      })
  },
})

export const { setSelectedCase, setFilters, setPagination, updateEmergencyStats, updateQueue, clearError } =
  emergencySlice.actions

export default emergencySlice.reducer
