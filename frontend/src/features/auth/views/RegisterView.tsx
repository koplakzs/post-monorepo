"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../actions/useRegister";
import { RegisterFormSchema, registerSchema } from "../schemas/resgiterSchema";

const RegisterView = () => {
  const mutateRegister = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      await mutateRegister.mutateAsync({
        body: {
          name: data.name,
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
              Daftar Akun
            </h1>
            <p className="text-base-content/60">
              Bergabunglah untuk menulis postingan Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Nama Lengkap</span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Masukkan nama lengkap"
                className={`input input-bordered w-full focus:input-primary transition-all ${
                  errors.name ? "input-error" : ""
                }`}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.name.message}
                  </span>
                </label>
              )}
            </div>

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
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">
                  Konfirmasi Password
                </span>
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full focus:input-primary transition-all ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.confirmPassword.message}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={mutateRegister.isPending}
              className={`btn btn-primary w-full mt-4`}
            >
              {mutateRegister.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>

          <p className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="link link-primary font-bold">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>

      {mutateRegister.isError && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-error text-white">
            <span>Registrasi Gagal! Silahkan coba lagi</span>
          </div>
        </div>
      )}

      {mutateRegister.isSuccess && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success text-white">
            <span>Registrasi Berhasil! Silahkan login</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterView;
