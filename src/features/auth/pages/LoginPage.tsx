/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import officeWallpaper from '@/assets/images/office_wallpaper.png';

export const LoginPage: React.FC = () => {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info('Contact support@hireflow.com to reset password');
  };

  const handleContactSales = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info('Sales team contact modal/redirect simulation.');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left side brand banner (Split layout) */}
      <div className="relative hidden lg:flex w-[45%] h-full bg-slate-900 overflow-hidden p-16 flex-col justify-between select-none">
        {/* Wallpaper background image */}
        <img
          src={officeWallpaper}
          alt="Office Wallpaper"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Gradient Overlay for rich brand aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#003884]/90 via-[#0058bc]/85 to-[#d0e1fb]/65 pointer-events-none" />

        {/* Abstract decorative background shapes (Ripple effect) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-[20%] left-[-10%] w-[80%] aspect-square rounded-full border border-white/40" />
          <div className="absolute top-[10%] left-[-20%] w-[100%] aspect-square rounded-full border border-white/30" />
          <div className="absolute top-[0%] left-[-30%] w-[120%] aspect-square rounded-full border border-white/20" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Top brand header */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-lg p-1.5">
            <img src="/logo.png" alt="Hireflow Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-heading">
            Hireflow
          </span>
        </div>

        {/* Bottom context block */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full w-max backdrop-blur-sm border border-white/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruitment Suite v1.0.3</span>
          </div>
          <h1 className="text-3xl !font-bold text-white font-heading tracking-tight leading-snug">
            Streamline your hiring process from sourcing to offer.
          </h1>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full lg:w-[55%] h-full flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-white overflow-y-auto">
        {/* Empty container to align form vertically in center */}
        <div className="hidden lg:block h-4" />

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto my-auto">
          {/* Header Block */}
          <div className="mb-8 text-left">
            <h2 
              className="text-3xl !font-bold text-black dark:text-black tracking-tight font-heading mb-2"
              style={{ color: 'black' , fontWeight: 'bold' }}
            >
              Welcome back
            </h2>
            <p className="text-sm font-medium text-[#54647a]">
              Enter your details to access your recruitment suite.
            </p>
          </div>

          {/* Form Element */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Corporate Email"
              placeholder="name@company.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#111c2d]"
                >
                  Password
                </label>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-[#0058bc] hover:text-[#0070eb] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="w-full py-3.5 text-sm font-bold tracking-wide mt-2"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap gap-x-6 gap-y-2 justify-between items-center text-xs font-semibold text-[#717786] select-none">
          <p>
            Don't have an account?{' '}
            <a
              href="#"
              onClick={handleContactSales}
              className="text-[#0058bc] hover:text-[#0070eb] transition-colors"
            >
              Contact Sales
            </a>
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#111c2d] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#111c2d] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
