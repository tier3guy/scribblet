import { useContext } from 'react';
import { WorkspaceContext } from '@/context/WorkspaceProvider';

const useWorkspace = () => {
    const context = useContext(WorkspaceContext);
    if (!context) {
        throw new Error('useWorkspace can only be used  inside the WorkspaceProvider');
    }
    return context;
};

export default useWorkspace;
