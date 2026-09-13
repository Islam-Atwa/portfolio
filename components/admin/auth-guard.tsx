'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState, signOutAdmin, ALLOWED_ADMIN_EMAIL } from '@/lib/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/admin/login');
      } else if (user.email && user.email.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
        signOutAdmin().finally(() => {
          router.push('/admin/login?error=unauthorized');
        });
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="size-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
