import { DocLayout } from '@/components/DocLayout';
import { getAllDocs } from '@/lib/mdx';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocs();
  return (
    <DocLayout docs={docs}>
      {children}
    </DocLayout>
  );
}
