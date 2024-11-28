"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { validateEmail, validatePassword } from '@/util/validation';
import { BASE_URL } from '@/util/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface FormErrors {
    email: string;
    password: string;
}
interface TouchedFields {
    email: boolean;
    password: boolean;
    rememberMe: boolean;
}

const Signin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        rememberMe: false
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: '',
        password: '',
    });

    const [touchedFields, setTouchedFields] = useState<TouchedFields>({
        email: false,
        password: false,
        rememberMe: false,
    })

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const errors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
        };
        setFormErrors(errors);

        setIsFormValid(
            Object.values(errors).every(error => error === '') &&
            Object.values(formData).every(value => value !== '')
        );
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));
    };
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('Form submitted:', formData);
            try {
                const response = await axios.post(`${BASE_URL}login/`, {
                    email: formData.email,
                    password: formData.password,
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                // console.log(response);

                // Securely store tokens in HttpOnly cookies on the server-side
                Cookies.set('login_access_token_appw3', response.data.access, {
                    expires: 1,  // Token expiration (1 day in this case)
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',  // Send cookie over HTTPS only in production
                    sameSite: 'Strict',  // Protect against CSRF
                });

                Cookies.set('login_refresh_token_appw3', response.data.refresh, {
                    expires: 7,  // Refresh token expiration (e.g., 7 days)
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                });
                toast.success("Signin successful")
                router.push('/tool')
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error("Signin failed", error.message);
                    toast.error("Signin failed")
                }
                else {
                    toast.error("An unexpected error occurred");
                }
            }
        }
    };



    return (
        <main className="min-h-auto bg-[url(/images/signinbg.svg)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[1200px] flex flex-col-reverse lg:flex-row items-center justify-between gap-8"
            >
                {/* Left side - Illustration */}
                <div className="flex-1 max-w-[600px]">
                    <Image
                        src='/images/signinimg.svg'
                        alt="Developer illustration"
                        width={400}
                        height={400}
                    />
                </div>

                {/* Right side - Form */}
                <div className="flex-1 max-w-[480px] w-full">
                    <motion.div className="bg-white rounded-[20px] p-8 shadow-xl">
                        <div className="text-center mb-8">
                            <p className="text-gray-500 mb-2">Register to</p>
                            <h1 className="!text-[34px] !font-semibold">Free SEO Tools</h1>
                        </div>

                        {/* Google Sign In Button */}
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 mb-6 hover:bg-gray-50 transition-colors">
                            <FcGoogle className='text-xl' />
                            <span className="text-sm">Continue with Google</span>
                        </button>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">or</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {touchedFields.email && formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {touchedFields.password && formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <div className="flex flex-row justify-between w-full">
                                    <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
                                    <Link href='/' className="text-sm text-pink hover:underline">Forget Password</Link>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-pink text-white rounded-full py-3 font-medium hover:bg-pink transition-colors disabled:bg-grey disabled:text-homegrey disabled:cursor-not-allowed smooth3 disabled:border-gray-300 border"
                                disabled={!isFormValid}
                            >
                                LOG IN
                            </button>
                        </form>

                        <p className="text-center mt-6 text-sm">
                            Already have an account?{' '}
                            <Link href="/signup" className="text-pink hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    )
}

export default Signin

