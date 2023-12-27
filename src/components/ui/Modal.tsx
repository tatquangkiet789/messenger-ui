import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface ModalProps {
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
    return (
        <div
            className='absolute h-screen w-screen bg-gray03 top-0 left-0 z-50 
                flex items-center justify-center'
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                className='bg-white w-96 h-[75vh] rounded-lg flex flex-col'
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Modal;
