type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
};

const Modal = ({ isOpen, children, title }: Props) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl mb-4">{title}</h2>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
