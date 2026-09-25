import styles from './GanttChartSideData.module.css';
import { type GanttRow } from './GanttChart';
import { useState } from 'react';
export interface GanttChartSideDataProps{
    items: GanttRow[];
};

export const GanttChartDataHeader = ({items}: GanttChartSideDataProps) => {

    // maybe add some flex dates to end and start
    const dates = items.map((x) => ({
        startDate: x.startDate,
        endDate: x.endDate,
    }));

    // Find the earliest valid start date
    let startDates = dates.map(x => x.startDate).filter(Boolean).map(x => new Date(x));

    // Find the latest valid end date
    let endDates = dates.map(x => x.endDate).filter(Boolean).map(x => new Date(x));

    // add a buffer of 4 days to each start and end
    // I did 7 and I did not like it... so 4 is cool
    startDates = startDates.map(date => {
        const bufferedDate = new Date(date);
        bufferedDate.setDate(bufferedDate.getDate() - 4);
        return bufferedDate;
    });

    endDates = endDates.map(date => {
        const bufferedDate = new Date(date);
        bufferedDate.setDate(bufferedDate.getDate() + 4);
        return bufferedDate;
    });

    // initialize top header min / max date
    let startDate: Date;
    let endDate: Date;

    // what if we have a invalid start or end date
    if (startDates.length === 0 && endDates.length === 0) {
        // Both missing:
        // start = today
        // end = today + 1 year
        startDate = new Date();
        endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);
    } else if (startDates.length === 0) {
        // No start dates:
        // start = end - 1 year
        endDate = new Date(Math.max(...endDates.map(d => d.getTime())));
        startDate = new Date(endDate);
        startDate.setFullYear(startDate.getFullYear() - 1);
    } else if (endDates.length === 0) {
        // No end dates:
        // end = start + 1 year
        startDate = new Date(Math.min(...startDates.map(d => d.getTime())));
        endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
        // Both exist:
        // start = minimum start date
        // end = maximum end date
        startDate = new Date(Math.min(...startDates.map(d => d.getTime())));

        endDate = new Date(Math.max(...endDates.map(d => d.getTime())));
    }

    function getDatesBetween(startDate: Date, endDate: Date): Date[] {
        const dates: Date[] = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    const dateArray = getDatesBetween(startDate,endDate);

    // constant grid ~ coordinate system ~ for the header and body
    const gridTemplateColumns = `repeat(${dateArray.length}, minmax(80px, 1fr))`;

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
        const itemStart = new Date(item.startDate);
        const itemEnd = new Date(item.endDate);

        const startIndex = dateArray.findIndex(
          (date) =>
            date.toDateString() === itemStart.toDateString()
        );

        const endIndex = dateArray.findIndex(
          (date) =>
            date.toDateString() === itemEnd.toDateString()
        );

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
            {startIndex !== -1 && endIndex !== -1 && (  
                
                // the bar itself
                <div
                className={styles.ganttBar}
                style={{gridColumn: `${startIndex + 1} / ${endIndex + 2}`,}}
                
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

