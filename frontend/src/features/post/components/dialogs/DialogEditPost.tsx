"use client";

import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormSchema, postSchema } from "../../schemas/postSchema";

interface ModalEditProps {
  onSuccess: (data: PostFormSchema) => Promise<void>;
  isPending: boolean;
  initialData: PostFormSchema | null;
}

const ModalEdit = forwardRef<HTMLDialogElement, ModalEditProps>(
  ({ onSuccess, isPending, initialData }, ref) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<PostFormSchema>({
      resolver: zodResolver(postSchema),
    });

    useEffect(() => {
      if (initialData) {
        reset({
          title: initialData.title,
          post: initialData.post,
        });
      }
    }, [initialData, reset]);

    const onSubmit = async (data: PostFormSchema) => {
      await onSuccess(data);
    };

    return (
      <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border-t-4 border-info">
          <h3 className="font-bold text-lg text-info mb-4">Edit Postingan</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Judul</span>
              </label>
              <input
                {...register("title")}
                type="text"
                className={`input input-bordered w-full focus:input-info ${
                  errors.title ? "input-error" : ""
                }`}
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
                className={`textarea textarea-bordered h-44 w-full focus:textarea-info ${
                  errors.post ? "textarea-error" : ""
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
                  (ref as React.RefObject<HTMLDialogElement>).current?.close()
                }
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-info text-white px-8"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  },
);

ModalEdit.displayName = "ModalEdit";
export default ModalEdit;
