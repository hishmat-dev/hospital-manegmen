import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchDoctors, deleteDoctor, setSelectedDoctor, setFilters } from "../../action/slice"
import { listingHelper } from "./allDoctor.helper"

export const useDoctorListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { doctors, loading, filters, pagination } = useSelector((state) => state.doctors)

  useEffect(() => {
    dispatch(fetchDoctors({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Inactive":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, [])

  const handleView = useCallback(
    (doctor) => {
      dispatch(setSelectedDoctor(doctor))
      navigate(`/doctors/detail/${doctor.id}`)
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (doctor) => {
      dispatch(setSelectedDoctor(doctor))
      navigate(`/doctors/update/${doctor.id}`)
    },
    [dispatch, navigate],
  )

  const handleDelete = useCallback(
    async (doctorId) => {
      if (window.confirm("Are you sure you want to delete this doctor?")) {
        await dispatch(deleteDoctor(doctorId))
      }
    },
    [dispatch],
  )

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(doctors)
  }, [doctors])

  const handleAddNew = useCallback(() => {
    navigate("/doctors/create")
  }, [navigate])

  return {
    doctors,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    getStatusColor,
    handleExport,
    handleAddNew,
  }
}