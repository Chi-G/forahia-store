import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { WishlistButton } from '@/components';
import { formatAsDollars, type ProductsResponse } from '@/utils';

function ProductsGrid() {
  const { data: products } = useLoaderData() as ProductsResponse;

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        const dollarsAmount = formatAsDollars(price);
        return (
          <div key={product.id} className="relative group">
            <Link to={`/products/${product.id}`}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardContent className='p-4'>
                  <div className="relative">
                    <img
                      src={image}
                      alt={title}
                      className='rounded-md h-64 md:h-48 w-full object-cover'
                    />
                    {/* Wishlist Button */}
                    <div className="absolute top-2 right-2">
                      <WishlistButton
                        productID={product.id}
                        title={title}
                        company={company}
                        price={price.toString()}
                        image={image}
                        category="General"
                        size="sm"
                        className="bg-white/80 hover:bg-white shadow-md"
                      />
                    </div>
                  </div>
                  <div className='mt-4 text-center'>
                    <h2 className='text-xl font-semibold capitalize'>{title}</h2>
                    <p className='text-sm text-muted-foreground'>{company}</p>
                    <p className='text-primary font-light mt-2'>
                      {dollarsAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export default ProductsGrid;
