export const SystemChangeSkeleton = () => {
  return (
    <div className="hidden md:flex w-full justify-end text-lg font-bold pr-3">
      <button
        className={`flex items-center justify-center w-10 h-10 bg-blue1 rounded-full  mr-3 disabled:text-gray5`}
        disabled={true}
      >
        °C
      </button>
      <button
        className={`flex items-center justify-center w-10 h-10 bg-blue1 rounded-full  disabled:text-gray5`}
        disabled={true}
      >
        °F
      </button>
    </div>
  );
};
