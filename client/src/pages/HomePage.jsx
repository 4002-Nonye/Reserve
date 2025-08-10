import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Element } from 'react-scroll';

import hero from '../assets/hero.jpg';

function HomePage() {
  return (
    <div>
      <NavBar />
      <main className=' px-16'>
        <section className=' flex justify-between items-center'>
          <div className='flex flex-col gap-7 '>
            {' '}
            <h1 className='font-bold text-4xl text-gray-700'>
              Your Services, Scheduled and Secured.
            </h1>
            <p className='text-gray-700'>
              Reserve connects customers with trusted service providers <br />
              from hairdressers to nail technicians and beyond, <br /> making
              booking, payment, and communication <br />
              seamless in one platform.
            </p>
            <Link
              to='/sign-up'
              className='bg-orange-500 text-white text-center py-3 rounded-md w-1/4 font-medium'
            >
              Reserve a spot!
            </Link>
          </div>

          <div>
            <img src={hero} alt='hero image' className='w-[50rem]' />
          </div>
        </section>

        <Element name='how-it-works'>
          <section className='mt-96'>
            <h2>How it works</h2>
          </section>
        </Element>
      </main>
      {/* <a href='/auth/google'>Login with google</a> */}
    </div>
  );
}

export default HomePage;
