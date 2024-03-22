import type { CSSProperties, FC } from 'react'
import { memo } from 'react'

const styles: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

export interface BoxProps {
    title: string
    yellow?: boolean
    preview?: boolean
}

export const Box: FC<BoxProps> = memo(function Box({ title, yellow, preview }) {
    const backgroundColor = yellow ? 'yellow' : 'white'
    const size = title === "X" ? 2 : 4
    return (
        <div
            className={`p-10 w-[${(size).toString()}rem] h-[${(size).toString()}rem] flex justify-center items-center overflow-hidden p-2 cursor-move`}
            style={{ ...styles, backgroundColor }}
            role={preview ? 'BoxPreview' : 'Box'}
        >
            {title}
        </div>
    )
})
