// frontend\src\constants\AdminSidebarLinks.tsx

import { Icon } from '@iconify/react';

import { SideNavItem } from '../types/sideNavItem';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/admin/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Projects',
    path: '/admin/projects',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/admin/projects' },
      { title: 'Web Design', path: '/admin/projects/web-design' },
      { title: 'Graphic Design', path: '/admin/projects/graphic-design' },
    ],
  },
  {
    title: 'Messages',
    path: '/admin/messages',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/admin/settings/account' },
      { title: 'Privacy', path: '/admin/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/admin/help',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];
