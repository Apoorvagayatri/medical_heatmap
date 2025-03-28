import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import Header from './components/Header';
import { initialMedicalRanges } from './data/labRanges';

function App() {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAddEntry = (newEntry) => {
    setEntries([...entries, { ...newEntry, id: Date.now() }]);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Header />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Record New Values
              </Typography>
              <EntryForm onAddEntry={handleAddEntry} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Lab Values Dashboard
              </Typography>
              <Dashboard 
                entries={entries} 
                medicalRanges={initialMedicalRanges}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App; 