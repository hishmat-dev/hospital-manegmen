import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { bedService } from "../services/bedService"

export const fetchBeds = createAsyncThunk("beds/fetchBeds", async (params) => {
  return await bedService.getAll(params)
})

export const createBed = createAsyncThunk("beds/createBed", async (bedData) => {
  return await bedService.create(bedData)
})

export const updateBed = createAsyncThunk("beds/updateBed", async ({ id, data }) => {
  return await bedService.update(id, data)
})

export const deleteBed = createAsyncThunk("beds/deleteBed", async (id) => {
  await bedService.delete(id)
  return id
})

export const assignBed = createAsyncThunk("beds/assignBed", async ({ bedId, patientId, patientName }) => {
  await bedService.assignBed(bedId, patientId)
  return { bedId, patientId, patientName }
})

export const dischargeBed = createAsyncThunk("beds/dischargeBed", async (bedId) => {
  await bedService.dischargeBed(bedId)
  return bedId
})

const initialState = {
  beds:[{
      id: "B-201",
      roomNumber: "201",
      bedNumber: "A",
      floor: "2nd Floor",
      department: "Cardiology",
      type: "ICU",
      status: "Occupied",
      patientId: "P-2001",
      patientName: "Ahmed Khan",
      assignedDate: "2025-05-20",
    },
    {
      id: "B-202",
      roomNumber: "202",
      bedNumber: "B",
      floor: "2nd Floor",
      department: "Neurology",
      type: "General",
      status: "Available",
      patientId: null,
      patientName: null,
      assignedDate: null,
    },
    {
      id: "B-301",
      roomNumber: "301",
      bedNumber: "A",
      floor: "3rd Floor",
      department: "Orthopedics",
      type: "General",
      status: "Occupied",
      patientId: "P-2002",
      patientName: "Fatima Siddiqui",
      assignedDate: "2025-05-22",
    },
    {
      id: "B-401",
      roomNumber: "401",
      bedNumber: "C",
      floor: "4th Floor",
      department: "Pediatrics",
      type: "Pediatric",
      status: "Available",
      patientId: null,
      patientName: null,
      assignedDate: null,
    },
    {
      id: "B-502",
      roomNumber: "502",
      bedNumber: "A",
      floor: "5th Floor",
      department: "Surgery",
      type: "Post-Op",
      status: "Occupied",
      patientId: "P-2003",
      patientName: "Hassan Raza",
      assignedDate: "2025-05-24",
    },
  ],
  selectedBed: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    department: "",
    floor: "",
    type: "",
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  occupancyStats: {
    total: 0,
    occupied: 0,
    available: 0,
    maintenance: 0,
    reserved: 0,
  },
}

export const bedSlice = createSlice({
  name: "beds",
  initialState,
  reducers: {
    setSelectedBed: (state, action) => {
      state.selectedBed = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    updateOccupancyStats: (state) => {
      const stats = {
        total: state.beds.length,
        occupied: state.beds.filter((bed) => bed.status === "Occupied").length,
        available: state.beds.filter((bed) => bed.status === "Available").length,
        maintenance: state.beds.filter((bed) => bed.status === "Maintenance").length,
        reserved: state.beds.filter((bed) => bed.status === "Reserved").length,
      }
      state.occupancyStats = stats
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeds.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBeds.fulfilled, (state, action) => {
        state.loading = false
        state.beds = action.payload.data
        state.pagination.total = action.payload.total
      })
      .addCase(fetchBeds.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createBed.fulfilled, (state, action) => {
        state.beds.push(action.payload)
      })
      .addCase(updateBed.fulfilled, (state, action) => {
        const index = state.beds.findIndex((b) => b.id === action.payload.id)
        if (index !== -1) {
          state.beds[index] = action.payload
        }
      })
      .addCase(deleteBed.fulfilled, (state, action) => {
        state.beds = state.beds.filter((b) => b.id !== action.payload)
      })
      .addCase(assignBed.fulfilled, (state, action) => {
        const { bedId, patientId, patientName } = action.payload
        const bed = state.beds.find((b) => b.id === bedId)
        if (bed) {
          bed.status = "Occupied"
          bed.patientId = patientId
          bed.patientName = patientName
          bed.assignedDate = new Date().toISOString().split("T")[0]
        }
      })
      .addCase(dischargeBed.fulfilled, (state, action) => {
        const bed = state.beds.find((b) => b.id === action.payload)
        if (bed) {
          bed.status = "Available"
          bed.patientId = null
          bed.patientName = null
          bed.assignedDate = null
        }
      })
  },
})

export const { setSelectedBed, setFilters, setPagination, updateOccupancyStats, clearError } = bedSlice.actions
export default bedSlice.reducer
