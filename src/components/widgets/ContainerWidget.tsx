const ContainerWidget = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[90vw] lg:w-[80vw] xl:w-[68vw] 2xl:w-[68vw] mx-auto max-w-[1920px]">
      {children}
    </div>
  );
};

export default ContainerWidget;
