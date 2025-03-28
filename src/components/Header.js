import React from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const Header = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <AppBar position="static" color="primary" elevation={0} sx={{ borderRadius: 2 }}>
        <Toolbar>
          <MonitorHeartIcon sx={{ mr: 2 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Medical Lab Values Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Track and visualize patient lab values with color indicators: green (normal), yellow (needs attention), 
          red (critical). Monitor improvements or deteriorations with trend indicators.
        </Typography>
      </Box>
    </Box>
  );
};

export default Header; 