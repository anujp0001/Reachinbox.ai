import React, { useState } from 'react';
import authService from '../appWrite/Auth';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

const Auth: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setError("");
        try {
            const { email, password } = data;
            
            // Perform login
            const session = await authService.login({ email, password });
            
            if (session) {
                // The provided token (replace this with the actual session token if needed)
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYW51anBhbHJvY2s5QGdtYWlsLmNvbSIsImlkIjozODIsImZpcnN0TmFtZSI6IkFudWoiLCJsYXN0TmFtZSI6IlBhbCJ9LCJpYXQiOjE3MjMyODk1MDQsImV4cCI6MTc1NDgyNTUwNH0.D1CvWtdDg87PpgqDCKbL1KcwdytMNkwKjwWoRCAyfzo";

                // Redirect to the desktop URL with the token as a query parameter
                window.location.href = `https://reachinbox-frontend.netlify.app/desktop?token=${token}`;
            }
        } catch (error: any) {
            setError(error.message || "An error occurred during login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
