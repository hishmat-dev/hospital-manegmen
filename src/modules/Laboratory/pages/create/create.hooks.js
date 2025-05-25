

import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createLabTest } from "../../action/slice"
import { validateLabTestForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const useLaboratoryCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { patients } = useSelector((state) => state.patients)
  const { doctors } = useSelector((state) => state.doctors)

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

      const { errors: validationErrors, isValid } = validateLabTestForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const selectedPatient = patients.find((p) => p.id === formData.patientId)
        const selectedDoctor = doctors.find((d) => d.id === formData.doctorId)

        const labTestData = {
          ...formData,
          id: `LAB-${Date.now()}`,
          patientName: selectedPatient?.name || "",
          doctorName: selectedDoctor?.name || "",
          status: "Ordered",
          orderDate: new Date().toISOString().split("T")[0],
          createdAt: new Date().toISOString(),
        }

        await dispatch(createLabTest(labTestData)).unwrap()
        navigate("/laboratory/list")
      } catch (error) {
        console.error("Error creating lab test:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate, patients, doctors],
  )

  const handleCancel = useCallback(() => {
    navigate("/laboratory/list")
  }, [navigate])

  const { isValid } = validateLabTestForm(formData)

  return {
    formData,
    errors,
    loading,
    patients,
    doctors,
    categories: createConfig.categories,
    testTypes: createConfig.testTypes,
    priorities: createConfig.priorities,
    sampleTypes: createConfig.sampleTypes,
    isValid,
    handleChange,
    handleSubmit,
    handleCancel,
  }
}
