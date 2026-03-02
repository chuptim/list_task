// components/Header.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Интерфейс для элемента навигации

interface HeaderProps {
  title?: string;
  logo?: React.ReactNode; // может быть иконка, изображение или любой элемент
}

const Header: React.FC<HeaderProps> = ({
  title,
  logo,
}) => {
  return (
    <AppBar position="sticky" elevation={2} sx={{bgcolor: '#3b9d40'}}>
      <Toolbar sx={{ position: 'relative', py: 2 }}>
        {logo && <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>{logo}</Box>}
        <Typography variant="h4" sx={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header