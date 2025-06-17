import { Link, Outlet } from '@tanstack/react-router';

import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTab, { RouteTabs } from '@/hooks/useTabs';

const Layout = () => {
  const currentTab = useTab();

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <div className="flex justify-between gap-1">
        <h3 className="text-2xl font-bold">UTM LINKS BUILDER</h3>
        <ThemeToggle />
      </div>

      <Tabs value={currentTab}>
        <TabsList>
          <TabsTrigger value={RouteTabs.BUILDER} asChild>
            <Link to="/builder">Builder</Link>
          </TabsTrigger>
          <TabsTrigger value={RouteTabs.SAVED} asChild>
            <Link to="/saved">Saved</Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={currentTab}>
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Layout;
