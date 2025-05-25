

import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchPatients, deletePatient, setSelectedPatient, setFilters } from "../../action/slice"
import { listingHelper } from "./listing.helper"

export const usePatientListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { patients, loading, filters, pagination } = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(fetchPatients({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (patient) => {
      dispatch(setSelectedPatient(patient))
      navigate(`/patients/detail/${patient.id}`)
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (patient) => {
      dispatch(setSelectedPatient(patient))
      navigate(`/patients/update/${patient.id}`)
    },
    [dispatch, navigate],
  )

  const handleDelete = useCallback(
    async (patientId) => {
      if (window.confirm("Are you sure you want to delete this patient?")) {
        await dispatch(deletePatient(patientId))
      }
    },
    [dispatch],
  )

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(patients)
  }, [patients])

  const handleAddNew = useCallback(() => {
    navigate("/patients/create")
  }, [navigate])

  return {
    patients,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
  }
}
