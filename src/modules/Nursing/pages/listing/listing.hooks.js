

import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchVitals,            // ✅ Corrected
  setSelectedVital,       // ✅ Corrected
  setFilters,             // ✅ Already exists
} from "../../action/slice"
import { listingHelper } from "./listing.helper"

export const useNursingListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { vitals, loading, filters, pagination } = useSelector((state) => state.nursing)

  useEffect(() => {
    dispatch(fetchVitals({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (vital) => {
      dispatch(setSelectedVital(vital))
      navigate("/nursing/details")
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (vital) => {
      dispatch(setSelectedVital(vital))
      navigate("/nursing/update")
    },
    [dispatch, navigate],
  )

  const handleDelete = useCallback(
    async (vitalId) => {
      if (window.confirm("Are you sure you want to delete this vitals record?")) {
        // ❌ No deleteVitalsRecord exists – you need to implement this if needed
        console.warn("Delete function not implemented.")
      }
    },
    [dispatch],
  )

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(vitals)
  }, [vitals])

  const handleAddNew = useCallback(() => {
    navigate("/nursing/record")
  }, [navigate])

  const getAlertColor = useCallback((alertLevel) => {
    return listingHelper.getAlertColor(alertLevel)
  }, [])

  return {
    vitalsRecords: vitals, // Renamed for consistency
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
    getAlertColor,
  }
}
