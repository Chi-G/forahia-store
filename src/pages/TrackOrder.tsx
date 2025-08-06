import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Search, 
  Truck, 
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Calendar,
  ArrowRight
} from 'lucide-react';

const orderStatuses = [
  {
    status: 'Order Placed',
    description: 'Your order has been received and confirmed',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900'
  },
  {
    status: 'Processing',
    description: 'Your order is being prepared for shipment',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900'
  },
  {
    status: 'Shipped',
    description: 'Your order is on its way to you',
    icon: Truck,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900'
  },
  {
    status: 'Out for Delivery',
    description: 'Your order is out for delivery today',
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900'
  },
  {
    status: 'Delivered',
    description: 'Your order has been successfully delivered',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900'
  }
];

const mockOrder = {
  orderNumber: 'FH-2024-0001234',
  status: 'Shipped',
  estimatedDelivery: 'January 15, 2024',
  trackingNumber: 'TRK123456789',
  courier: 'DHL Express',
  items: [
    { name: 'Wireless Bluetooth Headphones', quantity: 1, price: '₦15,999' },
    { name: 'Smart Fitness Watch', quantity: 1, price: '₦29,999' }
  ],
  total: '₦45,998',
  shippingAddress: '123 Victoria Island, Lagos, Nigeria',
  timeline: [
    { date: 'Jan 10, 2024 - 2:30 PM', event: 'Order placed successfully', completed: true },
    { date: 'Jan 10, 2024 - 4:15 PM', event: 'Payment confirmed', completed: true },
    { date: 'Jan 11, 2024 - 9:00 AM', event: 'Order processing started', completed: true },
    { date: 'Jan 12, 2024 - 11:30 AM', event: 'Items packed and shipped', completed: true },
    { date: 'Jan 13, 2024 - 8:45 AM', event: 'Package arrived at Lagos facility', completed: true },
    { date: 'Jan 15, 2024', event: 'Expected delivery', completed: false }
  ]
};

function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleTrackOrder = () => {
    if (orderNumber.trim()) {
      setShowResults(true);
    }
  };

  const currentStatusIndex = orderStatuses.findIndex(status => status.status === mockOrder.status);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="Track Your Order" />
      
      {/* Order Tracking Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Enter Your Order Details
          </CardTitle>
          <CardDescription>
            Enter your order number or email address to track your package
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Order Number</label>
                <input
                  type="text"
                  placeholder="e.g., FH-2024-0001234"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleTrackOrder} className="px-8">
                  <Search className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>You can find your order number in your confirmation email or account dashboard</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Order Results */}
      {(showResults || orderNumber === 'demo') && (
        <>
          {/* Order Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="font-semibold">{mockOrder.orderNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {mockOrder.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Delivery</p>
                    <p className="font-semibold">{mockOrder.estimatedDelivery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Progress</CardTitle>
              <CardDescription>Track your order's journey from our warehouse to your door</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-6 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                
                <div className="space-y-6">
                  {orderStatuses.map((status, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    
                    return (
                      <div key={index} className="relative flex items-start gap-4">
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted ? status.bgColor : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          <status.icon className={`h-6 w-6 ${
                            isCompleted ? status.color : 'text-gray-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-semibold ${
                              isCompleted ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {status.status}
                            </h4>
                            {isCurrent && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {status.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{item.price}</p>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>{mockOrder.total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-mono font-semibold">{mockOrder.trackingNumber}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Courier</p>
                    <p className="font-semibold">{mockOrder.courier}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                    <p className="font-semibold">{mockOrder.shippingAddress}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Track with Courier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Order Timeline
              </CardTitle>
              <CardDescription>
                Detailed history of your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrder.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      event.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <p className={`font-medium ${
                        event.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {event.event}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Help Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Having trouble tracking your order? We're here to help!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="tel:+2348000000000">
              <Button variant="outline" className="h-auto p-4 w-full">
                <div className="text-center">
                  <Phone className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">Call Support</p>
                  <p className="text-sm text-muted-foreground">+234 7065 910 449</p>
                </div>
              </Button>
            </a>
            
            <a href="mailto:chijindu.nwokeohuru@gmail.com?subject=Support%20Request%20-%20Forahia%20Store&body=Hello%20Forahia%20Support%20Team,%0D%0A%0D%0AI%20need%20assistance%20with%20my%20order.%0D%0A%0D%0AOrder%20Number:%20%0D%0ADescription%20of%20issue:%20%0D%0A%0D%0AThank%20you!">
              <Button variant="outline" className="h-auto p-4 w-full">
                <div className="text-center">
                  <Mail className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">Email Support</p>
                  <p className="text-sm text-muted-foreground">chijindu.nwokeohuru@gmail.com</p>
                </div>
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TrackOrder;
