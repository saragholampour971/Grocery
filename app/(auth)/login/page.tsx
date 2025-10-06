"use client"
import React, {useRef} from 'react';
import Image from "next/image";
import logo from '@/public/svg/logo.svg'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {authService} from "../../../store/authService";
import {useRouter, useSearchParams} from "next/navigation";

const Login = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect');

  const loginMutation = useMutation({
    mutationFn: handleLogin,
    onError: (err) => {
      console.error(err);
      alert("Login failed");
    },
  });

  const signupMutation = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (user) => {
      alert(`Signed up as ${user?.email}`);
    },
    onError: (err) => {
      console.error(err);
      alert("Signup failed");
    },
  });

  const parseFormData = () => {
    if (!formRef.current)
      return;
    const formData = new FormData(formRef.current);
    return {
      email: formData.get('email') as string || '',
      password: formData.get('password') as string || '',
    };

  }

  async function handleLogin() {
    try {
      const data = parseFormData()
      if (!data?.email || !data?.password)
        return;

      const user = await authService.login(data.email, data.password);
      console.log(user, 'user', redirectTo);
      if (redirectTo && user.uid) {
        router.push(redirectTo);

      }

      alert('Login successful: ');

    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ');
    }
  }


  async function handleSignUp() {
    try {
      const data = parseFormData()
      if (!data?.email || !data?.password)
        return;
      return await authService.signup(data.email, data.password);
    } catch (error) {
      console.error('sign up error:', error);
      alert('sign up failed: ');
    }
  }


  return (
    <div className={'px-6 py-7 space-y-9'}>
      <Image src={logo.src} alt={'logo'} width={45} height={56} className={'mx-auto my-4'}/>
      <div>
        <h3 className={'font-semibold'}>Sign in</h3>
        <sub className={'text-gray-500 mt-2'}>Enter your emails and password</sub>
        <form className={'space-y-5 mt-7'} ref={formRef} onSubmit={e => e.preventDefault()}>
          <Input label={'Email'} id={'name'} name={'email'} type={'email'} required/>
          <Input label={'Password'} id={'password'} name={'password'} type={'password'} required/>
          <Button variant={'default'} className={'!w-full'}
                  size={'lg'} type={'submit'} onClick={() => loginMutation.mutate()}>
            Log In
          </Button>
          <Button variant={'outline'} className={'!w-full'}
                  size={'lg'} type={'submit'} onClick={() => signupMutation.mutate()}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
