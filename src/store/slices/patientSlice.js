import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listingHelper } from "../../modules/Patient/pages/listing/listing.helper";

const initialState = {
  patients: [
    {
      id: "P-1001",
      name: "Ahmed Khan",
      age: 50,
      gender: "Male",
      phone: "+92-300-1234567",
      email: "ahmed.khan@email.com",
      address: "House No. 12, Street 5, Gulberg, Lahore, Punjab",
      bloodGroup: "O+",
      department: "Cardiology",
      doctor: "Dr. Fatima Saeed",
      registrationDate: "2025-01-10",
      status: "Admitted",
      medicalHistory: ["Hypertension", "Coronary Artery Disease"],
    },
    {
      id: "P-1002",
      name: "Sana Malik",
      age: 28,
      gender: "Female",
      phone: "+92-321-9876543",
      email: "sana.malik@email.com",
      address: "Flat 3B, Clifton Block 2, Karachi, Sindh",
      bloodGroup: "A+",
      department: "Orthopedics",
      doctor: "Dr. Bilal Ahmed",
      registrationDate: "2025-01-12",
      status: "Discharged",
      medicalHistory: ["Fractured Femur", "Osteoarthritis"],
    },
    {
      id: "P-1003",
      name: "Imran Ali",
      age: 35,
      gender: "Male",
      phone: "+92-333-4567890",
      email: "imran.ali@email.com",
      address: "Plot 15, Sector 7, Islamabad",
      bloodGroup: "B+",
      department: "Pulmonology",
      doctor: "Dr. Ayesha Rehman",
      registrationDate: "2025-02-01",
      status: "Admitted",
      medicalHistory: ["Tuberculosis", "Asthma"],
    },
    {
      id: "P-1004",
      name: "Zainab Bibi",
      age: 42,
      gender: "Female",
      phone: "+92-301-2345678",
      email: "zainab.bibi@email.com",
      address: "Mohalla Qadirabad, Multan, Punjab",
      bloodGroup: "AB-",
      department: "Endocrinology",
      doctor: "Dr. Hassan Iqbal",
      registrationDate: "2025-02-15",
      status: "Admitted",
      medicalHistory: ["Diabetes Type 2", "Thyroid Disorder"],
    },
    {
      id: "P-1005",
      name: "Faisal Shah",
      age: 60,
      gender: "Male",
      phone: "+92-302-3456789",
      email: "faisal.shah@email.com",
      address: "House 25, Hayatabad Phase 3, Peshawar, Khyber Pakhtunkhwa",
      bloodGroup: "O-",
      department: "Gastroenterology",
      doctor: "Dr. Maria Khan",
      registrationDate: "2025-03-01",
      status: "Discharged",
      medicalHistory: ["Hepatitis C", "Gastritis"],
    },
  ],
  selectedPatient: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    gender: "",
    bloodGroup: "",
    status: "",
    sortBy: "date", 
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 5,
  },
};

// Example async thunk for fetching patients
export const fetchPatients = createAsyncThunk("patients/fetchPatients", async () => {
  // Simulate API call
  return initialState.patients; // Replace with actual API call
});

export const fetchPatientById = createAsyncThunk("patients/fetchPatientById", async (patientId) => {
  // Simulate API call
  const patient = initialState.patients.find((p) => p.id === patientId);
  if (!patient) throw new Error(`Patient with ID ${patientId} not found`);
  return patient;
});


const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload);
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload; // Add if needed
    },
    setPagination: (state, action) => {
      state.pagination = action.payload; // Add if needed
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPatient = action.payload;
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addPatient,
  updatePatient,
  deletePatient,
  setSelectedPatient,
  setLoading,
  setError,
  setFilters,
  setPagination,
  clearError,
} = patientSlice.actions;

export default patientSlice.reducer;