import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer'

export const Example: FC = () => {
    const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true)
    const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(false)

    const handleSnapToGridAfterDropChange = useCallback(() => {
        setSnapToGridAfterDrop(!snapToGridAfterDrop)
    }, [snapToGridAfterDrop])

    const handleSnapToGridWhileDraggingChange = useCallback(() => {
        setSnapToGridWhileDragging(!snapToGridWhileDragging)
    }, [snapToGridWhileDragging])

    return (
        <div>
            <Container snapToGrid={snapToGridAfterDrop} />
            <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
        </div>
    )
}
