import { CartButton, Logo, ModeToggle, SearchField, UserActions, WishlistCounter } from '.';

function Navbar() {
  return (
    <nav className='bg-muted py-4'>
      <div className='w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex justify-between items-center gap-x-4'>
        {/* Logo */}
        <div className='flex items-center gap-x-3'>
          <Logo />
          <span className='text-xl font-bold text-primary'>Forahia Store</span>
        </div>
        
        {/* Search Field */}
        <SearchField />
        
        {/* Right Side Actions */}
        <div className='flex items-center gap-x-2'>
          <UserActions />
          <ModeToggle />
          <WishlistCounter />
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
