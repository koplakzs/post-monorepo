const SkeletonCardPost = () => (
  <div className="card bg-base-100 shadow-xl opacity-50 animate-pulse">
    <div className="card-body gap-4">
      <div className="h-6 bg-base-300 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-base-200 rounded"></div>
        <div className="h-4 bg-base-200 rounded w-5/6"></div>
      </div>
      <div className="card-actions justify-end mt-4">
        <div className="h-8 bg-base-300 rounded w-20"></div>
        <div className="h-8 bg-base-300 rounded w-20"></div>
      </div>
    </div>
  </div>
);
export default SkeletonCardPost;
