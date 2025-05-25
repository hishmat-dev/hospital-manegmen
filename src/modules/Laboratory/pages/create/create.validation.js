export const validateLabTestForm = (formData) => {
  const errors = {}

  // Patient validation
  if (!formData.patientId) {
    errors.patientId = "Patient selection is required"
  }

  // Doctor validation
  if (!formData.doctorId) {
    errors.doctorId = "Ordering doctor is required"
  }

  // Test category validation
  if (!formData.category) {
    errors.category = "Test category is required"
  }

  // Test type validation
  if (!formData.testType) {
    errors.testType = "Test type is required"
  }

  // Priority validation
  if (!formData.priority) {
    errors.priority = "Priority level is required"
  }

  // Sample type validation
  if (!formData.sampleType) {
    errors.sampleType = "Sample type is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateLabTestForm(tempData)
  return errors[name] || null
}
