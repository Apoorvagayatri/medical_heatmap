import React, { useState, useEffect } from 'react';
import { 
  Box, Grid, Typography, 
  Tabs, Tab, 
  FormControl, InputLabel, 
  MenuItem, Select,
  Divider
} from '@mui/material';
import { format } from 'date-fns';
import LabValueCell from './LabValueCell';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = ({ entries, medicalRanges, selectedDate, onDateSelect }) => {
  const [groupedEntries, setGroupedEntries] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  // 0 is dashboard view, 1 is chart/trend view
  const [selectedView, setSelectedView] = useState(0); 
  
  // Process entries when they change or on component load
  useEffect(() => {
    if (!entries.length) return;
    
    // Group all test entries by date for easier display
    const grouped = entries.reduce((acc, entry) => {
      const dateString = new Date(entry.date).toISOString().split('T')[0];
      
      if (!acc[dateString]) {
        acc[dateString] = {};
      }
      
      acc[dateString][entry.testId] = entry.value;
      return acc;
    }, {});
    
    // Get all available dates and sort them newest first
    const dates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
    
    setGroupedEntries(grouped);
    setAvailableDates(dates);
    
    // Set selected date to latest if not already set
    if (!selectedDate && dates.length) {
      onDateSelect(dates[0]);
    }
  }, [entries, selectedDate, onDateSelect]);
  
  // Get values for current selected date
  const currentValues = selectedDate ? groupedEntries[selectedDate] || {} : {};
  
  // Find previous date's values for comparison/trend indicators
  const dateIndex = availableDates.indexOf(selectedDate);
  const previousDate = dateIndex < availableDates.length - 1 ? availableDates[dateIndex + 1] : null;
  const previousValues = previousDate ? groupedEntries[previousDate] || {} : null;
  
  // Handle user selecting a different date
  const handleDateChange = (event) => {
    onDateSelect(event.target.value);
  };
  
  // When user selects a test to see its trend chart
  const handleTestChange = (event) => {
    const testId = event.target.value;
    setSelectedTest(medicalRanges.find(test => test.id === testId) || null);
  };
  
  // User switches between dashboard and chart views
  const handleViewChange = (event, newValue) => {
    setSelectedView(newValue);
  };
  
  // Format data for the trend chart
  const prepareChartData = () => {
    if (!selectedTest) return [];
    
    // Create chart data points from available dates
    return availableDates.map(date => {
      const value = groupedEntries[date] ? groupedEntries[date][selectedTest.id] : null;
      return {
        date: format(new Date(date), 'MM/dd'),
        value: value,
        min: selectedTest.min,   // Normal range min line
        max: selectedTest.max    // Normal range max line
      };
    }).reverse(); // Show oldest to newest for trending
  };
  
  return (
    <Box sx={{ mt: 2 }}>
      <Tabs value={selectedView} onChange={handleViewChange} sx={{ mb: 2 }}>
        <Tab label="Dashboard" />
        <Tab label="Trends" />
      </Tabs>
      
      {/* Date selector and display */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">
          {selectedDate ? format(new Date(selectedDate), 'MMMM d, yyyy') : 'No data available'}
        </Typography>
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="date-select-label">Select Date</InputLabel>
          <Select
            labelId="date-select-label"
            value={selectedDate || ''}
            label="Select Date"
            onChange={handleDateChange}
            disabled={!availableDates.length}
          >
            {availableDates.map(date => (
              <MenuItem key={date} value={date}>
                {format(new Date(date), 'MMM d, yyyy')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {selectedView === 0 ? (
        // Dashboard View - grid of color-coded cells
        <Grid container spacing={2}>
          {medicalRanges.map(test => (
            <Grid item xs={6} sm={4} md={3} key={test.id}>
              <LabValueCell
                value={currentValues[test.id] !== undefined ? currentValues[test.id] : null}
                test={test}
                previousValue={previousValues && previousValues[test.id] !== undefined 
                  ? previousValues[test.id] 
                  : null
                }
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Trend Chart View - line chart for a single test over time
        <Box>
          <FormControl sx={{ minWidth: 250, mb: 3 }}>
            <InputLabel id="test-select-label">Select Test to View Trend</InputLabel>
            <Select
              labelId="test-select-label"
              value={selectedTest?.id || ''}
              label="Select Test to View Trend"
              onChange={handleTestChange}
            >
              {medicalRanges.map(test => (
                <MenuItem key={test.id} value={test.id}>
                  {test.name} ({test.fullName})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {selectedTest ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {selectedTest.fullName} ({selectedTest.unit}) - Normal Range: {selectedTest.normalRange}
              </Typography>
              
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={prepareChartData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[
                      selectedTest.criticalLow !== null ? selectedTest.criticalLow * 0.9 : 'auto',
                      selectedTest.criticalHigh !== null ? selectedTest.criticalHigh * 1.1 : 'auto'
                    ]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    {/* Normal range reference lines */}
                    <Line 
                      type="monotone" 
                      dataKey="min" 
                      stroke="#82ca9d" 
                      strokeDasharray="5 5" 
                      strokeWidth={1} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="max" 
                      stroke="#82ca9d" 
                      strokeDasharray="5 5" 
                      strokeWidth={1} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Select a test to view its trend over time
            </Typography>
          )}
        </Box>
      )}
      
      {/* Show message when no data is available */}
      {(!availableDates.length) && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No lab values have been recorded yet. Use the form to add your first entry.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard; 