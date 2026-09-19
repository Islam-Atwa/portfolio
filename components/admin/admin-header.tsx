'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOutAdmin, useAuthState } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogOut, LayoutDashboard, Home } from 'lucide-react';

export function AdminHeader() {
  const { user } = useAuthState();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      router.push('/admin/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mr-4">
          <Link href="/admin/projects" className="flex items-center gap-2 font-bold tracking-tight text-lg">
            <LayoutDashboard className="size-5 text-primary" />
            <span>Admin</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="text-sm text-muted-foreground truncate max-w-[180px] sm:max-w-xs">
              {user?.email}
            </div>
          </div>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link href="/" target="_blank">
              <Button variant="ghost" size="icon" title="View Site">
                <Home className="size-4" />
                <span className="sr-only">View Site</span>
              </Button>
            </Link>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign Out">
              <LogOut className="size-4" />
              <span className="sr-only">Sign Out</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
