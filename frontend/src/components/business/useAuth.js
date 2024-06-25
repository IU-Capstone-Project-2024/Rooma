import {useContext} from 'react';
import {AuthContext} from "@/components/business/AuthProvider.jsx";

export function useAuth() {
    return useContext(AuthContext);
}
