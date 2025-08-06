import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionTitle } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addItem } from '@/features/cart/cartSlice';
import { removeFromWishlist as removeFromWishlistAction, WishlistItem } from '@/features/wishlist/wishlistSlice';
import { toast } from '@/components/ui/use-toast';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star,
  Filter,
  Grid3X3,
  List,
  Share2
} from 'lucide-react';
import { formatAsDollars } from '@/utils';

function Wishlist() {
  const dispatch = useAppDispatch();
  const { wishlistItems } = useAppSelector((state) => state.wishlistState);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(wishlistItems.map(item => item.category)))];
  
  const filteredItems = wishlistItems.filter(item => 
    filterCategory === 'all' || item.category === filterCategory
  );

  const removeFromWishlist = (productID: number) => {
    dispatch(removeFromWishlistAction({ productID }));
  };

  const addToCart = (item: WishlistItem) => {
    const cartItem = {
      cartID: `${item.productID}-default`,
      productID: item.productID,
      image: item.image,
      title: item.title,
      price: item.price,
      amount: 1,
      productColor: 'default',
      company: item.company,
    };

    dispatch(addItem(cartItem));
    toast({ description: 'Item added to cart!' });
  };

  const addAllToCart = () => {
    filteredItems.forEach(item => {
      const cartItem = {
        cartID: `${item.productID}-default`,
        productID: item.productID,
        image: item.image,
        title: item.title,
        price: item.price,
        amount: 1,
        productColor: 'default',
        company: item.company,
      };
      dispatch(addItem(cartItem));
    });

    toast({ 
      description: `${filteredItems.length} items added to cart!`
    });
  };

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle text={`My Wishlist (${filteredItems.length})`} />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by:</span>
          {categories.map(category => (
            <Button
              key={category}
              variant={filterCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {filteredItems.length > 0 && (
          <Button onClick={addAllToCart} className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add All to Cart
          </Button>
        )}
      </div>

      {/* Wishlist Items */}
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start adding items you love to see them here
            </p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              {viewMode === 'grid' ? (
                <>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => removeFromWishlist(item.productID)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                        <CardDescription className="text-sm">{item.company}</CardDescription>
                      </div>
                      <Badge variant="outline" className="shrink-0">{item.category}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2">
                      {renderStars(item.rating)}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({item.rating})
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-primary">
                        {formatAsDollars(Number(item.price))}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromWishlist(item.productID)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(item.rating)}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({item.rating})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {formatAsDollars(Number(item.price))}
                        </span>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
