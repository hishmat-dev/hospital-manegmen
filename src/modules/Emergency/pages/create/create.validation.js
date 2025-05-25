export const validateEmergencyForm = (formData) => {
  const errors = {}

  // Patient name validation
  if (!formData.patientName?.trim()) {
    errors.patientName = "Patient name is required"
  } else if (formData.patientName.length < 2) {
    errors.patientName = "Name must be at least 2 characters"
  }

  // Age validation
  if (!formData.age) {
    errors.age = "Age is required"
  } else if (formData.age < 0 || formData.age > 150) {
    errors.age = "Age must be between 0 and 150"
  }

  // Gender validation
  if (!formData.gender) {
    errors.gender = "Gender is required"
  }

  // Complaint validation
  if (!formData.complaint?.trim()) {
    errors.complaint = "Chief complaint is required"
  } else if (formData.complaint.length < 10) {
    errors.complaint = "Please provide more detailed complaint (minimum 10 characters)"
  }

  // Severity validation
  if (!formData.severity) {
    errors.severity = "Severity level is required"
  }

  // Triage level validation
  if (!formData.triageLevel) {
    errors.triageLevel = "Triage level is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateEmergencyForm(tempData)
  return errors[name] || null
}
