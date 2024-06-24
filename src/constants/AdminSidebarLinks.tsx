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
      // { title: 'Graphic Design', path: '/admin/' },
    ],
  },
  {
    title: 'User',
    path: '/admin/users',
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/admin/all-users' },
      { title: 'user-2', path: '/admin/projects/user-2' },
      // { title: 'Graphic Design', path: '/admin/projects/graphic-design' },
    ],
  },
  {
    title: 'Category',
    path: '/admin/category',
    icon: <Icon icon="material-symbols:category-outline" width="24" height="24" />,
  },
  // {
  //   title: 'Settings',
  //   path: '/admin/settings',
  //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'Account', path: '/admin/settings/account' },
  //     { title: 'Privacy', path: '/admin/settings/privacy' },
  //   ],
  // },
  // {
  //   title: 'Help',
  //   path: '/admin/help',
  //   icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  // },
  {
    title: 'Logout',
    path: '/admin/logout',
    icon: <Icon icon="material-symbols:logout" width="24" height="24" />,
  },
];
