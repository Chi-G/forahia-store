import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutUser } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useToast } from './ui/use-toast';
import HelpDropdown from './HelpDropdown';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown, User, Package, Inbox, Heart, Settings } from 'lucide-react';

function UserActions() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  const { toast } = useToast();
  const user = useAppSelector((state) => state.userState.user);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    toast({ description: 'Logged Out' });
    navigate('/');
  };

  return (
    <div className='flex gap-x-2 items-center'>
      {user ? (
        <>
          {/* User Greeting with Account Dropdown */}
          <div className="flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <p className='text-xs sm:text-sm hidden md:block'>Hi, {user.firstName}</p>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/inbox" className="flex items-center gap-2">
                    <Inbox className="h-4 w-4" />
                    <span>Inbox</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wishlist" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer"
                >
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Help Dropdown */}
          <HelpDropdown />
        </>
      ) : (
        <>
          <Button asChild variant='ghost' size='sm'>
            <Link to='/login'>Sign in / Guest</Link>
          </Button>
          <Button asChild variant='ghost' size='sm'>
            <Link to='/register'>Register</Link>
          </Button>
          <HelpDropdown />
        </>
      )}
    </div>
  );
}

export default UserActions;
