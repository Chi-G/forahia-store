import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { customFetch } from '@/utils';
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from '@/components';
import { ReduxStore } from '@/store';
import { type OrdersResponse } from '@/utils';

export const loader =
  (store: ReduxStore): LoaderFunction =>
  async ({ request }): Promise<OrdersResponse | Response | null> => {
    const user = store.getState().userState.user;

    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await customFetch.get<OrdersResponse>('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      return { ...response.data };
    } catch (error) {
      console.log(error);
      
      // Handle 401 Unauthorized specifically
      if (error && typeof error === 'object' && 'response' in error && 
          error.response && typeof error.response === 'object' && 'status' in error.response && 
          error.response.status === 401) {
        toast({ 
          description: 'Your session has expired. Please login again.',
          variant: 'destructive'
        });
        return redirect('/login');
      }
      
      // Handle other errors
      toast({ 
        description: 'Failed to fetch orders. Please check your connection and try again.',
        variant: 'destructive'
      });
      
      // Return a minimal structure instead of null to prevent destructuring errors
      return {
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: 10,
            pageCount: 0,
            total: 0
          }
        }
      };
    }
  };

function Orders() {
  const data = useLoaderData() as OrdersResponse | null;
  
  // Handle case where loader returns null due to error
  if (!data || !data.meta) {
    return (
      <div className="text-center py-8">
        <SectionTitle text='Unable to load orders' />
        <p className="text-muted-foreground mt-4">
          Please check your connection and try again, or contact support if the problem persists.
        </p>
      </div>
    );
  }

  const { meta } = data;
  
  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />;
  }

  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
}
export default Orders;
