import { FC, ReactNode } from 'react';

interface ModalProps {
    onCloseModal: (value: boolean) => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onCloseModal, children }) => {
    const handleCloseModal = () => {
        onCloseModal(false);
    };

    return (
        <div
            onClick={handleCloseModal}
            className='absolute h-screen w-screen bg-gray03 top-0 left-0 z-50'
        >
            {children}
        </div>
    );
};

export default Modal;
