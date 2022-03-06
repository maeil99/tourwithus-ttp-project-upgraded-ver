interface IPageProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Container = ({ children, className }: IPageProps) => {
    return (
      <div
        className={`mx-auto w-full xl:px-44 ${className} max-w-screen-md md:max-w-8xl p-5 md:py-14`}
      >
        {children}
      </div>
    );
  };
  
  export default Container;