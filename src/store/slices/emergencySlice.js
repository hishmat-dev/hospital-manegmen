import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  emergencyCases: [
    {
      id: "E-001",
      patientName: "Michael Davis",
      age: 35,
      gender: "Male",
      complaint: "Chest Pain",
      severity: "High",
      arrivalTime: "2024-01-20T08:30:00",
      triageLevel: "Level 1",
      assignedDoctor: "Dr. Sarah Wilson",
      status: "In Treatment",
    },
    {
      id: "E-002",
      patientName: "Lisa Anderson",
      age: 28,
      gender: "Female",
      complaint: "Severe Headache",
      severity: "Medium",
      arrivalTime: "2024-01-20T09:15:00",
      triageLevel: "Level 2",
      assignedDoctor: "Dr. James Miller",
      status: "Waiting",
    },
  ],
  selectedCase: null,
  loading: false,
  error: null,
}

const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {
    addEmergencyCase: (state, action) => {
      state.emergencyCases.push(action.payload)
    },
    updateEmergencyCase: (state, action) => {
      const index = state.emergencyCases.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.emergencyCases[index] = action.payload
      }
    },
    setSelectedCase: (state, action) => {
      state.selectedCase = action.payload
    },
  },
})

export const { addEmergencyCase, updateEmergencyCase, setSelectedCase } = emergencySlice.actions
export default emergencySlice.reducer
