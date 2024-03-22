import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

export const DraggableItem = ({ children } : any) => {
    const [isDragging, setIsDragging] = useState(false);
    const controls = useAnimation();

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (event: any, info: { point: { x: any; y: any; }; }) => {
        setIsDragging(false);
        const dropPosition = { x: info.point.x, y: info.point.y };
        console.log('Dropped at:', dropPosition); // You can handle drop position here
    };

    return (
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
            {children}
        </motion.div>
    );
};
