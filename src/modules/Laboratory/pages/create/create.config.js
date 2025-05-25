export const createConfig = {
  initialFormData: {
    patientId: "",
    doctorId: "",
    category: "",
    testType: "",
    priority: "Normal",
    sampleType: "",
    instructions: "",
    clinicalHistory: "",
    expectedDate: "",
    notes: "",
  },

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

  testTypes: {
    Hematology: ["Complete Blood Count", "ESR", "Hemoglobin", "Platelet Count", "Blood Smear"],
    Biochemistry: ["Liver Function", "Kidney Function", "Lipid Profile", "Blood Sugar", "Electrolytes"],
    Microbiology: ["Blood Culture", "Urine Culture", "Stool Culture", "Throat Swab", "Wound Culture"],
    Immunology: ["HIV Test", "Hepatitis Panel", "Thyroid Function", "Autoimmune Panel", "Allergy Test"],
    Pathology: ["Biopsy", "Cytology", "Histopathology", "Fine Needle Aspiration", "Frozen Section"],
    Radiology: ["X-Ray", "CT Scan", "MRI", "Ultrasound", "Mammography"],
    Cardiology: ["ECG", "Echo", "Stress Test", "Holter Monitor", "Cardiac Enzymes"],
    Endocrinology: ["Diabetes Panel", "Hormone Levels", "Insulin Test", "Growth Hormone", "Cortisol"],
  },

  priorities: ["Normal", "Urgent", "STAT", "Routine"],

  sampleTypes: ["Blood", "Urine", "Stool", "Saliva", "Tissue", "Swab", "CSF", "Pleural Fluid"],
}
