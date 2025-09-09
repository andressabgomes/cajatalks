import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentMounts: number;
  memoryUsage?: number;
}

export function usePerformance(componentName: string) {
  const renderStartTime = useRef<number>(Date.now());
  const mountCount = useRef<number>(0);
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    componentMounts: 0,
  });

  // Track component mounts
  useEffect(() => {
    mountCount.current += 1;
    metricsRef.current.componentMounts = mountCount.current;

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 ${componentName} mounted (${mountCount.current} times)`);
    }
  }, [componentName]);

  // Track render performance
  useEffect(() => {
    const renderTime = Date.now() - renderStartTime.current;
    metricsRef.current.renderTime = renderTime;

    if (process.env.NODE_ENV === 'development' && renderTime > 100) {
      console.warn(`⚠️ ${componentName} slow render: ${renderTime}ms`);
    }
  });

  // Update render start time
  renderStartTime.current = Date.now();

  // Get memory usage (if available)
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      return (performance as any).memory?.usedJSHeapSize || 0;
    }
    return 0;
  }, []);

  // Log performance metrics
  const logMetrics = useCallback(() => {
    const memoryUsage = getMemoryUsage();
    const metrics = {
      ...metricsRef.current,
      memoryUsage,
    };

    console.table({
      [componentName]: metrics,
    });

    return metrics;
  }, [componentName, getMemoryUsage]);

  return {
    metrics: metricsRef.current,
    logMetrics,
  };
}

// Hook for measuring function execution time
export function useExecutionTime() {
  const measureTime = useCallback(<T extends any[], R>(
    fn: (...args: T) => R,
    name?: string
  ) => {
    return (...args: T): R => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      const duration = end - start;

      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${name || 'Function'} executed in ${duration.toFixed(2)}ms`);
      }

      return result;
    };
  }, []);

  return { measureTime };
}