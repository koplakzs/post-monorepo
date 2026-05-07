const SkeletonPage = () => {
  return (
    <div className="p-8 space-y-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-10 bg-base-300 rounded-lg w-full"></div>
        <div className="h-10 bg-base-300 rounded-lg w-2/3"></div>
      </div>

      <div className="h-px bg-base-content/5 w-full"></div>

      <div className="space-y-4">
        <div className="h-4 bg-base-200 rounded w-full"></div>
        <div className="h-4 bg-base-200 rounded w-full"></div>
        <div className="h-4 bg-base-200 rounded w-full"></div>
        <div className="h-4 bg-base-200 rounded w-5/6"></div>
        <div className="h-4 bg-base-200 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export default SkeletonPage;
