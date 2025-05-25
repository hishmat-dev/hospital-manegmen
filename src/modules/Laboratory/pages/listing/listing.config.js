export const listingConfig = {
  categories: [
    "Hematology",
    "Biochemistry",
    "Microbiology",
    "Immunology",
    "Pathology",
    "Radiology",
    "Cardiology",
    "Endocrinology",
  ],

  statuses: ["Ordered", "Sample Collected", "In Progress", "Completed", "Cancelled", "Pending Review"],

  priorities: ["Normal", "Urgent", "STAT", "Routine"],

  sortOptions: [
    { value: "date", label: "Sort by Order Date" },
    { value: "patient", label: "Sort by Patient" },
    { value: "priority", label: "Sort by Priority" },
    { value: "status", label: "Sort by Status" },
  ],

  pagination: {
    defaultLimit: 10,
    limitOptions: [10, 25, 50, 100],
  },
}
