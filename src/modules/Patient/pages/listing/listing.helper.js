export const listingHelper = {
  exportToCSV: (patients) => {
    const headers = ["ID", "Name", "Age", "Gender", "Phone", "Email", "Blood Group", "Registration Date", "Status"]
    const csvContent = [
      headers.join(","),
      ...patients.map((patient) =>
        [
          patient.id,
          patient.name,
          patient.age || "N/A",
          patient.gender,
          patient.phone,
          patient.email,
          patient.bloodGroup,
          patient.registrationDate,
          patient.status,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `patients_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },

  filterPatients: (patients, filters) => {
    return patients.filter((patient) => {
      const matchesSearch =
        !filters.search ||
        patient.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        patient.id.toLowerCase().includes(filters.search.toLowerCase())

      const matchesGender = !filters.gender || patient.gender === filters.gender
      const matchesBloodGroup = !filters.bloodGroup || patient.bloodGroup === filters.bloodGroup
      const matchesStatus = !filters.status || patient.status === filters.status

      return matchesSearch && matchesGender && matchesBloodGroup && matchesStatus
    })
  },

  sortPatients: (patients, sortBy) => {
    return [...patients].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "age":
          return (a.age || 0) - (b.age || 0)
        case "status":
          return a.status.localeCompare(b.status)
        case "date":
        default:
          return new Date(b.registrationDate) - new Date(a.registrationDate)
      }
    })
  },
}
