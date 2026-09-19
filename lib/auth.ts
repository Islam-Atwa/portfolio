import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  signInWithPopup,
  type User 
} from 'firebase/auth';
import { auth } from './firebase';

export const ALLOWED_ADMIN_EMAIL = 'islamatwa429@gmail.com';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Sign in admin user with Google popup and restrict to designated admin email
 */
export async function signInWithGoogleAdmin() {
  if (!auth) throw new Error('Firebase auth is not configured');
  
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;

  // Strict email check: only allow the designated admin account
  if (user.email?.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
    await signOut(auth);
    throw new Error(`Unauthorized email (${user.email || 'unknown'}). Access is strictly restricted to administrator.`);
  }

  return userCredential;
}

/**
 * Sign in admin user with email and password
 */
export async function signInAdmin(email: string, password: string) {
  if (!auth) throw new Error('Firebase auth is not configured');

  if (email.trim().toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
    throw new Error('Unauthorized email. Access is strictly restricted to administrator.');
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Strict email check post-login as well
  if (user.email?.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
    await signOut(auth);
    throw new Error(`Unauthorized email (${user.email || 'unknown'}). Access is strictly restricted to administrator.`);
  }

  return userCredential;
}

/**
 * Sign out current admin user
 */
export async function signOutAdmin() {
  if (!auth) throw new Error('Firebase auth is not configured');
  return signOut(auth);
}

/**
 * Hook to get the current authenticated user state
 */
export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}
