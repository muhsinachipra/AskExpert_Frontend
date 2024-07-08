// frontend\src\components\expert\Header.tsx

import { Link, useNavigate } from 'react-router-dom';
import useScroll from '../../hooks/use-scroll';
import { cn } from '../../lib/utils';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useExpertLogoutMutation } from '../../slices/api/expertApiSlice';
import { expertLogout } from '../../slices/authSlice';
const MySwal = withReactContent(Swal);
import { Icon } from '@iconify/react';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrolled = useScroll(5);

  const [expertLogoutMutation] = useExpertLogoutMutation();
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
      dispatch(expertLogout());
      await expertLogoutMutation('').unwrap();
      navigate('/expert/login');
    }
  };

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/25 backdrop-blur-lg': scrolled,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex">Logo</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div onClick={handleLogout} className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            {/* <span className="font-semibold text-sm">HQ</span> */}
            <Icon icon="material-symbols:logout" width="24" height="24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
