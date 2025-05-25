export const createConfig = {
  initialFormData: {
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    complaint: "",
    severity: "",
    triageLevel: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    painLevel: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
    symptoms: "",
    notes: "",
  },

  severityLevels: ["Critical", "High", "Medium", "Low"],

  triageLevels: [
    { value: "1", label: "Level 1 - Resuscitation", color: "red" },
    { value: "2", label: "Level 2 - Emergency", color: "orange" },
    { value: "3", label: "Level 3 - Urgent", color: "yellow" },
    { value: "4", label: "Level 4 - Semi-urgent", color: "green" },
    { value: "5", label: "Level 5 - Non-urgent", color: "blue" },
  ],

  genderOptions: ["Male", "Female", "Other"],

  painLevels: Array.from({ length: 11 }, (_, i) => i),
}
