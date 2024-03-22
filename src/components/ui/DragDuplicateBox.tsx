import type { CSSProperties, FC } from "react";
import { memo, useEffect } from "react";
import type { DragSourceMonitor } from "react-dnd";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { Box } from "./Box";
import { ItemTypes } from "./Container";

function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
  width: number,
  height: number
): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: height,
    width: width,
  };
}

export interface DraggableDuplicateBoxProps {
  id: string;
  title: string;
  left: number;
  top: number;
  addBox?: (id: string, left: number, top: number, title: string) => void;
  onClick?: () => void;
  jumlah: {
    jumlahXKuadrat: number;
    jumlahX: number;
    jumlahKonstanta: number;
  };
}
export const DragDuplicateBox: FC<DraggableDuplicateBoxProps> = memo(
  function DraggableBox(props) {
    const { id, title, left, top, addBox } = props;

    const jumlahSisa =
      title === "X^2"
        ? props.jumlah.jumlahXKuadrat
        : title === "X"
        ? props.jumlah.jumlahX
        : title === "1"
        ? props.jumlah.jumlahKonstanta
        : 0;

    const [{ isDragging }, drag, preview] = useDrag(
      () => ({
        type: ItemTypes.BOX,
        collect: (monitor: DragSourceMonitor) => ({
          isDragging: monitor.isDragging(),
        }),
        item: () => {
          const newId = Math.random().toString(36).substr(2, 9); // Generate a random id
          // addBox(newId, left, top, title)
          return { id: newId, left, top, title };
        },
      }),
      [id, left, top, title, addBox]
    );

    // useEffect(() => {
    //     preview(getEmptyImage(), { captureDraggingState: true })
    // }, [])

    return (
      <div
        // ref={drag}
        style={getStyles(left, top, isDragging, 100, 100)}
        // role="DraggableBox"
        className={
          "max-w-22 min-w-22 max-h-22 min-h-22 flex flex-col items-center"
        }
        onClick={props.onClick}
      >
        {title !== "X(h)" && <span>{jumlahSisa}</span>}
        <Box title={title} />
      </div>
    );
  }
);
