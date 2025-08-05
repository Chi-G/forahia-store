import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link
      to='/'
      className='flex justify-center items-center bg-primary p-2 rounded-lg hover:bg-primary/90 transition-colors'
    >
      <img 
        src="/logo.png" 
        alt="Forahia Store Logo" 
        className='w-8 h-8 object-contain'
      />
    </Link>
  );
}
export default Logo;
