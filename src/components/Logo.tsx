import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link
      to='/'
      className='hidden lg:flex justify-center items-center bg-primary p-2 rounded-lg'
    >
      <img 
        src="/logo.png" 
        alt="Comfy Store Logo" 
        className='w-8 h-8 object-contain'
      />
    </Link>
  );
}
export default Logo;
