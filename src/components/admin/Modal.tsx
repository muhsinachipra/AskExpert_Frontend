// frontend/src/components/Modal.tsx

import { ReactNode } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="fixed bg-white rounded-lg p-4 w-1/2">
                <button type="button" className="absolute top-2 right-2" onClick={onClose} aria-label="Close modal"> <IoIosCloseCircle style={{fontSize: "30px"}}/> </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
