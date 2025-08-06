import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks';

function WishlistCounter() {
  const numItemsInWishlist = useAppSelector((state) => state.wishlistState.numItemsInWishlist);

  return (
    <Button asChild variant='outline' size='icon' className='relative'>
      <Link to='/wishlist'>
        <Heart className='h-4 w-4' />
        {numItemsInWishlist > 0 && (
          <span className='absolute -top-2 -right-2 h-5 w-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center'>
            {numItemsInWishlist}
          </span>
        )}
      </Link>
    </Button>
  );
}

export default WishlistCounter;
