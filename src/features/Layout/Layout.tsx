import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UTMBuilderForm from '@/features/UTMBuilderForm/UTMBuilderForm';

const Layout = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="builder">Builder</TabsTrigger>
        <TabsTrigger value="saved">Saved</TabsTrigger>
      </TabsList>
      <TabsContent value="builder">
        <UTMBuilderForm />
      </TabsContent>
      <TabsContent value="saved">Saved</TabsContent>
    </Tabs>
  );
};

export default Layout;
