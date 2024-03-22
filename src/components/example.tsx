'use client'
import * as React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

export const Example = ({children}: any) => {
    const constraintsRef = useRef(null);

    return (
        <>
            <motion.div
                drag
                dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                style={{cursor: 'grab'}}
            >
                {children}
            </motion.div>
        </>
    );
};
