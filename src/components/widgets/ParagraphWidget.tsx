const ParagraphWidget = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`font-mulish text-[16px] md:text-[17px] 2xl:text-[18px] font-normal text-black leading-[26px] ${className}`}
    >
      {children}
    </p>
  );
};

export default ParagraphWidget;
