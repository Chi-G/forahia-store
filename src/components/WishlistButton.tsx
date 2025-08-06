import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleWishlistItem } from '@/features/wishlist/wishlistSlice';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productID: number;
  title: string;
  company: string;
  price: string;
  image: string;
  category?: string;
  rating?: number;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'ghost' | 'outline' | 'default';
}

function WishlistButton({ 
  productID, 
  title, 
  company, 
  price, 
  image, 
  category = 'General',
  rating = 0,
  className,
  size = 'default',
  variant = 'ghost'
}: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlistState.wishlistItems);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isInWishlist = wishlistItems.some(item => item.productID === productID);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    dispatch(toggleWishlistItem({
      productID,
      title,
      company,
      price,
      image,
      category,
      rating
    }));
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      className={cn(
        'relative transition-all duration-200',
        isAnimating && 'scale-110',
        className
      )}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart 
        className={cn(
          'h-4 w-4 transition-all duration-200',
          size === 'sm' && 'h-3 w-3',
          size === 'lg' && 'h-5 w-5',
          isInWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500'
        )} 
      />
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-red-500/20 animate-ping" />
        </div>
      )}
    </Button>
  );
}

export default WishlistButton;
