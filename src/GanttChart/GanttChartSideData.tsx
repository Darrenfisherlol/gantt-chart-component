import styles from './GanttChartSideData.module.css';
import { type GanttRow } from './GanttChart';
import { useState } from 'react';
import { useGanttChartSideDataDate } from './hooks/useGanttChartSideDataDate';

export interface GanttChartSideDataProps{
    items: GanttRow[];
    dateRange?: 'Day' | 'Week' | 'Month';
    theme?: 'Praire' | 'Mountain' | 'Forest';
};

export const GanttChartDataHeader = ({items, dateRange}: GanttChartSideDataProps) => {

    const {
        dateArray,
        gridTemplateColumns,
        getBarGridColumn,
    } = useGanttChartSideDataDate({ items, dateRange });

    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        item: GanttRow;
    } | null>(null);


    return (
    <div className={styles.GanttChartDataHeaderContainer}>
      {/* Header */}
      <div
        className={styles.timeline}
        style={{ gridTemplateColumns }}
      >
        {/* new header idea */}
        {/* have month centered in the middle of the div ~ which size is = to days cell size */}
        {/* ------ month ---------- month -------- */}
        {/* 1--2--3--4--...-31-1--------------31--  */}
        {dateArray.map((date) => (
          <div
            className={styles.timelineDay}
            key={date.getTime()}
          >
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        ))}
      </div>

    
      {/* Rows */}
      {items.map((item) => {
        const gridColumn = getBarGridColumn(item);

        return (
          <div
            className={styles.ganttRow}
            style={{ gridTemplateColumns }}
            key={item.id}
          >

            {/*data idea*/}
            {/*have a star flag tha is a solid line highlighting the border of the cell on ALL rows*/}
            {/*^ same have a end flag that is a solid line border on all cells where the last date occures*/}
            {/* types of events determine what color the row is  */}
            {/* blue - greeen - or red - orange */}
            {gridColumn && (

                // the bar itself
                <div
                className={styles.ganttBar}
                style={{ gridColumn }}
                
                onMouseEnter={(e) => {
                    setTooltip({
                    x: e.clientX,
                    y: e.clientY,
                    item,
                    });
                }}
                onMouseMove={(e) => {
                    setTooltip((prev) =>
                    prev
                        ? {
                            ...prev,
                            x: e.clientX,
                            y: e.clientY,
                        }
                        : null
                    );
                }}
                onMouseLeave={() => {
                    setTooltip(null);
                }}
            >
            </div>
            )}
        </div>
        );})}

        {tooltip && (
            <div
                className={styles.tooltip}
                style={{
                left: tooltip.x + 10,
                top: tooltip.y + 10,
                }}
            >
                <strong>{tooltip.item.title}:</strong>
                
                <div>
                    {tooltip.item.duration}
                </div>
                <div>
                    Start: {tooltip.item.startDate}
                </div>

                <div>
                    End: {tooltip.item.endDate}
                </div>
            </div>
        )}



    </div>
);};

