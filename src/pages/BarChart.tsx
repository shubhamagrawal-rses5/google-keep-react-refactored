import React from "react";
import useNotes from "../hooks/useNotes";
import { Axis, BarSeries, Tooltip, XYChart, lightTheme } from "@visx/xychart";

type DataType = {
  x: string;
  y: number;
  color?: string;
};
function BarChart() {
  const [notesState] = useNotes();
  const { notes } = notesState;
  const pinnedNotesCount = notes.filter((note) => note.isPinned).length;
  const unPinnedNotesCount = notes.filter((note) => !note.isPinned).length;
  const completedNotesCount = notes.filter((note) => note.isCompleted).length;

  const data: DataType[] = [
    { x: "Pinned Notes", y: pinnedNotesCount, color: "#FAAFA8" },
    { x: "Other Notes", y: unPinnedNotesCount, color: "#feefc3" },
    { x: "Completed Notes", y: completedNotesCount },
  ];

  const accessors = {
    xAccessor: (d: DataType) => d.x,
    yAccessor: (d: DataType) => d.y,
    colorAccessor: (d: DataType) => d.color,
  };

  return (
    <div className="chart-area">
      <div className="barchart">
        <XYChart
          theme={lightTheme}
          height={600}
          width={600}
          xScale={{
            type: "band",
            paddingOuter: 0.4,
            paddingInner: 0.4,
          }}
          yScale={{ type: "linear", zero: false, domain: [0, 8] }}
        >
          <BarSeries
            dataKey="Notes Count"
            data={data}
            {...accessors}
            radiusTop={true}
            radius={6}
          />
          <Tooltip
            renderTooltip={({ tooltipData }) => (
              <div>
                {accessors.xAccessor(
                  tooltipData?.nearestDatum?.datum as DataType
                )}
                {", "}
                {accessors.yAccessor(
                  tooltipData?.nearestDatum?.datum as DataType
                )}
              </div>
            )}
          />
          <Axis key={`notes-types-axis`} orientation="bottom" label={"Notes"} />
          <Axis
            key={`count-axis`}
            label={"Notes Count"}
            orientation="left"
            numTicks={5}
            stroke="black"
            strokeWidth={2}
          />
        </XYChart>
      </div>
    </div>
  );
}

export default BarChart;
