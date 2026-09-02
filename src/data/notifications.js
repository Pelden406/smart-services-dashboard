// Mock notification data model, kept alongside the service data since
// several notifications reference a service by id.
//
// Notification shape:
// { id, type: 'renewal' | 'booking' | 'system', title, meta, read, serviceId? }

export const NOTIFICATION_TABS = ['All', 'Renewals', 'Bookings', 'System'];

const TAB_TO_TYPE = {
  Renewals: 'renewal',
  Bookings: 'booking',
  System: 'system',
};

export function typeForTab(tab) {
  return TAB_TO_TYPE[tab] ?? null;
}

export const notifications = [
  {
    id: 'note-001',
    type: 'renewal',
    title: 'Fibre 500 renews in 4 days',
    meta: '$79 · today 09:12',
    read: false,
    serviceId: 'svc-001',
  },
  {
    id: 'note-002',
    type: 'booking',
    title: 'Gym booking confirmed',
    meta: 'Sep 12, 6:00pm · yesterday',
    read: false,
    serviceId: 'svc-007',
  },
  {
    id: 'note-003',
    type: 'system',
    title: 'Electricity bill up 8% vs last month',
    meta: '2 days ago',
    read: true,
    serviceId: 'svc-002',
  },
  {
    id: 'note-004',
    type: 'system',
    title: 'Water service paused',
    meta: '5 days ago',
    read: true,
    serviceId: 'svc-003',
  },
  {
    id: 'note-005',
    type: 'renewal',
    title: 'Cloud storage 2TB renews in 5 days',
    meta: '$12 · yesterday',
    read: true,
    serviceId: 'svc-006',
  },
];
