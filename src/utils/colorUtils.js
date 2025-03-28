// Convert decimal RGB values to hex
const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Calculate gradient color between two colors based on percentage
export const calculateGradient = (startColor, endColor, percentage) => {
  // Parse hex values
  const start = {
    r: parseInt(startColor.slice(1, 3), 16),
    g: parseInt(startColor.slice(3, 5), 16),
    b: parseInt(startColor.slice(5, 7), 16)
  };
  
  const end = {
    r: parseInt(endColor.slice(1, 3), 16),
    g: parseInt(endColor.slice(3, 5), 16),
    b: parseInt(endColor.slice(5, 7), 16)
  };
  
  // Calculate interpolated color
  const r = start.r + (end.r - start.r) * percentage;
  const g = start.g + (end.g - start.g) * percentage;
  const b = start.b + (end.b - start.b) * percentage;
  
  return rgbToHex(r, g, b);
};

// Get color for value that may not be exactly at thresholds
export const getGradientColor = (value, test) => {
  // Base colors 
  const normalColor = '#4caf50'; // Green
  const warningColor = '#ff9800'; // Orange/Yellow
  const criticalColor = '#f44336'; // Red
  
  // Special case for CRP
  if (test.id === 'crp') {
    if (value <= test.max) return normalColor;
    if (value <= test.mildChangeThreshold) {
      // Calculate gradient between warning and critical based on where value is between thresholds
      const percentage = (value - test.max) / (test.mildChangeThreshold - test.max);
      return calculateGradient(normalColor, warningColor, percentage);
    }
    // Calculate gradient above mildChangeThreshold until criticalHigh
    const percentage = Math.min((value - test.mildChangeThreshold) / (test.criticalHigh - test.mildChangeThreshold), 1);
    return calculateGradient(warningColor, criticalColor, percentage);
  }
  
  // For tests where higher values are better (like eGFR)
  if (test.isHigherBetter) {
    if (value >= test.min) return normalColor;
    if (value >= test.criticalLow) {
      // Calculate gradient between min and criticalLow
      const percentage = (test.min - value) / (test.min - test.criticalLow);
      return calculateGradient(normalColor, warningColor, percentage);
    }
    // Below criticalLow, calculate gradient from warning to critical
    const lowestPossible = Math.max(test.criticalLow * 0.5, 0); // Avoiding division by zero
    const percentage = (test.criticalLow - value) / (test.criticalLow - lowestPossible);
    return calculateGradient(warningColor, criticalColor, Math.min(percentage, 1));
  }
  
  // For normal range tests
  if (value >= test.min && value <= test.max) {
    return normalColor;
  }
  
  // Below normal range
  if (value < test.min) {
    if (test.criticalLow !== null) {
      if (value >= test.criticalLow) {
        // Between min and criticalLow - calculate warning gradient
        const percentage = (test.min - value) / (test.min - test.criticalLow);
        return calculateGradient(normalColor, warningColor, percentage);
      } else {
        // Below criticalLow - calculate critical gradient
        const lowestPossible = Math.max(test.criticalLow * 0.5, 0); // Avoiding division by zero
        const percentage = (test.criticalLow - value) / (test.criticalLow - lowestPossible);
        return calculateGradient(warningColor, criticalColor, Math.min(percentage, 1));
      }
    } else {
      // No critical low defined, just use warning gradient proportional to distance
      const percentage = Math.min((test.min - value) / test.min, 1);
      return calculateGradient(normalColor, warningColor, percentage);
    }
  }
  
  // Above normal range
  if (value > test.max) {
    if (test.criticalHigh !== null) {
      if (value <= test.criticalHigh) {
        // Between max and criticalHigh - calculate warning gradient
        const percentage = (value - test.max) / (test.criticalHigh - test.max);
        return calculateGradient(normalColor, warningColor, percentage);
      } else {
        // Above criticalHigh - calculate critical gradient
        const highestPossible = test.criticalHigh * 1.5; // Reasonable upper limit
        const percentage = Math.min((value - test.criticalHigh) / (highestPossible - test.criticalHigh), 1);
        return calculateGradient(warningColor, criticalColor, percentage);
      }
    } else {
      // No critical high defined, just use warning gradient
      const percentage = Math.min((value - test.max) / test.max, 1);
      return calculateGradient(normalColor, warningColor, percentage);
    }
  }
  
  // Fallback
  return '#e0e0e0';
}; 