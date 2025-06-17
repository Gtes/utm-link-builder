import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun color="yellow" /> : <Moon color="grey" />}
    </Button>
  );
}
