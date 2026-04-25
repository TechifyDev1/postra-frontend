import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Access headers to force dynamic rendering
  await headers();
  
  return <>{children}</>;
}
