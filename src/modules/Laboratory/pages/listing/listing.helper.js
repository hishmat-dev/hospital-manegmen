export const listingHelper = {
  getStatusColor: (status) => {
    switch (status) {
      case "Ordered":
        return "bg-blue-100 text-blue-800"
      case "Sample Collected":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Pending Review":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  getPriorityColor: (priority) => {
    switch (priority) {
      case "STAT":
        return "bg-red-100 text-red-800"
      case "Urgent":
        return "bg-orange-100 text-orange-800"
      case "Normal":
        return "bg-blue-100 text-blue-800"
      case "Routine":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  exportToCSV: (labTests) => {
    const headers = [
      "ID",
      "Patient",
      "Doctor",
      "Category",
      "Test Type",
      "Priority",
      "Status",
      "Order Date",
      "Expected Date",
      "Sample Type",
    ]
    const csvContent = [
      headers.join(","),
      ...labTests.map((test) =>
        [
          test.id,
          test.patientName,
          test.doctorName,
          test.category,
          test.testType,
          test.priority,
          test.status,
          test.orderDate,
          test.expectedDate || "N/A",
          test.sampleType,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lab_tests_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },

  filterLabTests: (labTests, filters) => {
    return labTests.filter((test) => {
      const matchesSearch =
        !filters.search ||
        test.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        test.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        test.testType.toLowerCase().includes(filters.search.toLowerCase())

      const matchesStatus = !filters.status || test.status === filters.status
      const matchesCategory = !filters.category || test.category === filters.category
      const matchesPriority = !filters.priority || test.priority === filters.priority

      return matchesSearch && matchesStatus && matchesCategory && matchesPriority
    })
  },

  sortLabTests: (labTests, sortBy) => {
    return [...labTests].sort((a, b) => {
      switch (sortBy) {
        case "patient":
          return a.patientName.localeCompare(b.patientName)
        case "priority":
          const priorityOrder = { STAT: 0, Urgent: 1, Normal: 2, Routine: 3 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "status":
          return a.status.localeCompare(b.status)
        case "date":
        default:
          return new Date(b.orderDate) - new Date(a.orderDate)
      }
    })
  },
}
