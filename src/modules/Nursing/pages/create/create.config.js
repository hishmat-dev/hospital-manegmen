export const createConfig = {
  initialFormData: {
    patientId: "",
    nurseId: "",
    systolicBP: "",
    diastolicBP: "",
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    painLevel: "",
    weight: "",
    height: "",
    bloodSugar: "",
    notes: "",
    alertLevel: "Normal",
  },

  painLevels: Array.from({ length: 11 }, (_, i) => i),

  alertLevels: ["Normal", "Warning", "Critical"],

  temperatureUnits: ["°F", "°C"],

  weightUnits: ["lbs", "kg"],

  heightUnits: ["ft/in", "cm"],
}
