import FilterBar from "./components/FilterBar"
import ListItem from "./components/ListItem"
import { useDoctorListing } from "./allDoctor.hooks"
import { listingConfig } from "./allDoctor.config"

export default function AllDoctor() {
  const {
    doctors,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
    getStatusColor,
  } = useDoctorListing()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Management</h1>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        departments={listingConfig.departments}
        statusOptions={listingConfig.statusOptions}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <ListItem
                  key={doctor.id}
                  doctor={doctor}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  getStatusColor={getStatusColor}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {doctors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No doctors found</div>
          <div className="text-gray-500">Try adjusting your search criteria</div>
        </div>
      )}

      {pagination.total > pagination.limit && (
        <div className="flex justify-between items-center bg-white px-6 py-3 rounded-lg shadow-md">
          <div className="text-sm text-gray-700">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button
              disabled={pagination.page === 1}
              onClick={() => handleFilterChange("page", pagination.page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={pagination.page * pagination.limit >= pagination.total}
              onClick={() => handleFilterChange("page", pagination.page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}