import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchLabTests,
  deleteLabTest,
  updateLabTest,
  setSelectedTest, // ✅ changed this
  setFilters
} from "../../action/slice"
import { listingHelper } from "./listing.helper"

export const useLaboratoryListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { labTests, loading, filters, pagination } = useSelector((state) => state.laboratory)

  useEffect(() => {
    dispatch(fetchLabTests({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (labTest) => {
      dispatch(setSelectedTest(labTest)) // ✅ changed this
      navigate("/laboratory/details")
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (labTest) => {
      dispatch(setSelectedTest(labTest)) // ✅ changed this
      navigate("/laboratory/update")
    },
    [dispatch, navigate],
  )

  const handleDelete = useCallback(
    async (labTestId) => {
      if (window.confirm("Are you sure you want to cancel this lab test?")) {
        await dispatch(deleteLabTest(labTestId))
      }
    },
    [dispatch],
  )

  const handleStatusChange = useCallback(
    async (labTestId, newStatus) => {
      const labTest = labTests.find((test) => test.id === labTestId)
      if (labTest) {
        await dispatch(
          updateLabTest({
            id: labTestId,
            data: { ...labTest, status: newStatus },
          }),
        )
      }
    },
    [dispatch, labTests],
  )

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(labTests)
  }, [labTests])

  const handleAddNew = useCallback(() => {
    navigate("/laboratory/order")
  }, [navigate])

  const getStatusColor = useCallback((status) => {
    return listingHelper.getStatusColor(status)
  }, [])

  const getPriorityColor = useCallback((priority) => {
    return listingHelper.getPriorityColor(priority)
  }, [])

  return {
    labTests,
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
    getStatusColor,
    getPriorityColor,
  }
}
