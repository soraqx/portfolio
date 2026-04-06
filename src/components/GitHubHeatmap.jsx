import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GitHubHeatmap({ compact = false }) {
  const [tooltip, setTooltip] = useState(null);

  const weeks = compact ? 20 : 52;
  const days = 7;
  
  const generateData = () => {
    const data = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < days; d++) {
        week.push({
          date: new Date(2025, 0, 1 + w * 7 + d),
          count: Math.floor(Math.random() * 10),
          level: Math.floor(Math.random() * 6),
        });
      }
      data.push(week);
    }
    return data;
  };

  const contributionData = generateData();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-full flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`font-mono font-bold text-center ${compact ? 'text-sm mb-1' : 'text-3xl mb-4'}`}
      >
        GitHub Contributions
      </motion.h2>
      <p className={`text-text-secondary text-center ${compact ? 'text-xs mb-2' : 'mb-8'}`}>
        Last year's contribution activity
      </p>

      <div className={`overflow-x-auto ${compact ? 'flex-1' : ''}`}>
        <div className={`flex gap-[2px] min-w-max ${compact ? 'mx-auto w-fit' : ''}`}>
          {contributionData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`${compact ? 'w-2 h-2' : 'w-3 h-3'} rounded-sm cursor-pointer heatmap-level-${day.level} hover:ring-1 hover:ring-accent`}
                  onMouseEnter={() => setTooltip({ date: formatDate(day.date), count: day.count })}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {tooltip && compact && (
        <div className="text-center text-[10px] text-text-secondary mt-1">
          {tooltip.date}: {tooltip.count}
        </div>
      )}

      <div className={`flex items-center justify-end gap-1 text-[10px] text-text-secondary ${compact ? 'mt-1' : 'mt-4'}`}>
        <span>Less</span>
        {[0, 1, 2, 3, 4, 5].map(level => (
          <div key={level} className={`${compact ? 'w-2 h-2' : 'w-3 h-3'} rounded-sm heatmap-level-${level}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
