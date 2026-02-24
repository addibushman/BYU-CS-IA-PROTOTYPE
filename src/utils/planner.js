import { yearLabels } from '../data/catalog';

function emptyYearBucket() {
  return {
    core: [],
    elective: []
  };
}

export function buildPlanForEmphasis(emphasisId, allCourses) {
  const plan = Object.fromEntries(yearLabels.map((y) => [y, emptyYearBucket()]));

  allCourses.forEach((course) => {
    const placement =
      course.emphasisPlacements?.[emphasisId] ?? course.defaultPlacement;

    if (!placement) return;

    const year = placement.year;
    const bucket = placement.bucket || 'elective';

    if (!plan[year]) return;
    if (!plan[year][bucket]) plan[year][bucket] = [];

    plan[year][bucket].push({
      ...course,
      _priority: placement.priority ?? 999
    });
  });

  // Sort for stable display
  yearLabels.forEach((year) => {
    ['core', 'elective'].forEach((bucket) => {
      plan[year][bucket].sort((a, b) => {
        if (a._priority !== b._priority) return a._priority - b._priority;
        return a.code.localeCompare(b.code);
      });
    });
  });

  return plan;
}