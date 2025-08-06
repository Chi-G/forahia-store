import { useState } from 'react';
import { Form } from 'react-router-dom';
import FormInput from './FormInput';
import PaystackPayment from './PaystackPayment';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

function CheckoutForm() {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: ''
  });
  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;

    if (!name || !address) {
      toast({ 
        description: 'Please fill out all fields',
        variant: 'destructive'
      });
      return;
    }

    setShippingInfo({ name, address });
    setShowPayment(true);
  };

  const handleBackToShipping = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h4 className="font-medium text-xl mb-2">Review Order</h4>
          <div className="bg-muted p-4 rounded-lg">
            <h5 className="font-medium mb-2">Shipping Information</h5>
            <p><strong>Name:</strong> {shippingInfo.name}</p>
            <p><strong>Address:</strong> {shippingInfo.address}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBackToShipping}
            className="mt-4"
          >
            ← Edit Shipping Info
          </Button>
        </div>
        
        <PaystackPayment orderInfo={shippingInfo} />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl mb-4'>Shipping Information</h4>
      <FormInput 
        label='first name' 
        name='name' 
        type='text' 
        defaultValue={shippingInfo.name}
      />
      <FormInput 
        label='address' 
        name='address' 
        type='text' 
        defaultValue={shippingInfo.address}
      />
      <Button type="submit" className='mt-4'>
        Continue to Payment
      </Button>
    </Form>
  );
}

export default CheckoutForm;
