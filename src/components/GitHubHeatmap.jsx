import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GitHubHeatmap() {
  const [tooltip, setTooltip] = useState(null);

  // TODO: Replace with real GitHub API data
  // Use: fetch('https://api.github.com/users/${username}/contributions')
  const weeks = 52;
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="github" className="py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-3xl font-bold text-center mb-4"
        >
          GitHub Contributions
        </motion.h2>
        <p className="text-text-secondary text-center mb-8">
          {/* TODO: Replace with your subtitle */}
          Last year's contribution activity
        </p>

        <div className="overflow-x-auto">
          <div className="flex gap-[3px] min-w-max">
            {contributionData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm cursor-pointer heatmap-level-${day.level} hover:ring-1 hover:ring-accent`}
                    onMouseEnter={() => setTooltip({ date: formatDate(day.date), count: day.count })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {tooltip && (
          <div className="mt-4 text-center text-sm text-text-secondary">
            {tooltip.date}: {tooltip.count} contributions
          </div>
        )}

        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-text-secondary">
          <span>Less</span>
          {[0, 1, 2, 3, 4, 5].map(level => (
            <div key={level} className={`w-3 h-3 rounded-sm heatmap-level-${level}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
