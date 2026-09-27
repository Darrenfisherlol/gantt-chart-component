import type { GanttRow } from '../GanttChart';

type DateRange = 'Day' | 'Week' | 'Month';

export interface GanttChartSideDataDateProps{
    items: GanttRow[];
    dateRange?: DateRange;
}

export interface GanttChartSideDataDateResults{
    dateArray: Date[];
    gridTemplateColumns: string;
    getBarGridColumn: (item: GanttRow) => string | null;
}


// new Date('2025-09-15') parses as UTC midnight, which is the day before in US timezones - so parse YYYY-MM-DD as a local calendar date instead
// do I wnat hte us timezone?? 
const parseDate = (value: string): Date => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    return match
        ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
        : new Date(value);
};

// round a date down to the start of the column it lives in
const getBucketStart = (date: Date, dateRange?: DateRange): Date => {
    const bucketStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (dateRange === 'Week') {
        bucketStart.setDate(bucketStart.getDate() - bucketStart.getDay());
    } else if (dateRange === 'Month') {
        bucketStart.setDate(1);
    }

    return bucketStart;
};

// move a date forward (or backward with a negative count) by whole columns
const addBuckets = (date: Date, dateRange: DateRange | undefined, count: number): Date => {
    const result = new Date(date);

    if (dateRange === 'Week') {
        result.setDate(result.getDate() + count * 7);
    } else if (dateRange === 'Month') {
        result.setMonth(result.getMonth() + count);
    } else {
        result.setDate(result.getDate() + count);
    }

    return result;
};

// add extra days before / after 
const paddingBuckets = { Day: 5, Week: 1, Month: 1 };

export function useGanttChartSideDataDate({items, dateRange}:GanttChartSideDataDateProps): GanttChartSideDataDateResults
{
    const dates = items.map((x) => ({
        startDate: x.startDate,
        endDate: x.endDate,
    }));

    const startDates = dates.map(x => x.startDate).filter(Boolean).map(parseDate);
    const endDates = dates.map(x => x.endDate).filter(Boolean).map(parseDate);

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

    // pad by whole columns: 5 days, 1 week, or 1 month on each side
    // snap to the column start first so month math can't overflow (Jan 31 + 1 month = Mar 3)
    const padding = paddingBuckets[dateRange ?? 'Day'];
    startDate = addBuckets(getBucketStart(startDate, dateRange), dateRange, -padding);
    endDate = addBuckets(getBucketStart(endDate, dateRange), dateRange, padding);

    function getDatesBetween(startDate: Date, endDate: Date): Date[] {
        const dates: Date[] = [];
        // start on the first column (day / Sunday / 1st of month) that contains startDate
        const currentDate = getBucketStart(startDate, dateRange);

        if (dateRange === 'Day') {
            while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
        else if(dateRange === 'Week'){
            while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 7);
            }
        } else if(dateRange === 'Month'){
            while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        }

        return dates;
    }

    const dateArray = getDatesBetween(startDate,endDate);

    const gridTemplateColumns = `repeat(${dateArray.length}, minmax(80px, 1fr))`;

    const getBarGridColumn = (item: GanttRow): string | null => {
        const itemStart = getBucketStart(parseDate(item.startDate), dateRange);
        const itemEnd = getBucketStart(parseDate(item.endDate), dateRange);

        // inclusive ~ round up. the bar fills every column the item touches
        // ex: ends on monday of week 5 -> the entire week 5 column is filled
        const startIndex = dateArray.findIndex(
          (date) =>
            date.toDateString() === itemStart.toDateString()
        );

        const endIndex = dateArray.findIndex(
          (date) =>
            date.toDateString() === itemEnd.toDateString()
        );

        if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
            return null;
        }

        // grid lines are 1-based and the end line is exclusive, so +2 fills the end column
        return `${startIndex + 1} / ${endIndex + 2}`;
    };

    return {
        dateArray,
        gridTemplateColumns,
        getBarGridColumn,
    }
}
