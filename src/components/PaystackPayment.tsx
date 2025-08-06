import { usePaystackPayment } from 'react-paystack';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { clearCart } from '@/features/cart/cartSlice';
import { customFetch, formatAsDollars, type Checkout } from '@/utils';
import { useNavigate } from 'react-router-dom';

interface PaystackPaymentProps {
  orderInfo: {
    name: string;
    address: string;
  };
}

interface PaystackResponse {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
  redirecturl: string;
}

interface PaystackConfig {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
  text?: string;
  onSuccess?: (response: PaystackResponse) => void;
  onClose?: () => void;
}

const PaystackPayment = ({ orderInfo }: PaystackPaymentProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userState);
  const { cartItems, orderTotal, numItemsInCart } = useAppSelector((state) => state.cartState);

  const paystackConfig: PaystackConfig = {
    reference: `order_${new Date().getTime()}`,
    email: user?.email || '',
    amount: Math.round(orderTotal * 100),
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handlePaystackSuccess = async (response: PaystackResponse) => {
    try {
      // Payment was successful, now create the order
      const info: Checkout = {
        name: orderInfo.name,
        address: orderInfo.address,
        chargeTotal: orderTotal,
        orderTotal: formatAsDollars(orderTotal),
        cartItems,
        numItemsInCart,
        paymentReference: response.reference,
      };

      await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        }
      );

      dispatch(clearCart());
      toast({ 
        description: `Payment successful! Order placed. Reference: ${response.reference}` 
      });
      navigate('/orders');
    } catch (error) {
      console.error('Order creation failed:', error);
      toast({ 
        description: 'Payment successful but order creation failed. Please contact support.',
        variant: 'destructive'
      });
    }
  };

  const handlePaystackClose = () => {
    toast({ 
      description: 'Payment cancelled. Your cart is still saved.',
      variant: 'default'
    });
  };

  const handlePayment = () => {
    if (!user) {
      toast({ 
        description: 'Please login to place an order',
        variant: 'destructive'
      });
      return;
    }

    if (!user.email) {
      toast({ 
        description: 'Please add an email to your profile to proceed with payment',
        variant: 'destructive'
      });
      return;
    }

    if (!paystackConfig.publicKey) {
      toast({ 
        description: 'Payment system not configured',
        variant: 'destructive'
      });
      return;
    }

    initializePayment({
      ...paystackConfig,
      onSuccess: handlePaystackSuccess,
      onClose: handlePaystackClose,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-lg mb-2">Payment Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items ({numItemsInCart}):</span>
            <span>{formatAsDollars(orderTotal)}</span>
          </div>
          <div className="border-t pt-2 font-medium">
            <div className="flex justify-between">
              <span>Total:</span>
              <span>{formatAsDollars(orderTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={handlePayment}
        className="w-full"
        size="lg"
        disabled={!user || !paystackConfig.publicKey}
      >
        Pay with Paystack - {formatAsDollars(orderTotal)}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Secure payment powered by Paystack. Your payment information is encrypted and secure.
      </p>
    </div>
  );
};

export default PaystackPayment;
