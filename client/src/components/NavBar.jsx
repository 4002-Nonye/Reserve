import { Link } from 'react-router-dom';
import { Link as SmoothScroll } from 'react-scroll';

import { GrSchedulePlay } from 'react-icons/gr';

function NavBar() {
  return (
    <>
      <nav className='flex justify-between sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm px-10 py-4 items-center'>
        <div className='inline-flex items-start gap-1'>
          {' '}
          <GrSchedulePlay className='text-3xl' />{' '}
          <Link href='/' className='font-bold text-xl '>
            Reserve
          </Link>
        </div>

        <div>
          <ul className='flex gap-14 items-center text-gray-700'>
            <li className='cursor-pointer'>
              <SmoothScroll to='features' smooth={true} duration={500}>
                Features
              </SmoothScroll>
            </li>
            <li className='cursor-pointer'>
              <SmoothScroll to='how-it-works' smooth={true} duration={500}>
                How it works
              </SmoothScroll>
            </li>
            <li>
              <Link to='/'>Contact us</Link>
            </li>
            <li className='bg-orange-500 text-white px-6 py-3 rounded-md'>
              <Link to='/sign-up'>Get started</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
