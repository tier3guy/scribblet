import { useContext } from 'react';
import { DashboardContext } from '@/context/DashboardProvider';

const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard can only be used  inside the DashboardProvider');
    }
    return context;
};

export default useDashboard;
