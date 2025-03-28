// Medical lab test reference ranges (normal values may vary between laboratories)
export const initialMedicalRanges = [
  { 
    id: 'na', 
    name: 'Na', 
    fullName: 'Sodium',
    normalRange: '135-145',
    unit: 'mmol/L',
    min: 135,
    max: 145,
    criticalLow: 125,
    criticalHigh: 155,
  },
  { 
    id: 'k', 
    name: 'K+', 
    fullName: 'Potassium',
    normalRange: '3.5-4.5',
    unit: 'mmol/L',
    min: 3.5,
    max: 4.5,
    criticalLow: 2.5,
    criticalHigh: 6.0,
  },
  { 
    id: 'cr', 
    name: 'Creatinine', 
    fullName: 'Creatinine',
    normalRange: '65-120',
    unit: 'μmol/L',
    min: 65,
    max: 120,
    criticalLow: 30,
    criticalHigh: 300,
  },
  
  { 
    id: 'urea', 
    name: 'Urea', 
    fullName: 'Urea',
    normalRange: '2.1-8.5',
    unit: 'mmol/L',
    min: 2.1,
    max: 8.5,
    criticalLow: 1.0,
    criticalHigh: 15.0,
  },
  
  { 
    id: 'egfr', 
    name: 'eGFR', 
    fullName: 'Estimated Glomerular Filtration Rate',
    normalRange: '>90',
    unit: 'mL/min/1.73m²',
    min: 90,
    max: 200,
    criticalLow: 15,
    criticalHigh: null,
    isHigherBetter: true,
  },
  { 
    id: 'bilirubin', 
    name: 'Bilirubin', 
    fullName: 'Total Bilirubin',
    normalRange: '5-21',
    unit: 'μmol/L',
    min: 5,
    max: 21,
    criticalLow: null,
    criticalHigh: 50,
  },
   { 
    id: 'alt', 
    name: 'ALT', 
    fullName: 'Alanine Transaminase',
    normalRange: '4-36',
    unit: 'U/L',
    min: 4,
    max: 36,
    criticalLow: null,
    criticalHigh: 200,
  },
  
   { 
    id: 'alp', 
    name: 'ALP', 
    fullName: 'Alkaline Phosphatase',
    normalRange: '44-147',
    unit: 'U/L',
    min: 44,
    max: 147,
    criticalLow: null,
    criticalHigh: 500,
  },
  
  { 
    id: 'ggt', 
    name: 'GGT', 
    fullName: 'Gamma-Glutamyl Transferase',
    normalRange: '5-40',
    unit: 'U/L',
    min: 5,
    max: 40,
    criticalLow: null,
    criticalHigh: 300,
  },
  { 
    id: 'pt', 
    name: 'PT', 
    fullName: 'Prothrombin Time',
    normalRange: '11-13.5',
    unit: 'seconds',
    min: 11,
    max: 13.5,
    criticalLow: null,
    criticalHigh: 20,
  },
  // Common coagulation studies
  { 
    id: 'inr', 
    name: 'INR', 
    fullName: 'International Normalized Ratio',
    normalRange: '1-1.5',
    unit: '',
    min: 1,
    max: 1.5,
    criticalLow: null,
    criticalHigh: 5,
  },
  { 
    id: 'aptt', 
    name: 'aPTT', 
    fullName: 'Activated Partial Thromboplastin Time',
    normalRange: '21-35',
    unit: 'seconds',
    min: 21,
    max: 35,
    criticalLow: null,
    criticalHigh: 60,
  },
  
  { 
    id: 'aptt_ratio', 
    name: 'Aptt ratio', 
    fullName: 'aPTT Ratio',
    normalRange: '28-42',
    unit: '',
    min: 28,
    max: 42,
    criticalLow: null,
    criticalHigh: 60,
  },  { 
    id: 'fibrinogen', 
    name: 'Fibrinogen', 
    fullName: 'Fibrinogen',
    normalRange: '2-4',
    unit: 'g/L',
    min: 2,
    max: 4,
    criticalLow: 1,
    criticalHigh: 7,
  },
  { 
    id: 'bicarbonate', 
    name: 'Bicarbonate', 
    fullName: 'Bicarbonate',
    normalRange: '22-29',
    unit: 'mmol/L',
    min: 22,
    max: 29,
    criticalLow: 15,
    criticalHigh: 40,
  },
  { 
    id: 'chloride', 
    name: 'Chloride', 
    fullName: 'Chloride',
    normalRange: '96-106',
    unit: 'mmol/L',
    min: 96,
    max: 106,
    criticalLow: 80,
    criticalHigh: 120,
  },
  
  // Inflammatory markers
  { 
    id: 'crp', 
    name: 'CRP', 
    fullName: 'C-Reactive Protein',
    normalRange: 'Less than 5',
    unit: 'mg/L',
    min: 0,
    max: 5,
    criticalLow: null,
    criticalHigh: 200,
    colorChangeThreshold: 5, // Change color only for above 5
    mildChangeThreshold: 100, // Mild change till 100
  },
  
  // Hematology parameters
  { 
    id: 'wcc', 
    name: 'WCC', 
    fullName: 'White Cell Count',
    normalRange: '4-11',
    unit: '×10⁹/L',
    min: 4,
    max: 11,
    criticalLow: 2,
    criticalHigh: 20,
  },
  { 
    id: 'neutrophils', 
    name: 'Neutrophils', 
    fullName: 'Neutrophils',
    normalRange: '1.8-7.5',
    unit: '×10⁹/L',
    min: 1.8,
    max: 7.5,
    criticalLow: 0.5,
    criticalHigh: 15,
  },
  
    { 
    id: 'hb', 
    name: 'Hb', 
    fullName: 'Hemoglobin',
    normalRange: '120-150',
    unit: 'g/L',
    min: 120,
    max: 150,
    criticalLow: 70,
    criticalHigh: 180,
  },
  
  // Electrolytes
  { 
    id: 'mg', 
    name: 'Mg+', 
    fullName: 'Magnesium',
    normalRange: '0.8',
    unit: 'mmol/L',
    min: 0.7,
    max: 1.0,
    criticalLow: 0.5,
    criticalHigh: 1.5,
  },
  
  { 
    id: 'phosphates', 
    name: 'Ionised phosphates', 
    fullName: 'Ionised Phosphates',
    normalRange: '0.8-1.5',
    unit: 'mmol/L',
    min: 0.8,
    max: 1.5,
    criticalLow: 0.3,
    criticalHigh: 2.5,
  },
  
  { 
    id: 'calcium', 
    name: 'Corrected calcium', 
    fullName: 'Corrected Calcium',
    normalRange: '1',
    unit: 'mmol/L',
    min: 2.2,
    max: 2.6,
    criticalLow: 1.8,
    criticalHigh: 3.0,
  },
];

