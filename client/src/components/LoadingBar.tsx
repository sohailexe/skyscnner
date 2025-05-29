const LoadingBar = ({ text }: { text?: string }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-muted-foreground">
        {text ? `Loading ${text}...` : "Loading..."}
      </p>
    </div>
  );
};

export default LoadingBar;
