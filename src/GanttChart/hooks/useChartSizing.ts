import { useRef, useState } from "react";

export interface ChartSizingProps {
  
}

export interface ChartSizingResults {
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  leftWidth: number;
  handleChartResize: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export function useChartSizing({}: ChartSizingProps ): ChartSizingResults {

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(20);
  const isResizing = useRef(false);
  const handleChartResize = (e: React.MouseEvent) => {
    e.preventDefault();

    isResizing.current = true;

    const container = chartContainerRef.current;

    if (!container) {
      return;
    }

    const startXAxis = e.clientX;
    const startWidth = leftWidth;
    const containerWidth = container.getBoundingClientRect().width;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) {
        return;
      }

      const deltaX = e.clientX - startXAxis;
      const deltaPercent = (deltaX / containerWidth) * 100;

      const newWidth = startWidth + deltaPercent;
      
      // the left container can only be a min of 10% and a max of 90%
      const width = Math.min(90,Math.max(10, newWidth));

      setLeftWidth(width);
  };

  const handleMouseUp = () => {
    isResizing.current = false;

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
  };

  return {
    chartContainerRef,
    leftWidth,
    handleChartResize,
  }
}
