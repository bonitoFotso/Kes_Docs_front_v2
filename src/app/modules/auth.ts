// Interface pour les données d'authentification (par exemple, un token d'accès)
export interface AuthData {
    access: string;  // Tu peux ajouter d'autres champs si nécessaire
  }
  
  // Fonction pour récupérer les informations d'authentification depuis le localStorage
  export const getAuth = (): AuthData | null => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        return JSON.parse(authData) as AuthData;
      } catch (error) {
        console.error('Erreur lors de la lecture des données d\'authentification :', error);
        return null;
      }
    }
    return null;
  };
  
  // Fonction pour supprimer les informations d'authentification du localStorage
  export const removeAuth = (): void => {
    localStorage.removeItem('auth');
  };
  