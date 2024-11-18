import React, { useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { apiClientFile } from '../../services/api';

const HabilitationForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Veuillez sélectionner un fichier Excel');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await apiClientFile.post('/api/traveaux_hauteur/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'habilitations_travaux_en_hauteur.zip');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Erreur lors de l’envoi du fichier:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 3, width: '100%', maxWidth: 400, mx: 'auto' }}
    >
      <Typography variant="h5" gutterBottom>
        Formulaire d Habilitation
      </Typography>

      <TextField
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: '.xlsx, .xls' }}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Envoi en cours...' : 'Envoyer le fichier'}
      </Button>
    </Box>
  );
};

export default HabilitationForm;
