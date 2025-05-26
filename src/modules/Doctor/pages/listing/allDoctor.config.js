export const listingConfig = {
  bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  genderOptions: ["Male", "Female", "Other"],
  statusOptions: ["Admitted", "Discharged"],
  departments: ["Cardiology", "Neurology", "Pediatrics"], // Added
  sortOptions: [
    { value: "name", label: "Sort by Name" },
    { value: "admissionDate", label: "Sort by Admission Date" }, // Aligned with FilterBar
    { value: "age", label: "Sort by Age" },
    { value: "status", label: "Sort by Status" },
  ],
  pagination: {
    defaultLimit: 10,
    limitOptions: [10, 25, 50, 100],
  },
};