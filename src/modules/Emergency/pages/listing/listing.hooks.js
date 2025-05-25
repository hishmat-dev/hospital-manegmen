import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchEmergencyCases,
  deleteEmergencyCase,
  updateEmergencyCase,
  setSelectedCase,
  setFilters,
} from "../../action/slice"

import { listingHelper } from "./listing.helper"

export const useEmergencyListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { emergencyCases, loading, filters, pagination } = useSelector((state) => state.emergency)

  useEffect(() => {
    dispatch(fetchEmergencyCases({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (emergencyCase) => {
      dispatch(setSelectedCase(emergencyCase))

      navigate("/emergency/details")
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (emergencyCase) => {
      dispatch(setSelectedCase(emergencyCase))

      navigate("/emergency/update")
    },
    [dispatch, navigate]
  )

  const handleDelete = useCallback(
    async (emergencyCaseId) => {
      if (window.confirm("Are you sure you want to remove this emergency case?")) {
        await dispatch(deleteEmergencyCase(emergencyCaseId))
      }
    },
    [dispatch],
  )

  const handleStatusChange = useCallback(
    async (emergencyCaseId, newStatus) => {
      const emergencyCase = emergencyCases.find((case_) => case_.id === emergencyCaseId)
      if (emergencyCase) {
        await dispatch(
          updateEmergencyCase({
            id: emergencyCaseId,
            data: { ...emergencyCase, status: newStatus },
          }),
        )
      }
    },
    [dispatch, emergencyCases],
  )

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(emergencyCases)
  }, [emergencyCases])

  const handleAddNew = useCallback(() => {
    navigate("/emergency/register")
  }, [navigate])

  const getTriageColor = useCallback((triageLevel) => {
    return listingHelper.getTriageColor(triageLevel)
  }, [])

  const getSeverityColor = useCallback((severity) => {
    return listingHelper.getSeverityColor(severity)
  }, [])

  return {
    emergencyCases,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleExport,
    handleAddNew,
    getTriageColor,
    getSeverityColor,
  }
}
