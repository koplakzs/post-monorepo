"use client";

import React from "react";
import Link from "next/link";
import { IPost } from "../../models/postModel";

interface CardPostProps {
  post: IPost;
  onEdit: (post: IPost) => void;
  onDelete: (id: number) => void;
}

const CardPost = ({ post, onEdit, onDelete }: CardPostProps) => {
  return (
    <div className="card bg-base-100/70 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-xl duration-300 transition-all group">
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold text-primary line-clamp-2">
          {post.title}
        </h2>
        <p className="text-base-content/70 line-clamp-3 text-sm">{post.post}</p>

        <div className="card-actions justify-end mt-6 pt-4 border-t border-base-content/5 gap-2">
          <Link
            href={`/${post.id}`}
            className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
          >
            Detail
          </Link>

          <button
            className="btn btn-ghost btn-sm text-info hover:bg-info/10"
            onClick={() => onEdit(post)}
          >
            Edit
          </button>

          <button
            className="btn btn-ghost btn-sm text-error hover:bg-error/10"
            onClick={() => onDelete(post.id!)}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPost;
