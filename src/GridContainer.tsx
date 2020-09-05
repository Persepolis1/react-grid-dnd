import React, { ReactChildren, useState } from "react";

interface Coordinate {
  x: number;
  y: number;
  h: number;
  w: number;
  key: number | string;
}

export type GridLayout = Array<Coordinate>;
type Props = {
  width: number;
  cols: number;
  rowHeight: number;
  gridLayout: GridLayout;
  children: ReactChildren;
  onLayoutChange: Function;
};
type XY = {
  x: number;
  y: number;
};
function GridContainer(props: Props) {
  const {
    width,
    cols,
    rowHeight,
    gridLayout,
    children,
    onLayoutChange,
  } = props;
  const colW = width / cols;
  const childrenArr = React.Children.toArray(children);
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [ixy, setiXY] = useState({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState(false);

  function moveToRight(key: Coordinate["key"], xy: XY) {
    onLayoutChange(
      gridLayout.map((coordinate) => {
        if (coordinate.key === key) {
          return {
            ...coordinate,
            x: Math.round(xy.x),
            y: Math.round(xy.y),
          };
        }
        return { ...coordinate };
      })
    );
  }

  console.log(gridLayout);
  return (
    <div
      style={{
        position: "relative",
        width,
        height: "550px",
      }}
    >
      {gridLayout.map((coordinate, index) => {
        return (
          <div
            onMouseDown={(event) => {
              setiXY({
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY,
              });
              setDragging(true);
            }}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onMouseMove={(event) => {
              console.log(event.pageX);
              console.log(coordinate.x);
              console.log(event.pageX - coordinate.x);

              if (isDragging) {
                const offset = event.nativeEvent.offsetX - ixy.x;
                console.log(offset);
                const offsetToH =
                  (event.nativeEvent.offsetY - ixy.y) / rowHeight;
                const offsetToW = offset / colW;
                moveToRight(coordinate.key, {
                  x: coordinate.x + offsetToW,
                  y: coordinate.y + offsetToH,
                });
              }
            }}
            key={coordinate.key}
            style={{
              position: "absolute",
              transform: `translate(${coordinate.x * colW}px, ${
                coordinate.y * rowHeight
              }px)`,
              width: coordinate.w * colW,
              height: coordinate.h * rowHeight,
            }}
          >
            {childrenArr[index]}
          </div>
        );
      })}
    </div>
  );
}

export default GridContainer;
