// src/utils/jwt.ts

interface JwtPayload {
  exp: number; // Timestamp d'expiration
  iat: number; // Timestamp de création
  [key: string]: any; // Autres champs (custom claims)
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1]; // La charge utile (payload) est la deuxième partie
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const isTokenValid = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) {
    return false; // Token invalide
  }
  const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
  return decoded.exp > currentTime; // Vérifie si le token n'est pas expiré
};
