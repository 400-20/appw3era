"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from '@/util/validation';
import axios from 'axios';
import { BASE_URL } from '@/util/api';


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  agreeToTerms: boolean;
}

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: '',
  });

  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreeToTerms: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const errors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
      agreeToTerms: formData.agreeToTerms ? '' : 'You must agree to the terms.',
    };
    setFormErrors(errors);

    setIsFormValid(
      Object.values(errors).every(error => error === '') &&
      Object.values(formData).every(value => value !== '') &&
      formData.agreeToTerms
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${BASE_URL}register/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Signup successful");
      router.push("/signin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.email);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log(error);
    }
  }


  return (
    <>
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
              src="/images/signinimg.svg"
              alt="Developer illustration"
              width={400}
              height={400}
            />
          </div>

          {/* Right side - Form */}
          <div className="flex-1 max-w-[480px] w-full">
            <div className="bg-white rounded-[20px] p-8 shadow-xl">
              <div className="text-center mb-8">
                <p className="text-gray-500 mb-2">Register to</p>
                <h1 className="!text-[34px] !font-semibold">Free SEO Tools</h1>
              </div>

              {/* Google Sign In Button */}
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 mb-6 hover:bg-gray-50 transition-colors">
                <FcGoogle className="text-xl" />
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
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {touchedFields.name && formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

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

                <div className="relative">
                  <input
                    type={showPasswordConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {touchedFields.confirmPassword && formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswordConfirm ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to{' '}
                    <Link href="#" className="text-pink hover:underline">
                      Terms & Conditions
                    </Link>
                  </label>
                </div>
                {touchedFields.agreeToTerms && formErrors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{formErrors.agreeToTerms}</p>}

                <button
                  type="submit"
                  className="w-full py-3 bg-pink text-white rounded-full disabled:bg-grey disabled:text-homegrey disabled:cursor-not-allowed smooth3 disabled:border-gray-300 border"
                  disabled={!isFormValid}
                >
                  REGISTER
                </button>
              </form>

              <p className="text-center mt-6 text-sm ">
                Already have an account?{" "}
                <Link href="/signin" className="text-pink hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default Signup;

