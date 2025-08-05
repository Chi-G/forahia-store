import { CartButton, Logo, ModeToggle, SearchField, UserActions } from '.';

function Navbar() {
  return (
    <nav className='bg-muted py-4'>
      <div className='w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex justify-between items-center gap-x-4'>
        {/* Logo */}
        <Logo />
        
        {/* Search Field */}
        <SearchField />
        
        {/* Right Side Actions */}
        <div className='flex items-center gap-x-2'>
          <UserActions />
          <ModeToggle />
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
