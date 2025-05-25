export const validateVitalsForm = (formData) => {
  const errors = {}

  // Patient validation
  if (!formData.patientId) {
    errors.patientId = "Patient selection is required"
  }

  // Nurse validation
  if (!formData.nurseId) {
    errors.nurseId = "Nurse assignment is required"
  }

  // Blood pressure validation
  if (formData.systolicBP && (isNaN(formData.systolicBP) || formData.systolicBP < 50 || formData.systolicBP > 300)) {
    errors.systolicBP = "Systolic BP must be between 50-300 mmHg"
  }

  if (
    formData.diastolicBP &&
    (isNaN(formData.diastolicBP) || formData.diastolicBP < 30 || formData.diastolicBP > 200)
  ) {
    errors.diastolicBP = "Diastolic BP must be between 30-200 mmHg"
  }

  // Heart rate validation
  if (formData.heartRate && (isNaN(formData.heartRate) || formData.heartRate < 30 || formData.heartRate > 250)) {
    errors.heartRate = "Heart rate must be between 30-250 bpm"
  }

  // Temperature validation
  if (
    formData.temperature &&
    (isNaN(formData.temperature) || formData.temperature < 90 || formData.temperature > 110)
  ) {
    errors.temperature = "Temperature must be between 90-110°F"
  }

  // Respiratory rate validation
  if (
    formData.respiratoryRate &&
    (isNaN(formData.respiratoryRate) || formData.respiratoryRate < 5 || formData.respiratoryRate > 60)
  ) {
    errors.respiratoryRate = "Respiratory rate must be between 5-60 breaths/min"
  }

  // Oxygen saturation validation
  if (
    formData.oxygenSaturation &&
    (isNaN(formData.oxygenSaturation) || formData.oxygenSaturation < 70 || formData.oxygenSaturation > 100)
  ) {
    errors.oxygenSaturation = "Oxygen saturation must be between 70-100%"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateVitalsForm(tempData)
  return errors[name] || null
}
