import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { HelpCircle, MessageCircle, CreditCard, MapPin, XCircle, RefreshCw, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function HelpDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Help</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild className="flex items-center space-x-2 cursor-pointer">
          <Link to="/help-center">
            <HelpCircle className="h-4 w-4" />
            <span>Help Center</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center space-x-2 cursor-pointer">
          <Link to="/place-order">
            <Phone className="h-4 w-4" />
            <span>Place an Order</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center space-x-2 cursor-pointer">
          <Link to="/payment-options">
            <CreditCard className="h-4 w-4" />
            <span>Pay Option</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center space-x-2 cursor-pointer">
          <Link to="/track-order">
            <MapPin className="h-4 w-4" />
            <span>Track Order</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center space-x-2 cursor-pointer">
          <Link to="/cancel-order">
            <XCircle className="h-4 w-4" />
            <span>Cancel Order</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center space-x-2 cursor-pointer">
          <Link to="/returns-refunds">
            <RefreshCw className="h-4 w-4" />
            <span>Returns & Refunds</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer">
          <Link to="/live-chat">
            <MessageCircle className="h-4 w-4" />
            <span>Live Chat</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HelpDropdown;
