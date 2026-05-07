"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useGetDetailPost from "../actions/useGetDetailPost";
import SkeletonPage from "../components/skeletons/SkeletonPage";

const DetailPostView = () => {
  const params = useParams();
  const id = params.slug;

  const { data: detailPost, isLoading } = useGetDetailPost(Number(id));

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="btn btn-ghost btn-sm mb-8 gap-2 hover:bg-primary/10 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Daftar
        </Link>

        <article className="card bg-base-100/70 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
          {isLoading ? (
            <SkeletonPage />
          ) : (
            <>
              <div className="p-8 pb-0">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight">
                  {detailPost?.title}
                </h1>
              </div>

              <div className="p-8">
                <div className="prose prose-lg max-w-none text-base-content/80 leading-relaxed whitespace-pre-line">
                  {detailPost?.post}
                </div>
              </div>
            </>
          )}
        </article>
      </div>
    </div>
  );
};

export default DetailPostView;
