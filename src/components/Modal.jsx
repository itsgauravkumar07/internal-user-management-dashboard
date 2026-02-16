
export default function Modal({ onClose, children }) {
    
  return (
    <div
        
        className="fixed top-0 left-0  min-h-screen backdrop-blur-md flex items-center justify-center w-full">
            <div className="fixed border border-white/10 h-fit w-100 rounded-lg">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 bg-red-500/10 px-3 py-1 rounded hover:bg-red-500/90 hover:text-white text-sm">X</button>
                {children}
            </div>
    </div>
  );
};
