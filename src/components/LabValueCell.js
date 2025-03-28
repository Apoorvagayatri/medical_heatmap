import React from 'react';
import { Box, Typography, Tooltip, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { getGradientColor } from '../utils/colorUtils';

const LabValueCell = ({ value, test, previousValue }) => {
  // determine the background color based on the value
  const backgroundColor = value !== null ? getGradientColor(value, test) : '#e0e0e0';
  
  // calculate brightness to determine text color
  // (white text on dark backgrounds, black text on light backgrounds)
  const getBrightness = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };
  
  const textColor = getBrightness(backgroundColor) > 128 ? '#000000' : '#ffffff';
  
  // figure out if value is trending up, down or staying the same
  let trend = 'stable';
  let trendIcon = <TrendingFlatIcon fontSize="small" />;
  
  if (previousValue && value !== null) {
    trend = value > previousValue ? 'increasing' : (value < previousValue ? 'decreasing' : 'stable');
    
    // pick the right icon based on trend
    switch(trend) {
      case 'increasing':
        trendIcon = <TrendingUpIcon fontSize="small" />;
        break;
      case 'decreasing':
        trendIcon = <TrendingDownIcon fontSize="small" />;
        break;
      default:
        trendIcon = <TrendingFlatIcon fontSize="small" />;
    }
  }
  
  /* For some tests like eGFR, higher values are actually better,
     so we need to reverse what's considered positive/negative */
  const isTrendPositive = test.isHigherBetter 
    ? (trend === 'increasing') 
    : (trend === 'decreasing');
  
  // Color for the trend icon
  const trendColor = trend === 'stable' 
    ? 'inherit' 
    : (isTrendPositive ? '#4caf50' : '#f44336');
  
  // Create tooltip content
  const tooltipContent = (
    <Box>
      <Typography variant="body2">{test.fullName}: {value} {test.unit}</Typography>
      <Typography variant="caption">Normal range: {test.normalRange} {test.unit}</Typography>
      {previousValue && (
        <Typography variant="caption" display="block">
          Previous: {previousValue} {test.unit}
          {trend !== 'stable' && ` (${Math.abs(value - previousValue).toFixed(2)} ${trend})`}
        </Typography>
      )}
    </Box>
  );
  
  return (
    <Tooltip title={tooltipContent} arrow>
      <Paper 
        elevation={3}
        sx={{ 
          p: 1.5, 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor,
          color: textColor,
          transition: 'background-color 0.3s ease',
          '&:hover': {
            opacity: 0.9,
            cursor: 'pointer'
          }
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold">
          {value !== null ? value : '-'}
        </Typography>
        
        <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ mr: 0.5 }}>
            {test.name}
          </Typography>
          {previousValue && (
            <Box sx={{ color: trendColor }}>
              {trendIcon}
            </Box>
          )}
        </Box>
      </Paper>
    </Tooltip>
  );
};

export default LabValueCell; 