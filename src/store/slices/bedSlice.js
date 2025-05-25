import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  beds: [
    {
      id: "B-101",
      roomNumber: "101",
      bedNumber: "A",
      floor: "1st Floor",
      department: "Cardiology",
      type: "General",
      status: "Occupied",
      patientId: "P-1001",
      patientName: "John Smith",
      assignedDate: "2024-01-15",
    },
    {
      id: "B-102",
      roomNumber: "102",
      bedNumber: "A",
      floor: "1st Floor",
      department: "Cardiology",
      type: "General",
      status: "Available",
      patientId: null,
      patientName: null,
      assignedDate: null,
    },
  ],
  selectedBed: null,
  loading: false,
  error: null,
}

const bedSlice = createSlice({
  name: "beds",
  initialState,
  reducers: {
    assignBed: (state, action) => {
      const { bedId, patientId, patientName } = action.payload
      const bed = state.beds.find((b) => b.id === bedId)
      if (bed) {
        bed.status = "Occupied"
        bed.patientId = patientId
        bed.patientName = patientName
        bed.assignedDate = new Date().toISOString().split("T")[0]
      }
    },
    dischargeBed: (state, action) => {
      const bed = state.beds.find((b) => b.id === action.payload)
      if (bed) {
        bed.status = "Available"
        bed.patientId = null
        bed.patientName = null
        bed.assignedDate = null
      }
    },
    addBed: (state, action) => {
      state.beds.push(action.payload)
    },
    updateBed: (state, action) => {
      const index = state.beds.findIndex((b) => b.id === action.payload.id)
      if (index !== -1) {
        state.beds[index] = action.payload
      }
    },
  },
})

export const { assignBed, dischargeBed, addBed, updateBed } = bedSlice.actions
export default bedSlice.reducer
