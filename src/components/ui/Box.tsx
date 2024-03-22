import type { CSSProperties, FC } from "react";
import { memo } from "react";

const styles: CSSProperties = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  cursor: "move",
};

export interface BoxProps {
  title: string;
  yellow?: boolean;
  preview?: boolean;
}

export const Box: FC<BoxProps> = memo(function Box({ title, yellow, preview }) {
  const backgroundColor =
    title === "X^2"
      ? "bg-blue-400"
      : title === "1"
      ? "bg-orange-400"
      : "bg-green-400";
  const size = title === "X^2" ? 4 : title == "X(h)" ? 4 : title == "X" ? 2 : 2;
  const sizeHeight =
    title === "X^2" ? 4 : title == "X(h)" ? 2 : title === "X" ? 4 : 2;
  const widthFromSize = `${size}rem`;
  const heightFromSize = `${sizeHeight}rem`;
  return (
    <div
      className={`p-2 flex justify-center items-center overflow-hidden cursor-move ${backgroundColor}`}
      style={{
        ...styles,
        width: widthFromSize,
        height: heightFromSize,
      }}
      role={preview ? "BoxPreview" : "Box"}
    >
      {title}
    </div>
  );
});
