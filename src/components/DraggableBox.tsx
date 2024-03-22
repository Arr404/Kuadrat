// components/DraggableBox.js

import { motion } from 'framer-motion';
interface DraggableBoxProps {
    id: number;
    left: number;
    top: number;
    children?: React.ReactNode;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ id, left, top, children }) => {
    return (
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 500, top: 0, bottom: 500 }}
        >
            {children}
        </motion.div>
    );
};

export default DraggableBox;
