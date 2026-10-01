// Shared enum constants for the service data model. Service records
// themselves now come from the API (see ServicesContext) rather than
// mock data.
//
// Service shape (as normalized by ServicesContext):
// {
//   id: string
//   name: string
//   provider: string
//   accountNumber: string
//   category: 'Subscription' | 'Utility' | 'Booking'
//   cost: number              // cost per billing cycle, in dollars
//   billingCycle: 'Monthly' | 'Quarterly' | 'Yearly'
//   status: 'Active' | 'Paused' | 'Cancelled'
//   renewalDate: string | null  // ISO date, null when paused/cancelled
//   reminder: boolean           // remind 7 days before renewal
//   notes: string
//   usageHistory: number[]      // last 6 months, 0-100 scale, for the usage chart
//   activity: { date: string, label: string }[]
// }
 
export const CATEGORIES = ['Subscription', 'Utility', 'Booking'];
export const BILLING_CYCLES = ['Monthly', 'Quarterly', 'Yearly'];
export const STATUSES = ['Active', 'Paused', 'Cancelled'];
