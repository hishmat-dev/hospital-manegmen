export const listingHelper = {
  getTriageColor: (triageLevel) => {
    switch (triageLevel) {
      case "1":
        return "bg-red-100 text-red-800"
      case "2":
        return "bg-orange-100 text-orange-800"
      case "3":
        return "bg-yellow-100 text-yellow-800"
      case "4":
        return "bg-green-100 text-green-800"
      case "5":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  getSeverityColor: (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  exportToCSV: (emergencyCases) => {
    const headers = [
      "ID",
      "Patient",
      "Age",
      "Triage Level",
      "Severity",
      "Complaint",
      "Status",
      "Arrival Time",
      "Wait Time",
      "Assigned Doctor",
    ]
    const csvContent = [
      headers.join(","),
      ...emergencyCases.map((case_) =>
        [
          case_.id,
          case_.patientName,
          case_.age,
          case_.triageLevel,
          case_.severity,
          `"${case_.complaint}"`,
          case_.status,
          case_.arrivalTime,
          case_.waitTime || 0,
          case_.assignedDoctor || "N/A",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `emergency_cases_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },

  filterEmergencyCases: (cases, filters) => {
    return cases.filter((case_) => {
      const matchesSearch =
        !filters.search ||
        case_.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        case_.id.toLowerCase().includes(filters.search.toLowerCase())

      const matchesTriage = !filters.triageLevel || case_.triageLevel === filters.triageLevel
      const matchesSeverity = !filters.severity || case_.severity === filters.severity
      const matchesStatus = !filters.status || case_.status === filters.status

      return matchesSearch && matchesTriage && matchesSeverity && matchesStatus
    })
  },

  sortEmergencyCases: (cases, sortBy) => {
    return [...cases].sort((a, b) => {
      switch (sortBy) {
        case "triage":
          return Number.parseInt(a.triageLevel) - Number.parseInt(b.triageLevel)
        case "severity":
          const severityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
          return severityOrder[a.severity] - severityOrder[b.severity]
        case "wait":
          return (b.waitTime || 0) - (a.waitTime || 0)
        case "arrival":
        default:
          return new Date(a.arrivalTime) - new Date(b.arrivalTime)
      }
    })
  },
}
