import React from 'react';
import Box from '@mui/material/Box';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3, width: '100%' }}>
        <Box sx ={{
            px: { xs: 2, sm: 3, md: 4}
        }}>
            {children}
        </Box>
    </Box>
  );
};

export default Main;