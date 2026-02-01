import { Sidebar } from '@/components/Sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 flex flex-1 items-start">
      <Sidebar />
      <div className="flex-1 w-full min-w-0 py-6 md:px-8">
        {children}
      </div>
    </div>
  );
}
