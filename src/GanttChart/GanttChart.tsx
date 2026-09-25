import { useRef, useState } from 'react';
import styles from './GanttChart.module.css';
import { useChartSizing } from './hooks/useChartSizing';
import { GanttChartDataHeader } from './GanttChartSideData';

export type GanttRow = {
  // must be a unique row identified. will assign a value if none provided
  id?: number;
  title: string;
  startDate: string;
  duration: string;
  endDate: string;
};

export type GanttChartProps = {
  items: GanttRow[];
  // Prairie green yellow, Diving gray blue, Hiking green brown
  theme?: string;
  // Small, Medium, Large
  size?: string;
};

export const GanttChart = ({ items, theme, size}: GanttChartProps) => {

  const calculateDifference = (start: string | null, end: string | null): string => {
    if (!start || !end) {
      return "-";
    }

    const startMs: number = new Date(start).getTime();
    const endMs: number = new Date(end).getTime();

    // invalid date ~ user needs ISO date format YYYY-MM-dd... or whatever it is
    if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
      return 'invalid date format';
    }

    const diffMs: number = endMs - startMs;
  
    // Convert milliseconds to days (1000ms * 60s * 60m * 24h) + 1 day
    // note ex - inclusion of duration: 1 day =  1/23/24 - 1/23/24
    return Math.floor(diffMs / (1000 * 60 * 60 * 24) + 1).toString() + " Days";
  };

  // if the user gave us Ids, use them else
  const chartItems = items.map((item, index) => ({
  id: item.id ?? index,
  title: item.title,
  startDate: item.startDate,
  endDate: item.endDate,
  duration: calculateDifference(item.startDate, item.endDate)
}));


  const {
    chartContainerRef,
    leftWidth,
    handleChartResize,
  } = useChartSizing({});

  const [selectedRow, setSelectedRow] = useState<number|null>(null);


  const handleClickOnRow = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    // if clicked on row again, unselect
    if (index == selectedRow) {
      setSelectedRow(null);  
    }

  
    setSelectedRow(index);
  } 

  

  return (
    <div 
    className={`${styles.ganttChartOuterContainer} ${styles[`ganttChartOuterContainer${size}`]}`}
    >
      <div 
      className={styles.ganttChartRowContainer}
      ref={chartContainerRef} >

        <div
          className={styles.ganttChartLeftContainer}
          style={{ width: `${leftWidth}%` }}
        >
          <table className={styles.ganttChartTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>Duration</th>
                <th>End Date</th>
              </tr>
            </thead>

            <tbody>
              {[...chartItems]
                .map((item) => (
                  <tr
                    key={item.id}
                    onClick={(e) => handleClickOnRow(e, item.id)}
                  >
                    <td>{item.title}</td>
                    <td>{item.startDate}</td>
                    <td>{item.duration}</td>
                    <td>{item.endDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div 
          className={styles.ganttChartDividerContainer}
          onMouseDown={handleChartResize}
        ></div>

        <div className={styles.ganttChartRightContainer}>
      
          <GanttChartDataHeader
            items={chartItems}
          />
        </div>
      </div>
      
    </div>
  );
};


//  <div 
//         className={styles.ganttChartLeftContainer}
//         style={{ width: `${leftWidth}%` }}
//         >
          
//             <div className={styles.ganttChartHeader}>
//               <div>Name</div>  
//               <div>StartDate</div>  
//               <div>aa</div>  
//             </div>
//             {
//               chartItems
//               .sort((a, b) => order ? a.id - b.id: b.id - a.id)
//               .map((item) => (
//                 <div 
//                 key={item.id} 
//                 className={styles.ganttChartRow}
//                 onClick={(e => handleClickOnRow(e, item.id))}
//                 >
//                   {item.title}
//                   {/* <dropdown>
//                   - {item.startDate} - {item.endDate}
//                   </dropdown> */}
//                 </div>
//               ))
//             }
         
//         </div>
