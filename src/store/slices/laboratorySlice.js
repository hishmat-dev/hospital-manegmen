import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  labTests: [
    {
      id: "L-001",
      patientId: "P-1001",
      patientName: "John Smith",
      testName: "Complete Blood Count",
      testType: "Blood Test",
      orderedBy: "Dr. Sarah Wilson",
      orderDate: "2024-01-18",
      status: "Completed",
      results: "Normal",
      reportDate: "2024-01-19",
    },
    {
      id: "L-002",
      patientId: "P-1002",
      patientName: "Emma Johnson",
      testName: "X-Ray Chest",
      testType: "Radiology",
      orderedBy: "Dr. Michael Brown",
      orderDate: "2024-01-19",
      status: "Pending",
      results: null,
      reportDate: null,
    },
  ],
  selectedTest: null,
  loading: false,
  error: null,
}

const laboratorySlice = createSlice({
  name: "laboratory",
  initialState,
  reducers: {
    addLabTest: (state, action) => {
      state.labTests.push(action.payload)
    },
    updateLabTest: (state, action) => {
      const index = state.labTests.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.labTests[index] = action.payload
      }
    },
    setSelectedTest: (state, action) => {
      state.selectedTest = action.payload
    },
  },
})

export const { addLabTest, updateLabTest, setSelectedTest } = laboratorySlice.actions
export default laboratorySlice.reducer
