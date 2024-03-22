'use client'
import * as React from "react";
import {initial, reducer} from "@/components/reducer";
import { motion } from "framer-motion";
import {fruit} from "@/components/fruit";
import {useEffect, useState} from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {Draggable} from "@/components/Draggable";
import {Example} from "@/components/ui/Example";


export default function Page(){
    const [parent, setParent] = useState(null);
    const draggable = (
        <Draggable id="draggable">
            Go ahead, drag me.
        </Draggable>
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <Example />
        </DndProvider>
    );

    function handleDragEnd({over} : any) {
        setParent(over ? over.id : null);
    }
};
