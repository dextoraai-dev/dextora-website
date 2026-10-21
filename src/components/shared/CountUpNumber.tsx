// src/components/shared/CountUpNumber.tsx
import React from "react";
import { useCountUp } from "../../hooks/useCountUp";

interface CountUpNumberProps {
  /** Target number to count up to */
  end: number;
  /** Animation duration in ms */
  durationMs?: number;
  /** Decimal places */
  decimals?: number;
  /** Additional CSS classes */
  className?: string;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({ end, durationMs = 1500, decimals = 0, className }) => {
  const { value, ref } = useCountUp({ end, durationMs, decimals, startWhenVisible: true });
  return (
    <span ref={ref} className={className}>
      {value.toLocaleString(undefined, { maximumFractionDigits: decimals })}
    </span>
  );
};

export default CountUpNumber;
