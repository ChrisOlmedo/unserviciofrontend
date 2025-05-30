import { useEffect, useState } from 'react';
import { UserData } from 'types';
import { getUser } from '../services/userServices';

export function useCurrentUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getUser()
      .then(data => setUser(data))
      .catch(err => setError('No se pudo obtener el usuario'))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
} 