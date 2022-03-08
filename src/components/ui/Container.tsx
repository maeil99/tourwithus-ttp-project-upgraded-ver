interface IPageProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Container = ({ children, className }: IPageProps) => {
    return (
      <div
        className={`mx-auto w-full ${className} max-w-screen-md md:max-w-7xl p-5 md:py-14`}
      >
        {children}
      </div>
    );
  };
  
  export default Container;