// Function to determine color based on value
export const determineColor = (value, test) => {
  if (value === null || value === undefined) {
    return '#e0e0e0'; // Gray for no data
  }
  
  const numValue = parseFloat(value);
  
  // Special case for CRP which has special thresholds mentioned in the image
  if (test.id === 'crp') {
    if (numValue <= test.max) return '#4caf50'; // Green - normal
    if (numValue <= test.mildChangeThreshold) return '#ff9800'; // Orange - mild elevation
    return '#f44336'; // Red - severe elevation
  }
  
  // For tests where higher values are better (like eGFR)
  if (test.isHigherBetter) {
    if (numValue >= test.min) return '#4caf50'; // Green - normal
    if (numValue >= test.criticalLow) return '#ff9800'; // Orange - mild abnormality
    return '#f44336'; // Red - critical
  }
  
  // For normal tests where values should be between min and max
  if (numValue >= test.min && numValue <= test.max) {
    return '#4caf50'; // Green - normal
  } else if ((test.criticalLow !== null && numValue < test.criticalLow) || 
             (test.criticalHigh !== null && numValue > test.criticalHigh)) {
    return '#f44336'; // Red - critical
  } else {
    return '#ff9800'; // Orange - mild abnormality
  }
};

// Get trend indicator for value changes
export const getTrendIndicator = (currentValue, previousValue) => {
  if (!previousValue || currentValue === previousValue) return 'stable';
  return currentValue > previousValue ? 'increasing' : 'decreasing';
}; 