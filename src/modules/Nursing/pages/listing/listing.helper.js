export const listingHelper = {
  getAlertColor: (alertLevel) => {
    switch (alertLevel) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "Warning":
        return "bg-yellow-100 text-yellow-800"
      case "Normal":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  exportToCSV: (vitalsRecords) => {
    const headers = [
      "ID",
      "Patient",
      "Date",
      "Time",
      "BP (Systolic/Diastolic)",
      "Heart Rate",
      "Temperature",
      "Respiratory Rate",
      "Oxygen Saturation",
      "Pain Level",
      "Alert Level",
      "Nurse",
    ]
    const csvContent = [
      headers.join(","),
      ...vitalsRecords.map((record) =>
        [
          record.id,
          record.patientName,
          record.recordDate,
          record.recordTime,
          `${record.systolicBP || "N/A"}/${record.diastolicBP || "N/A"}`,
          record.heartRate || "N/A",
          record.temperature || "N/A",
          record.respiratoryRate || "N/A",
          record.oxygenSaturation || "N/A",
          record.painLevel || "N/A",
          record.alertLevel,
          record.nurseId || "N/A",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vitals_records_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },

  filterVitalsRecords: (records, filters) => {
    return records.filter((record) => {
      const matchesSearch =
        !filters.search ||
        record.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        record.id.toLowerCase().includes(filters.search.toLowerCase())

      const matchesAlert = !filters.alertLevel || record.alertLevel === filters.alertLevel
      const matchesDate = !filters.date || record.recordDate === filters.date

      return matchesSearch && matchesAlert && matchesDate
    })
  },

  sortVitalsRecords: (records, sortBy) => {
    return [...records].sort((a, b) => {
      switch (sortBy) {
        case "patient":
          return a.patientName.localeCompare(b.patientName)
        case "alert":
          const alertOrder = { Critical: 0, Warning: 1, Normal: 2 }
          return alertOrder[a.alertLevel] - alertOrder[b.alertLevel]
        case "nurse":
          return (a.nurseId || "").localeCompare(b.nurseId || "")
        case "date":
        default:
          const dateA = new Date(`${a.recordDate} ${a.recordTime}`)
          const dateB = new Date(`${b.recordDate} ${b.recordTime}`)
          return dateB - dateA
      }
    })
  },
}
