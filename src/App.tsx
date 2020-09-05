import React, { useState } from "react";
import GridContainer, { GridLayout } from "./GridContainer";
import { log } from "util";

const initialLayout: GridLayout = [
  {
    x: 0,
    y: 0,
    w: 2,
    h: 4,
    key: 1,
  },
  {
    x: 2,
    y: 0,
    w: 2,
    h: 1,
    key: 2,
  },
  {
    x: 5,
    y: 2,
    w: 2,
    h: 3,
    key: 3,
  },
];

const colors = ["red", "green", "blue", "orange"];

function App() {
  const [layout, setLayout] = useState(initialLayout);

  return (
    // @ts-ignore
    <GridContainer
      width={1000}
      cols={24}
      rowHeight={50}
      gridLayout={layout}
      onLayoutChange={(gridLayout: GridLayout) => {
        setLayout(gridLayout);
      }}
    >
      {/** @ts-ignore */}
      {layout.map((item, index) => (
        <div
          key={item.key}
          style={{
            background: colors[index % colors.length],
            height: "100%",
            width: "100%",
          }}
        >
          Hey {index}
        </div>
      ))}
    </GridContainer>
  );
}

export default App;
