import update from 'immutability-helper'
import React, {CSSProperties, FC, useEffect, useRef} from 'react'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { snapToGrid as doSnapToGrid } from './snapToGrid'
import { DraggableBox } from './DraggableBox'
import {DragDuplicateBox} from "@/components/ui/DragDuplicateBox";
import {KoordinatToEquation} from "@/components/function/KoordinatToEquation";

export interface DragItem {
    id: string
    type: string
    left: number
    top: number
}
export const ItemTypes = {
    BOX: 'box',
}


const styles: CSSProperties = {
    width: 300,
    height: 300,
    border: '1px solid black',
    position: 'relative',
}

export interface ContainerProps {
    snapToGrid: boolean
}

export interface BoxMap {
    [key: string]: { top: number; left: number; title: string }
}

export const Container: FC<ContainerProps> = ({ snapToGrid }) => {
    const [boxes, setBoxes] = useState<BoxMap>({})
    const [boxesDuplicate, setBoxesDuplicate] = useState<BoxMap>({
        a: { top: 20, left: 80, title: 'X' },
        b: { top: 180, left: 20, title: 'X' },
    })
    const addBox = useCallback(
        (id: string, left: number, top: number, title: string) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $set: { left, top, title },
                    },
                }),
            )
        },
        [boxes],
    )
    useEffect(() => {
        console.log(KoordinatToEquation(boxes))
        console.log(boxes)
    },[boxes])

    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [boxes],
    )
    const dropRef = useRef<HTMLDivElement | null>(null);
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item: DragItem, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset() as {
                    x: number
                    y: number
                }

                let left = Math.round(item.left + delta.x)
                let top = Math.round(item.top + delta.y)
                if (snapToGrid) {
                    ;[left, top] = doSnapToGrid(left, top)
                }
                // Get the bounding rectangle of the drop area
                let dropAreaRect = null
                if (dropRef.current) {
                    dropAreaRect = dropRef.current.getBoundingClientRect()
                } else {
                    // Handle the case when dropRef.current is null
                    // For example, you can return from the function
                    return;
                }
                // Check if the drop location is within the bounds of the drop area
                if (
                    left < dropAreaRect.left ||
                    top < dropAreaRect.top ||
                    left > dropAreaRect.right ||
                    top > dropAreaRect.bottom
                ) {
                    // If not, return without calling addBox
                    return
                }
                moveBox(item.id, left, top)
                return undefined
            },
        }),
        [moveBox],
    )

    useEffect(() => {
        if (dropRef.current) {
            drop(dropRef.current);
        }
    }, [drop]);
    return (
        <div>
            <div ref={dropRef} style={styles}>
                {Object.keys(boxes).map((key) => (
                    <DraggableBox
                        key={key}
                        id={key}
                        {...(boxes[key] as { top: number; left: number; title: string })}
                    />
                ))}
            </div>
            <div>
            {Object.keys(boxesDuplicate).map((key) => (
                <DragDuplicateBox
                    key={key}
                    id={key}
                    onClick={() => addBox(Math.random().toString(36).substr(2, 9), boxesDuplicate[key].left, boxesDuplicate[key].top, boxesDuplicate[key].title)}
                    {...(boxesDuplicate[key] as { top: number; left: number; title: string })}
                />
                ))}
            </div>
        </div>
    )
}
