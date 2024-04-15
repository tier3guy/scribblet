import DashboardProvider from '@/context/DashboardProvider';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DashboardProvider>{children}</DashboardProvider>;
}
