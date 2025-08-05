import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

function SearchField() {
  return (
    <div className="flex items-center space-x-2 flex-1 max-w-md">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search products..."
          className="pr-10 bg-background border-input"
        />
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          type="submit"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchField;
