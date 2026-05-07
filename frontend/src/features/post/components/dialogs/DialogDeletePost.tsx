"use client";

import { forwardRef, RefObject } from "react";

interface ModalDeleteProps {
  onConfirm: () => Promise<void>;
  isPending: boolean;
}

const ModalDelete = forwardRef<HTMLDialogElement, ModalDeleteProps>(
  ({ onConfirm, isPending }, ref) => {
    return (
      <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box border-t-4 border-error">
          <h3 className="font-bold text-lg text-error">Konfirmasi Hapus</h3>
          <p className="py-4 text-base-content/70">
            Yakin ingin menghapus postingan ini?
          </p>
          <div className="modal-action gap-2">
            <button
              className="btn btn-ghost"
              onClick={() =>
                (ref as RefObject<HTMLDialogElement>).current?.close()
              }
            >
              Batal
            </button>
            <button
              className="btn btn-error text-white"
              onClick={onConfirm}
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Ya, Hapus"
              )}
            </button>
          </div>
        </div>
      </dialog>
    );
  },
);

ModalDelete.displayName = "ModalDelete";
export default ModalDelete;
