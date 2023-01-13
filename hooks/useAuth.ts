import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAuth = (): {
  validate: () => Promise<Response>;
  isAuthenticating: boolean;
  isAuthenticated: boolean | undefined;
} => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(undefined);

  const validate = async () => {
    setIsAuthenticating(true);
    const response = await fetch('/api/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      setIsAuthenticated(false);
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      router.push('/');
    }
    setIsAuthenticating(false);

    return response;
  };

  return { validate, isAuthenticating, isAuthenticated };
};

export default useAuth;
