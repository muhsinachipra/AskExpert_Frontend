// frontend\src\components\admin\layout\Sidebar.tsx


// import classNames from 'classnames'
// import { Link, useLocation } from 'react-router-dom'
// import { HiOutlineLogout } from 'react-icons/hi'
// import { ADMIN_SIDEBAR_LINKS, ADMIN_SIDEBAR_BOTTOM_LINKS, SidebarLinkType } from '../../../constants/AdminSidebarLinks'
// import { useState } from 'react'

// const linkClass =
// 	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

// export default function Sidebar() {
// 	const [isOpen, setIsOpen] = useState(false)

// 	return (
// 		<>
// 			<div className="md:hidden flex justify-between p-3 bg-neutral-900">
// 				<img
// 					loading="lazy"
// 					src="/Ask.svg"
// 					alt="AskExperts logo"
// 					className="shrink-0 self-start aspect-[1.08] w-[30px]"
// 				/>
// 				<button onClick={() => setIsOpen(!isOpen)} className="text-white">
// 					{isOpen ? 'Close' : 'Menu'}
// 				</button>
// 			</div>
// 			<div className={classNames("bg-neutral-900 p-3 flex flex-col md:w-60", isOpen ? 'block' : 'hidden', 'md:block')}>
// 				<div className="flex items-center gap-2 px-1 py-3">
// 					<img
// 						loading="lazy"
// 						src="/Ask.svg"
// 						alt="AskExperts logo"
// 						className="shrink-0 self-start aspect-[1.08] w-[30px]"
// 					/>
// 					<span className="text-neutral-200 text-lg">AskExpert</span>
// 				</div>
// 				<div className="py-8 flex flex-1 flex-col gap-0.5">
// 					{ADMIN_SIDEBAR_LINKS.map((link) => (
// 						<SidebarLink key={link.key} link={link} />
// 					))}
// 				</div>
// 				<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
// 					{ADMIN_SIDEBAR_BOTTOM_LINKS.map((link) => (
// 						<SidebarLink key={link.key} link={link} />
// 					))}
// 					<div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
// 						<span className="text-xl">
// 							<HiOutlineLogout />
// 						</span>
// 						Logout
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// interface SidebarLinkProps {
// 	link: SidebarLinkType
// }

// function SidebarLink({ link }: SidebarLinkProps) {
// 	const { pathname } = useLocation()

// 	return (
// 		<Link
// 			to={link.path}
// 			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
// 		>
// 			<span className="text-xl">{link.icon}</span>
// 			{link.label}
// 		</Link>
// 	)
// }






import classNames from 'classnames'
import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import { ADMIN_SIDEBAR_LINKS, ADMIN_SIDEBAR_BOTTOM_LINKS, SidebarLinkType } from '../../../constants/AdminSidebarLinks'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { useAdminLogoutMutation } from '../../../slices/api/adminApiSlice';
import { adminLogout } from '../../../slices/authSlice';
const MySwal = withReactContent(Swal);

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    const dispatch = useDispatch();
	const [adminLogoutMutation] = useAdminLogoutMutation()
	const navigate = useNavigate()

	const handleLogout = async () => {
		const result = await MySwal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, logout!',
			cancelButtonText: 'No, cancel!',
		});

		if (result.isConfirmed) {
			dispatch(adminLogout());
			await adminLogoutMutation('').unwrap();
			navigate('/admin');
		}
	};

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
				<div onClick={handleLogout} className={classNames(linkClass, 'cursor-pointer text-red-500')}>
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
