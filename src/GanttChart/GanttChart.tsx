import styles from './GanttChart.module.css';

export type GanttRow = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  order: number;
};

export type GanttChartProps = {
  items: GanttRow[];
};

export const GanttChart = ({ items }: GanttChartProps) => {
  return (
    <div className={styles.ganttChartOuterContainer}>
      <div className={styles.ganttChartLeftContainer}>left nav side</div>

      <div className={styles.ganttChartRightContainer}>
        {items.map((item) => (
          <div key={item.id} className={styles.ganttChartRow}>
            {item.title} - {item.startDate} - {item.endDate}
          </div>
        ))}
      </div>
    </div>
  );
};
