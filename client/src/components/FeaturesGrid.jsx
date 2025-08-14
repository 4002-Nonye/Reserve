import {
  FiBarChart2,
  FiCheckCircle,
  FiCreditCard,
  FiGrid,
  FiMessageCircle,
  FiCalendar,
} from 'react-icons/fi';

const featuresOptions = [
  {
    icon: <FiCalendar />,
    title: ' Easy Booking',
    description:
      'Customers can browse and book services in minutes, with instant email confirmations sent to both sides.',
  },
  {
    icon: <FiCheckCircle />,
    title: 'Secure Payment',
    description:
      ' Pay safely within the app using trusted payment methods,ensuring peace of mind for every transaction',
  },
  {
    icon: <FiCreditCard />,
    title: 'In-App Chat',
    description:
      ' Communicate directly with your provider after payment to finalize details and ensure smooth service delivery.',
  },
  {
    icon: <FiMessageCircle />,
    title: 'Smart Scheduling',
    description:
      'Keep your bookings organized by adding them to your personal or business calendar with just one tap.',
  },
  {
    icon: <FiBarChart2 />,
    title: 'Business Analytics',
    description:
      'Track monthly performance, monitor trends, and get insights to help grow your service business.',
  },
  {
    icon: <FiGrid />,
    title: 'Multi-Service Support',
    description:
      'From haircuts to nail services, Reserve lets providers offer and manage multiple services in one place.',
  },
];

function FeaturesGrid() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pt-24'>
      {featuresOptions.map(({ icon, title, description }, i) => (
        <div key={i} className='text-center transform lg:translate-y-4'>
          <span className='text-4xl text-orange-600 mx-auto flex items-center justify-center '>
            {icon}
          </span>
          <h3 className='mt-4 text-lg font-semibold text-gray-900'>{title}</h3>
          <p className='mt-2 text-base text-gray-600 max-w-xs mx-auto'>
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FeaturesGrid;
