

import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createVitalsRecord } from "../../action/slice"
import { validateVitalsForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const useNursingCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { patients } = useSelector((state) => state.patients)

  const [formData, setFormData] = useState(createConfig.initialFormData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      // Real-time validation
      const fieldError = validateField(name, value, formData)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }))
    },
    [formData],
  )

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      const { errors: validationErrors, isValid } = validateVitalsForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const selectedPatient = patients.find((p) => p.id === formData.patientId)

        const vitalsData = {
          ...formData,
          id: `VIT-${Date.now()}`,
          patientName: selectedPatient?.name || "",
          recordDate: new Date().toISOString().split("T")[0],
          recordTime: new Date().toLocaleTimeString(),
          createdAt: new Date().toISOString(),
        }

        await dispatch(createVitalsRecord(vitalsData)).unwrap()
        navigate("/nursing/vitals")
      } catch (error) {
        console.error("Error creating vitals record:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate, patients],
  )

  const handleCancel = useCallback(() => {
    navigate("/nursing/vitals")
  }, [navigate])

  const { isValid } = validateVitalsForm(formData)

  return {
    formData,
    errors,
    loading,
    patients,
    painLevels: createConfig.painLevels,
    alertLevels: createConfig.alertLevels,
    isValid,
    handleChange,
    handleSubmit,
    handleCancel,
  }
}
