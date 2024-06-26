// frontend\src\constants\AdminSidebarLinks.tsx

import {
	HiOutlineViewGrid,
	HiOutlineCube,
	// HiOutlineShoppingCart,
	// HiOutlineUsers,
	// HiOutlineDocumentText,
	// HiOutlineAnnotation,
	// HiOutlineQuestionMarkCircle,
	// HiOutlineCog
} from 'react-icons/hi'
import { ReactNode } from 'react'

export interface SidebarLinkType {
	key: string
	label: string
	path: string
	icon: ReactNode
}

export const ADMIN_SIDEBAR_LINKS: SidebarLinkType[] = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: 'dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'expertmanagement',
		label: 'Expert Management',
		path: 'expertmanagement',
		icon: <HiOutlineCube />
	},
	// {
	// 	key: 'orders',
	// 	label: 'Orders',
	// 	path: '/orders',
	// 	icon: <HiOutlineShoppingCart />
	// },
	// {
	// 	key: 'customers',
	// 	label: 'Customers',
	// 	path: '/customers',
	// 	icon: <HiOutlineUsers />
	// },
	// {
	// 	key: 'transactions',
	// 	label: 'Transactions',
	// 	path: '/transactions',
	// 	icon: <HiOutlineDocumentText />
	// },
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
]

export const ADMIN_SIDEBAR_BOTTOM_LINKS: SidebarLinkType[] = [
	// {
	// 	key: 'settings',
	// 	label: 'Settings',
	// 	path: '/settings',
	// 	icon: <HiOutlineCog />
	// },
	// {
	// 	key: 'support',
	// 	label: 'Help & Support',
	// 	path: '/support',
	// 	icon: <HiOutlineQuestionMarkCircle />
	// }
]