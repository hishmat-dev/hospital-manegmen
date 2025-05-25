export const listingConfig = {
  alertLevels: ["Normal", "Warning", "Critical"],

  painLevels: Array.from({ length: 11 }, (_, i) => i),

  sortOptions: [
    { value: "date", label: "Sort by Date" },
    { value: "patient", label: "Sort by Patient" },
    { value: "alert", label: "Sort by Alert Level" },
    { value: "nurse", label: "Sort by Nurse" },
  ],

  pagination: {
    defaultLimit: 15,
    limitOptions: [15, 30, 50, 100],
  },
}
