"use client";

import { useState, useRef } from "react";
import usePost from "../actions/usePost";
import useGetPosts from "../actions/useGetPosts";
import useDeletePost from "../actions/useDeletePost";
import { PostFormSchema } from "../schemas/postSchema";
import ModalPost from "../components/dialogs/DialogAddPost";
import ModalDelete from "../components/dialogs/DialogDeletePost";
import useUpdatePost from "../actions/useUpdatePost";
import ModalEdit from "../components/dialogs/DialogEditPost";
import { IPost } from "../models/postModel";
import CardPost from "../components/cards/CardPost";
import useLogout from "@/features/auth/actions/useLogout";
import Pagination from "@/features/_global/components/Pagination";
import SkeletonCardPost from "../components/skeletons/SkeletonCardPost";

const PostView = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedPost, setSelectedPost] = useState<PostFormSchema | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const postModalRef = useRef<HTMLDialogElement>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const editModalRef = useRef<HTMLDialogElement>(null);

  const {
    data: listPosts,
    isLoading,
    isFetching,
  } = useGetPosts({ limit: 5, page: currentPage });
  const mutatePost = usePost();
  const mutateLogout = useLogout();
  const mutateDeletePost = useDeletePost();
  const mutateUpdatePost = useUpdatePost();

  const handleOpenEditModal = (post: IPost) => {
    setSelectedId(post.id);
    setSelectedPost({ title: post.title!, post: post.post! });
    editModalRef.current?.showModal();
  };

  const onUpdateConfirm = async (data: PostFormSchema) => {
    try {
      await mutateUpdatePost.mutateAsync({
        id: selectedId,
        ...data,
      });
      editModalRef.current?.close();
    } catch (error) {
      console.error("Gagal update:", error);
    }
  };
  const handleOpenPostModal = () => postModalRef.current?.showModal();

  const handleOpenDeleteModal = (id: number) => {
    setSelectedId(id);
    deleteModalRef.current?.showModal();
  };

  const onSubmitPost = async (data: PostFormSchema) => {
    try {
      await mutatePost.mutateAsync(data);
      postModalRef.current?.close();
    } catch (error) {
      console.error("Gagal:", error);
    }
  };

  const onDeleteConfirm = async () => {
    try {
      await mutateDeletePost.mutateAsync(selectedId!);
      deleteModalRef.current?.close();
    } catch (error) {
      console.error("Gagal hapus:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await mutateLogout.mutateAsync();
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };
  const dataPosts = listPosts?.data ?? [];
  const meta = listPosts?.meta;
  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-base-content/5">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-primary">
              Daftar Postingan
            </h1>
            <p className="text-base-content/60 text-sm flex items-center gap-2">
              Kelola konten di sini.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="btn btn-primary shadow-md hover:shadow-lg transition-all"
              onClick={handleOpenPostModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Post
            </button>

            <button
              className="btn btn-outline btn-error hover:text-white transition-all"
              onClick={handleLogout}
              disabled={mutateLogout.isPending}
            >
              {mutateLogout.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
              {mutateLogout.isPending ? "Keluar..." : "Keluar"}
            </button>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${isFetching ? "opacity-70" : "opacity-100"}`}
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCardPost key={i} />
            ))
          ) : dataPosts.length > 0 ? (
            dataPosts.map((post) => (
              <CardPost
                key={post.id}
                post={post}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-base-content/50 italic">
                Belum ada postingan.
              </p>
            </div>
          )}
        </div>
      </div>

      {!isLoading && meta && meta.lastPage > 1 && (
        <Pagination
          currentPage={meta.currentPage}
          lastPage={meta.lastPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <ModalPost
        ref={postModalRef}
        onSuccess={onSubmitPost}
        isPending={mutatePost.isPending}
      />
      <ModalEdit
        ref={editModalRef}
        initialData={selectedPost}
        onSuccess={onUpdateConfirm}
        isPending={mutateUpdatePost.isPending}
      />

      <ModalDelete
        ref={deleteModalRef}
        onConfirm={onDeleteConfirm}
        isPending={mutateDeletePost.isPending}
      />
    </div>
  );
};

export default PostView;
