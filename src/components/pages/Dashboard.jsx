import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Users, Calendar, Bed, UserCheck, AlertTriangle, Activity } from "lucide-react"
import { fetchDashboardStats, fetchSpecialties, fetchRecentPatients } from "../../store/slices/dashboardSlice"

export default function Dashboard() {
  const dispatch = useDispatch()
  const { stats = {}, specialties = [], recentPatients = [] } = useSelector((state) => state.dashboard || {})

  // Dispatch thunks when the component mounts
  useEffect(() => {
    dispatch(fetchDashboardStats())
    dispatch(fetchSpecialties())
    dispatch(fetchRecentPatients())
  }, [dispatch])

  const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          {React.cloneElement(icon, { size: 24, color })}
        </div>
      </div>
    </div>
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Admitted":
        return "bg-blue-100 text-blue-800"
      case "Discharged":
        return "bg-green-100 text-green-800"
      case "Outpatient":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Dashboard</h1>
        <p className="text-gray-600">Welcome to TapMed Hospital Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<Users />} title="Total Patients" value={stats.totalPatients} color="#3B82F6" />
        <StatCard icon={<Calendar />} title="Today's Appointments" value={stats.todaysAppointments} color="#10B981" />
        <StatCard icon={<Bed />} title="Available Beds" value={stats.availableBeds} color="#8B5CF6" />
        <StatCard icon={<UserCheck />} title="Doctors On Duty" value={stats.doctorsOnDuty} color="#F59E0B" />
        <StatCard icon={<AlertTriangle />} title="Emergency Cases" value={stats.emergencyCases} color="#EF4444" />
        <StatCard icon={<Activity />} title="Surgeries Today" value={stats.surgeriesToday} color="#06B6D4" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Specialties */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Specialties</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-semibold text-gray-700">Specialty</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Doctors</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Patients</th>
                </tr>
              </thead>
              <tbody>
                {specialties.map((specialty, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-gray-900">{specialty.name}</td>
                    <td className="py-3 text-gray-600">{specialty.doctors}</td>
                    <td className="py-3 text-gray-600">{specialty.patients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Patients</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Department</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-gray-900 font-medium">{patient.id}</td>
                    <td className="py-3 text-gray-900">{patient.name}</td>
                    <td className="py-3 text-gray-600">{patient.department}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}