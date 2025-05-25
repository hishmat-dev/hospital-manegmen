import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { nursingService } from "../services/nursingService"

// Existing Thunks
export const fetchVitals = createAsyncThunk("nursing/fetchVitals", async (params) => {
  return await nursingService.getAllVitals(params)
})

export const createVitals = createAsyncThunk("nursing/createVitals", async (vitalsData) => {
  return await nursingService.createVitals(vitalsData)
})

export const updateVitals = createAsyncThunk("nursing/updateVitals", async ({ id, data }) => {
  return await nursingService.updateVitals(id, data)
})

export const fetchMedications = createAsyncThunk("nursing/fetchMedications", async (params) => {
  return await nursingService.getAllMedications(params)
})

export const createMedication = createAsyncThunk("nursing/createMedication", async (medicationData) => {
  return await nursingService.createMedication(medicationData)
})

export const administerMedication = createAsyncThunk("nursing/administerMedication", async ({ id, data }) => {
  return await nursingService.administerMedication(id, data)
})

export const fetchShifts = createAsyncThunk("nursing/fetchShifts", async (params) => {
  return await nursingService.getAllShifts(params)
})

export const createShift = createAsyncThunk("nursing/createShift", async (shiftData) => {
  return await nursingService.createShift(shiftData)
})

// ✅ New Thunks
export const fetchVitalsRecords = createAsyncThunk("nursing/fetchVitalsRecords", async (params) => {
  return await nursingService.getAllVitalsRecords(params)
})

export const createVitalsRecord = createAsyncThunk("nursing/createVitalsRecord", async (data) => {
  return await nursingService.createVitalsRecord(data)
})

export const deleteVitalsRecord = createAsyncThunk("nursing/deleteVitalsRecord", async (id) => {
  return await nursingService.deleteVitalsRecord(id)
})

const initialState = {
  vitals: [],
  vitalsRecords: [],
  medications: [],
  shifts: [],
  selectedVital: null,
  selectedVitalsRecord: null, // ✅ Added
  selectedMedication: null,
  selectedShift: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    patientId: "",
    dateRange: "",
    shift: "",
    nurse: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  nursingStats: {
    totalVitals: 0,
    pendingMedications: 0,
    activeShifts: 0,
    criticalAlerts: 0,
  },
}

export const nursingSlice = createSlice({
  name: "nursing",
  initialState,
  reducers: {
    setSelectedVital: (state, action) => {
      state.selectedVital = action.payload
    },
    setSelectedVitalsRecord: (state, action) => {
      state.selectedVitalsRecord = action.payload
    },
    setSelectedMedication: (state, action) => {
      state.selectedMedication = action.payload
    },
    setSelectedShift: (state, action) => {
      state.selectedShift = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    updateNursingStats: (state) => {
      const stats = {
        totalVitals: state.vitals.length,
        pendingMedications: state.medications.filter((m) => m.status === "Pending").length,
        activeShifts: state.shifts.filter((s) => s.status === "Active").length,
        criticalAlerts: state.vitals.filter((v) => v.alertLevel === "Critical").length,
      }
      state.nursingStats = stats
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Vitals
      .addCase(fetchVitals.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchVitals.fulfilled, (state, action) => {
        state.loading = false
        state.vitals = action.payload.data
        state.pagination.total = action.payload.total
      })
      .addCase(fetchVitals.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createVitals.fulfilled, (state, action) => {
        state.vitals.unshift(action.payload)
      })
      .addCase(updateVitals.fulfilled, (state, action) => {
        const index = state.vitals.findIndex((v) => v.id === action.payload.id)
        if (index !== -1) {
          state.vitals[index] = action.payload
        }
      })

      // Medications
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.medications = action.payload.data
      })
      .addCase(createMedication.fulfilled, (state, action) => {
        state.medications.push(action.payload)
      })
      .addCase(administerMedication.fulfilled, (state, action) => {
        const index = state.medications.findIndex((m) => m.id === action.payload.id)
        if (index !== -1) {
          state.medications[index] = action.payload
        }
      })

      // Shifts
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.shifts = action.payload.data
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.shifts.push(action.payload)
      })

      // ✅ Vitals Records
      .addCase(fetchVitalsRecords.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchVitalsRecords.fulfilled, (state, action) => {
        state.loading = false
        state.vitalsRecords = action.payload.data
        state.pagination.total = action.payload.total
      })
      .addCase(fetchVitalsRecords.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createVitalsRecord.fulfilled, (state, action) => {
        state.vitalsRecords.unshift(action.payload)
      })
      .addCase(deleteVitalsRecord.fulfilled, (state, action) => {
        state.vitalsRecords = state.vitalsRecords.filter((r) => r.id !== action.meta.arg)
      })
  },
})

export const {
  setSelectedVital,
  setSelectedVitalsRecord, // ✅ Exported
  setSelectedMedication,
  setSelectedShift,
  setFilters,
  setPagination,
  updateNursingStats,
  clearError,
} = nursingSlice.actions

export default nursingSlice.reducer
