"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (accessToken && refreshToken) {
            // Store tokens
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Redirect to dashboard
            router.push('/dashboard');
        } else {
            // If tokens are missing, redirect to login with error
            router.push('/login?error=oauth_failed');
        }
    }, [router, searchParams]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
            <h2 className="text-xl font-semibold">Authenticating...</h2>
            <p className="text-gray-400 mt-2">Just a moment while we log you in.</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CallbackContent />
        </Suspense>
    );
}
