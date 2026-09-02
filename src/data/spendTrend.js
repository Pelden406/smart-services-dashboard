// Mock monthly spend history by category, for the Analytics screen's trend
// chart. This is separate from the live services list (which only tracks
// the current state of each service, not its cost history).

export const SPEND_TREND_CATEGORIES = ['Utility', 'Subscription', 'Booking'];

export const spendTrend = [
  { month: 'Apr', Utility: 220, Subscription: 40, Booking: 120 },
  { month: 'May', Utility: 230, Subscription: 45, Booking: 125 },
  { month: 'Jun', Utility: 210, Subscription: 50, Booking: 130 },
  { month: 'Jul', Utility: 245, Subscription: 48, Booking: 135 },
  { month: 'Aug', Utility: 240, Subscription: 55, Booking: 138 },
  { month: 'Sep', Utility: 254, Subscription: 57, Booking: 140 },
];

/** Month-over-month % change per category, using the last two data points. */
export function categoryDeltas(trend = spendTrend) {
  const latest = trend[trend.length - 1];
  const previous = trend[trend.length - 2];
  return SPEND_TREND_CATEGORIES.map((category) => {
    const change = previous[category] === 0 ? 0 : ((latest[category] - previous[category]) / previous[category]) * 100;
    return { category, change };
  }).sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
}
