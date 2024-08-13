// frontend\src\constants\AdminSidebarLinks.tsx

import { Icon } from '@iconify/react';

import { SideNavItem } from '../types/sideNavItem';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/admin/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Expert',
    path: '/admin/experts',
    icon: <Icon icon="carbon:user-admin" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/admin/all-experts' },
      { title: 'Verify experts', path: '/admin/verify-experts' },
    ],
  },
  {
    title: 'User',
    path: '/admin/users',
    icon: <Icon icon="lucide:user" width="24" height="24" />,
  },
  {
    title: 'Reports',
    path: '/admin/report',
    icon: <Icon icon="material-symbols:report-outline" width="24" height="24" />,
  },
  {
    title: 'Payments',
    path: '/admin/payments',
    icon: <Icon icon="ic:round-payment" width="24" height="24" />,
  },
  {
    title: 'Category',
    path: '/admin/category',
    icon: <Icon icon="material-symbols:category-outline" width="24" height="24" />,
  },
];
