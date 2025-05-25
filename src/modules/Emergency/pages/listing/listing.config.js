export const listingConfig = {
  severityLevels: ["Critical", "High", "Medium", "Low"],

  triageLevels: ["1", "2", "3", "4", "5"],

  statuses: ["Waiting", "In Treatment", "Discharged", "Admitted", "Transferred"],

  sortOptions: [
    { value: "triage", label: "Sort by Triage Level" },
    { value: "arrival", label: "Sort by Arrival Time" },
    { value: "severity", label: "Sort by Severity" },
    { value: "wait", label: "Sort by Wait Time" },
  ],

  pagination: {
    defaultLimit: 15,
    limitOptions: [15, 30, 50, 100],
  },
}
