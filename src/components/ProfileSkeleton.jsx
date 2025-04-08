const ProfileSkeleton = () => {
  return (
    <div className="bg-white rounded-4xl shadow p-8 animate-pulse">
      <div className="flex flex-col items-center">
        {/* Avatar Skeleton */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-200" />
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-200" />
        </div>

        {/* Name and Badge Skeleton */}
        <div className="mt-6 text-center w-full">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-40 bg-gray-200 rounded-lg" />
            <div className="h-6 w-6 bg-gray-200 rounded-full" />
          </div>

          {/* Email Skeleton */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-48 bg-gray-200 rounded-lg" />
          </div>

          {/* Member Since Skeleton */}
          <div className="mt-4">
            <div className="h-4 w-32 bg-gray-200 rounded-lg mx-auto" />
          </div>
        </div>

        {/* Verification Status Skeleton */}
        <div className="mt-6">
          <div className="h-10 w-48 bg-gray-200 rounded-full" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="mt-8 flex w-full justify-center gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded-lg" />
          <div className="h-10 w-32 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
