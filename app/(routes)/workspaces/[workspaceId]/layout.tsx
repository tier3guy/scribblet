import WorkspaceProvider from '@/context/WorkspaceProvider';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <WorkspaceProvider>{children}</WorkspaceProvider>;
}
