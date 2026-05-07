"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../actions/useLogin";
import { LoginFormSchema, loginSchema } from "../schemas/loginSchema";

const LoginView = () => {
  const mutateLogin = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormSchema) => {
    try {
      await mutateLogin.mutateAsync({
        body: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/20 via-base-100 to-secondary/20 flex items-center justify-center p-6">
      <div className="card w-full max-w-md bg-base-100/70 backdrop-blur-xl shadow-2xl border border-white/20">
        <div className="card-body gap-6">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary">
              Halo
            </h1>
            <p className="text-base-content/60">
              Masuk untuk menulis postingan anda
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="email"
                className={`input input-bordered w-full focus:input-primary transition-all ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full focus:input-primary transition-all ${
                  errors.password ? "input-error" : ""
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.password ? (
                  <span className="text-xs text-error">
                    {errors.password.message}
                  </span>
                ) : (
                  <div />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={mutateLogin.isPending}
              className={`btn btn-primary w-full mt-4`}
            >
              {mutateLogin.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Masuk Sekarang"
              )}
            </button>
          </form>

          <p className="text-center text-sm">
            Baru di sini?{" "}
            <Link href="/register" className="link link-primary font-bold">
              Buat Akun Gratis
            </Link>
          </p>
        </div>
      </div>
      {mutateLogin.isError && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-error">
            <span>Login Gagal!. Silahkan coba lagi</span>
          </div>
        </div>
      )}

      {mutateLogin.isSuccess && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Login Berhasil!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginView;
