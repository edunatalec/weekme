export const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary"></div>
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary delay-150"></div>
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary delay-300"></div>
    </div>
  );
};
