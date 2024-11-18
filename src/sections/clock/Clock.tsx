import React, { useState, useEffect } from 'react';

import { Box, Paper, Typography, CircularProgress } from '@mui/material';

import { apiPublic } from '../../services/api';
import HabilitationForm from '../habilitation/habilitation';

// Interface pour la réponse de l'API
interface DateTimeResponse {
  current_datetime: string;
}

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await apiPublic.get<DateTimeResponse>('/api/current-datetime/');
        setCurrentTime(response.data.current_datetime);
        setLoading(false); // Une fois les données chargées, on désactive le loader
        // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        setError('Erreur lors de la récupération de l\'heure.');
        setLoading(false);
      }
    };

    fetchTime().then(r => console.log(r));
    const interval = setInterval(fetchTime, 60000); // Recharger l'heure chaque minute

    // Nettoyer l'intervalle à la destruction du composant
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
          borderRadius: '20px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Typography variant="h2" sx={{ fontFamily: 'Digital-7', fontWeight: 'bold', fontSize: '4rem' }}>
          {currentTime}
        </Typography>
      </Paper>
      <HabilitationForm/>

    </Box>
  );
};

export default Clock;
