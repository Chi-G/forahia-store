import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { HelpCircle, MessageCircle, CreditCard, MapPin, XCircle, RefreshCw, Phone } from 'lucide-react';

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
        <DropdownMenuItem className="flex items-center space-x-2">
          <HelpCircle className="h-4 w-4" />
          <span>Help Center</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2">
          <Phone className="h-4 w-4" />
          <span>Place an Order</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4" />
          <span>Pay Option</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>Track Order</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2">
          <XCircle className="h-4 w-4" />
          <span>Cancel Order</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Returns & Refunds</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer">
          <MessageCircle className="h-4 w-4" />
          <span>Live Chat</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HelpDropdown;
