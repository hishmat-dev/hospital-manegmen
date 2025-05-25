import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  vitals: [
    {
      id: "V-001",
      patientId: "P-1001",
      patientName: "John Smith",
      temperature: "98.6°F",
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      recordedBy: "Nurse Mary Johnson",
      recordedAt: "2024-01-20T10:00:00",
    },
  ],
  medications: [
    {
      id: "M-001",
      patientId: "P-1001",
      patientName: "John Smith",
      medicationName: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2024-01-15",
      endDate: "2024-01-25",
      administeredBy: "Nurse Mary Johnson",
      status: "Active",
    },
  ],
  shifts: [
    {
      id: "S-001",
      nurseName: "Mary Johnson",
      shift: "Day Shift",
      startTime: "07:00",
      endTime: "19:00",
      date: "2024-01-20",
      patientsAssigned: ["P-1001", "P-1002"],
      notes: "All patients stable",
    },
  ],
  selectedVital: null,
  selectedMedication: null,
  selectedShift: null,
}

const nursingSlice = createSlice({
  name: "nursing",
  initialState,
  reducers: {
    addVital: (state, action) => {
      state.vitals.push(action.payload)
    },
    addMedication: (state, action) => {
      state.medications.push(action.payload)
    },
    addShift: (state, action) => {
      state.shifts.push(action.payload)
    },
    updateVital: (state, action) => {
      const index = state.vitals.findIndex((v) => v.id === action.payload.id)
      if (index !== -1) {
        state.vitals[index] = action.payload
      }
    },
    updateMedication: (state, action) => {
      const index = state.medications.findIndex((m) => m.id === action.payload.id)
      if (index !== -1) {
        state.medications[index] = action.payload
      }
    },
    setSelectedVital: (state, action) => {
      state.selectedVital = action.payload
    },
    setSelectedMedication: (state, action) => {
      state.selectedMedication = action.payload
    },
    setSelectedShift: (state, action) => {
      state.selectedShift = action.payload
    },
  },
})

export const {
  addVital,
  addMedication,
  addShift,
  updateVital,
  updateMedication,
  setSelectedVital,
  setSelectedMedication,
  setSelectedShift,
} = nursingSlice.actions

export default nursingSlice.reducer
