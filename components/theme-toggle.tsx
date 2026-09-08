'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  labelLight?: string;
  labelDark?: string;
}

export function ThemeToggle({
  labelLight = 'Light Mode',
  labelDark = 'Dark Mode',
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-9 rounded-full border border-border/40 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Toggle theme"
        disabled
      >
        <span className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="size-9 rounded-full border border-border/40 text-muted-foreground transition-colors hover:border-border hover:bg-accent/40 hover:text-foreground"
      aria-label={isDark ? labelLight : labelDark}
      title={isDark ? labelLight : labelDark}
    >
      {isDark ? (
        <Sun className="size-4 transition-transform rotate-0 scale-100 duration-300 text-amber-400" />
      ) : (
        <Moon className="size-4 transition-transform rotate-0 scale-100 duration-300 text-slate-700" />
      )}
      <span className="sr-only">{isDark ? labelLight : labelDark}</span>
    </Button>
  );
}
