export default function PersonalInfo({ patient }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg text-gray-900 mb-4 font-bold">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-bold ">Full Name</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.name || "N/A"}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold ">Patient ID</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.id || "N/A"}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold ">Date of Birth</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.dateOfBirth || "N/A"}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold ">Age</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.age || "N/A"}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold ">Gender</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.gender || "N/A"}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-bold ">Blood Type</label>
          <p className="mt-1 text-sm text-gray-900">{patient?.bloodType || "N/A"}</p>
        </div>
      </div>
    </div>
  )
}
