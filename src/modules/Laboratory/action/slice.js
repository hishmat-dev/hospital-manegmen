import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { laboratoryService } from "../services/laboratoryService"

export const fetchLabTests = createAsyncThunk("laboratory/fetchLabTests", async (params) => {
  return await laboratoryService.getAll(params)
})

export const createLabTest = createAsyncThunk("laboratory/createLabTest", async (labTestData) => {
  return await laboratoryService.create(labTestData)
})

export const updateLabTest = createAsyncThunk("laboratory/updateLabTest", async ({ id, data }) => {
  return await laboratoryService.update(id, data)
})

export const deleteLabTest = createAsyncThunk("laboratory/deleteLabTest", async (id) => {
  await laboratoryService.delete(id)
  return id
})

export const updateTestResults = createAsyncThunk("laboratory/updateTestResults", async ({ id, results }) => {
  return await laboratoryService.updateResults(id, results)
})

const initialState = {
  labTests: [],
  selectedTest: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    testType: "",
    priority: "",
    dateRange: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  testStats: {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  },
}

export const laboratorySlice = createSlice({
  name: "laboratory",
  initialState,
  reducers: {
    setSelectedTest: (state, action) => {
      state.selectedTest = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    updateTestStats: (state) => {
      const stats = {
        total: state.labTests.length,
        pending: state.labTests.filter((test) => test.status === "Pending").length,
        inProgress: state.labTests.filter((test) => test.status === "In Progress").length,
        completed: state.labTests.filter((test) => test.status === "Completed").length,
        cancelled: state.labTests.filter((test) => test.status === "Cancelled").length,
      }
      state.testStats = stats
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabTests.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLabTests.fulfilled, (state, action) => {
        state.loading = false
        state.labTests = action.payload.data
        state.pagination.total = action.payload.total
      })
      .addCase(fetchLabTests.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createLabTest.fulfilled, (state, action) => {
        state.labTests.push(action.payload)
      })
      .addCase(updateLabTest.fulfilled, (state, action) => {
        const index = state.labTests.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.labTests[index] = action.payload
        }
      })
      .addCase(deleteLabTest.fulfilled, (state, action) => {
        state.labTests = state.labTests.filter((t) => t.id !== action.payload)
      })
      .addCase(updateTestResults.fulfilled, (state, action) => {
        const index = state.labTests.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.labTests[index] = action.payload
        }
      })
  },
})

export const { setSelectedTest, setFilters, setPagination, updateTestStats, clearError } = laboratorySlice.actions
export default laboratorySlice.reducer
