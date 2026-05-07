"use client";

import { forwardRef, RefObject } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormSchema, postSchema } from "../../schemas/postSchema";

interface ModalPostProps {
  onSuccess: (data: PostFormSchema) => Promise<void>;
  isPending: boolean;
}

const ModalPost = forwardRef<HTMLDialogElement, ModalPostProps>(
  ({ onSuccess, isPending }, ref) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<PostFormSchema>({
      resolver: zodResolver(postSchema),
    });

    const onSubmit = async (data: PostFormSchema) => {
      await onSuccess(data);
      reset();
    };

    return (
      <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100">
          <h3 className="font-bold text-lg text-primary mb-4">
            Buat Postingan Baru
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Judul</span>
              </label>
              <input
                {...register("title")}
                type="text"
                placeholder="Judul postingan..."
                className={`input input-bordered w-full focus:input-primary ${errors.title ? "input-error" : ""}`}
              />
              {errors.title && (
                <span className="text-xs text-error mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Isi Konten</span>
              </label>
              <textarea
                {...register("post")}
                placeholder="Tuliskan detail konten Anda di sini..."
                className={`textarea textarea-bordered h-44 w-full focus:textarea-primary transition-all leading-relaxed ${
                  errors.post ? "textarea-error bg-error/5" : ""
                }`}
              ></textarea>
              {errors.post && (
                <span className="text-xs text-error mt-1">
                  {errors.post.message}
                </span>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  (ref as RefObject<HTMLDialogElement>).current?.close()
                }
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary px-8"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  },
);

ModalPost.displayName = "ModalPost";
export default ModalPost;
