// frontend\src\constants\ExpertSidebarLinks.tsx

import { Icon } from '@iconify/react';

import { SideNavItem } from '../types/sideNavItem';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Appointments',
    path: '/expert/appointments',
    icon: <Icon icon="teenyicons:appointments-outline" width="24" height="24" />,
  },
  {
    title: 'Ratings',
    path: '/expert/rating',
    icon: <Icon icon="material-symbols:star-rate-outline" width="24" height="24" />,
  },
  {
    title: 'Schedule',
    path: '/expert/schedule',
    icon: <Icon icon="akar-icons:schedule" width="24" height="24" />,
  },
  {
    title: 'Profile',
    path: '/expert/profile',
    icon: <Icon icon="gg:profile" width="24" height="24" />,
  },
  {
    title: 'Wallet',
    path: '/expert/wallet',
    icon: <Icon icon="simple-line-icons:wallet" width="24" height="24" />,
  },
  {
    title: 'Chat',
    path: '/expert/chat',
    icon: <Icon icon="material-symbols:chat-outline" width="24" height="24" />,
  },
];
