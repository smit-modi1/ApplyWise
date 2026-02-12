"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '@/lib/api';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar?: string;
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setUser(null);
                setLoading(false);
                return;
            }

            const response = await api.get('/auth/me');
            const userData = response.data.data || response.data;

            setUser({
                id: userData.id || userData._id,
                email: userData.email,
                firstName: userData.firstName || userData.first_name || '',
                lastName: userData.lastName || userData.last_name || '',
                fullName: userData.fullName || `${userData.firstName || userData.first_name || ''} ${userData.lastName || userData.last_name || ''}`.trim(),
                avatar: userData.avatar || userData.picture
            });
        } catch (err: any) {
            console.error('Failed to fetch user:', err);
            setError(err.response?.data?.message || 'Failed to load user data');

            // If unauthorized, clear tokens
            if (err.response?.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error, refreshUser: fetchUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
