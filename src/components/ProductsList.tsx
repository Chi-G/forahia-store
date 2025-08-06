import { formatAsDollars, type ProductsResponse } from '@/utils';
import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { WishlistButton } from '@/components';

function ProductsList() {
  const { data: products } = useLoaderData() as ProductsResponse;

  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        const dollarsAmount = formatAsDollars(price);
        return (
          <div key={product.id} className="relative">
            <Link to={`/products/${product.id}`}>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardContent className='p-8 gap-y-4 grid md:grid-cols-3'>
                  <div className="relative">
                    <img
                      src={image}
                      alt={title}
                      className='h-64 w-full md:h-48 md:w-48 rounded-md object-cover'
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
                  <div>
                    <h2 className='text-xl font-semibold capitalize'>{title}</h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>
                  <p className='text-primary md:ml-auto font-semibold text-lg'>{dollarsAmount}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export default ProductsList;
