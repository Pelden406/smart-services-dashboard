// Category constants + helpers for the Analytics screen's spend trend
// chart. Trend data itself comes from the API (see
// ServicesContext.getSpendTrend) rather than mock data.
 
export const SPEND_TREND_CATEGORIES = ['Utility', 'Subscription', 'Booking'];
 
/** Month-over-month % change per category, using the last two data points. */
export function categoryDeltas(trend) {
  const latest = trend[trend.length - 1];
  const previous = trend[trend.length - 2];
  return SPEND_TREND_CATEGORIES.map((category) => {
    const change = previous[category] === 0 ? 0 : ((latest[category] - previous[category]) / previous[category]) * 100;
    return { category, change };
  }).sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
}
 
