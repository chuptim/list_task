// components/Footer.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface FooterProps {
  copyright?: string;
}

const Footer: React.FC<FooterProps> = ({ copyright }) => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        py: 2,
        px: 2,
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#3b9d40',
      }}
    >
      <Typography variant="body1" color="textSecondary">
        {copyright}
      </Typography>
    </Box>
  );
};

export default Footer;