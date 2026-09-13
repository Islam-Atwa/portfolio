'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInAdmin, signInWithGoogleAdmin, useAuthState, ALLOWED_ADMIN_EMAIL } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, Lock, ShieldCheck } from 'lucide-react';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuthState();

  const isUnauthorizedRedirect = searchParams.get('error') === 'unauthorized';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(
    isUnauthorizedRedirect
      ? `Access denied. Only the authorized administrator account (${ALLOWED_ADMIN_EMAIL}) is permitted.`
      : ''
  );
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redirect if already authenticated as the allowed admin
  useEffect(() => {
    if (!authLoading && user && user.email?.toLowerCase() === ALLOWED_ADMIN_EMAIL.toLowerCase()) {
      router.replace('/admin/projects');
    }
  }, [user, authLoading, router]);

  const parseAuthError = (err: unknown): string => {
    const errorObj = err as { code?: string; message?: string } | undefined;
    const code = errorObj?.code || '';
    if (code === 'auth/popup-closed-by-user') {
      return 'Sign-in window was closed before completion.';
    }
    if (code === 'auth/popup-blocked') {
      return 'Sign-in popup was blocked by your browser. Please allow popups and try again.';
    }
    if (code === 'auth/cancelled-popup-request') {
      return 'Sign-in request was replaced by a newer request.';
    }
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return 'Invalid email or password. Please verify your credentials.';
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many failed login attempts. Please try again in a few moments.';
    }
    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your internet connection.';
    }
    return errorObj?.message || 'Authentication failed. Please try again.';
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Email authentication check
      if (email.trim().toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
        throw new Error(`Unauthorized email. Access is strictly limited to ${ALLOWED_ADMIN_EMAIL}.`);
      }

      await signInAdmin(email.trim(), password);
      router.push('/admin/projects');
    } catch (err: unknown) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      await signInWithGoogleAdmin();
      router.push('/admin/projects');
    } catch (err: unknown) {
      setError(parseAuthError(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const isBusy = loading || googleLoading || authLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4 py-12 selection:bg-primary/15 selection:text-primary">
      <div className="w-full max-w-md bg-card p-8 sm:p-9 rounded-2xl shadow-xl border border-border/70 transition-all duration-200">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary mb-3 shadow-inner">
            <Lock className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Portal</h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Sign in to manage portfolio projects and settings
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div 
            className="mb-6 p-3.5 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200"
            role="alert"
          >
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Google Authentication Button */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isBusy}
            className="w-full h-11 relative font-medium border-border/80 hover:bg-muted/60 transition-all duration-150 flex items-center justify-center gap-3 shadow-xs"
          >
            {googleLoading ? (
              <>
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <GoogleIcon className="size-4.5 shrink-0" />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          {/* Clean Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/80" />
            </div>
            <span className="relative bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
              or continue with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground/80">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                disabled={isBusy}
                className="h-10 text-sm bg-background/50 focus:bg-background transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground/80">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isBusy}
                className="h-10 text-sm bg-background/50 focus:bg-background transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-10 mt-2 font-medium shadow-sm transition-all"
              disabled={isBusy}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  <span>Signing In...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-8 pt-4 border-t border-border/50 text-center">
          <p className="text-[11px] text-muted-foreground/80 flex items-center justify-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary/70 shrink-0" />
            <span>Restricted to authorized administrator account only</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
}

