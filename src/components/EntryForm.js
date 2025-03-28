import React, { useState } from 'react';
import { 
  Box, TextField, Button, 
  FormControl, FormLabel, 
  Grid, Typography,
  Autocomplete
} from '@mui/material';
import { initialMedicalRanges } from '../data/labRanges';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const EntryForm = ({ onAddEntry }) => {
  // Form state
  const [date, setDate] = useState(new Date());
  const [selectedTest, setSelectedTest] = useState(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate test selection
    if (!selectedTest) {
      setError('Please select a lab test');
      return;
    }
    
    // Make sure value is entered
    if (!value) {
      setError('Please enter a value');
      return;
    }
    
    // Make sure value is a number
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }
    
    /* Add the entry to the parent component 
       with all required data formatted properly */
    onAddEntry({
      date: date.toISOString(),
      testId: selectedTest.id,
      testName: selectedTest.name,
      value: numValue,
      unit: selectedTest.unit
    });
    
    // Reset form after submission
    setSelectedTest(null);
    setValue('');
    setError('');
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* Date picker */}
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined'
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        
        {/* Test selector dropdown */}
        <Grid item xs={12}>
          <Autocomplete
            options={initialMedicalRanges}
            getOptionLabel={(option) => `${option.name} (${option.fullName})`}
            value={selectedTest}
            onChange={(_, newValue) => setSelectedTest(newValue)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Lab Test" 
                variant="outlined" 
                fullWidth
              />
            )}
          />
        </Grid>
        
        {/* Value input field */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Value"
              variant="outlined"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              InputProps={{
                endAdornment: selectedTest && (
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    {selectedTest.unit}
                  </Typography>
                )
              }}
            />
            {selectedTest && (
              <FormLabel sx={{ mt: 1, fontSize: '0.75rem' }}>
                Normal range: {selectedTest.normalRange} {selectedTest.unit}
              </FormLabel>
            )}
          </FormControl>
        </Grid>
        
        {/* Error messages */}
        {error && (
          <Grid item xs={12}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Grid>
        )}
        
        {/* Submit button */}
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EntryForm; 