// frontend\src\components\admin\Sidebar.tsx

import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
// import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import { ADMIN_SIDEBAR_LINKS, ADMIN_SIDEBAR_BOTTOM_LINKS, SidebarLinkType } from '../../constants/AdminSidebarLinks'

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
	return (
		<div className="bg-neutral-900 w-60 p-3 flex flex-col">
			<div className="flex items-center gap-2 px-1 py-3">
				{/* <FcBullish fontSize={24} /> */}
				<img
					loading="lazy"
					src="/Ask.svg"
					alt="AskExperts logo"
					className="shrink-0 self-start aspect-[1.08] w-[30px]"
				/>
				<span className="text-neutral-200 text-lg">AskExpert</span>
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{ADMIN_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
				{ADMIN_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				<div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
				</div>
			</div>
		</div>
	)
}

interface SidebarLinkProps {
	link: SidebarLinkType
}

function SidebarLink({ link }: SidebarLinkProps) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}