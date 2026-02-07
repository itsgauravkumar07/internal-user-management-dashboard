
export default function Modal({ onClose, children }) {
    // if(!isModal) return;
  return (
    <div
        
        className="fixed top-0 left-0  min-h-screen backdrop-blur-md flex items-center justify-center w-full">
            <div className="fixed bg-white border h-fit w-100 rounded-lg">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 hover:text-white">X</button>
                {children}
            </div>
    </div>
  );
};