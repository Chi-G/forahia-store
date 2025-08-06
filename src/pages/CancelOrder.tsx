import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components';
import { Badge } from '@/components/ui/badge';
import { 
  XCircle, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  RefreshCw,
  Phone,
  Mail,
  CreditCard,
  Package,
  ArrowLeft
} from 'lucide-react';

const cancellationPolicies = [
  {
    timeframe: 'Within 2 Hours',
    description: 'Full refund, instant cancellation',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
  },
  {
    timeframe: '2-24 Hours',
    description: 'Full refund, may require approval',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
  },
  {
    timeframe: 'After 24 Hours',
    description: 'Cancellation subject to processing status',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800'
  },
  {
    timeframe: 'After Shipping',
    description: 'Cannot cancel, but returns are available',
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
  }
];

const mockRecentOrders = [
  {
    orderNumber: 'FH-2024-0001234',
    date: 'January 10, 2024',
    status: 'Processing',
    total: '₦45,998',
    items: 2,
    canCancel: true,
    estimatedShipping: 'January 12, 2024'
  },
  {
    orderNumber: 'FH-2024-0001235',
    date: 'January 8, 2024',
    status: 'Shipped',
    total: '₦23,500',
    items: 1,
    canCancel: false,
    estimatedShipping: 'January 11, 2024'
  },
  {
    orderNumber: 'FH-2024-0001236',
    date: 'January 5, 2024',
    status: 'Delivered',
    total: '₦67,200',
    items: 3,
    canCancel: false,
    estimatedShipping: 'January 8, 2024'
  }
];

function CancelOrder() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [showCancellationForm, setShowCancellationForm] = useState(false);

  const handleCancelOrder = (orderNumber: string) => {
    setSelectedOrder(orderNumber);
    setShowCancellationForm(true);
  };

  const submitCancellation = () => {
    // Handle cancellation logic here
    alert(`Cancellation request submitted for order ${selectedOrder}`);
    setShowCancellationForm(false);
    setSelectedOrder(null);
    setCancellationReason('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="Cancel Order" />
      
      {/* Cancellation Policy */}
      <Card className="mb-8 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-5 w-5" />
            Cancellation Policy
          </CardTitle>
          <CardDescription className="text-amber-700 dark:text-amber-300">
            Review our cancellation timeframes and policies before proceeding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cancellationPolicies.map((policy, index) => (
              <Card key={index} className={policy.bgColor}>
                <CardContent className="p-4 text-center">
                  <policy.icon className={`h-8 w-8 mx-auto mb-3 ${policy.color}`} />
                  <h4 className="font-semibold mb-2">{policy.timeframe}</h4>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {!showCancellationForm ? (
        <>
          {/* Recent Orders */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Your Recent Orders
              </CardTitle>
              <CardDescription>
                Select an order to cancel (only eligible orders shown)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentOrders.map((order, index) => (
                  <Card key={index} className={`${!order.canCancel ? 'opacity-60' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h4 className="font-semibold">{order.orderNumber}</h4>
                            <Badge variant={
                              order.status === 'Processing' ? 'default' :
                              order.status === 'Shipped' ? 'secondary' :
                              'outline'
                            }>
                              {order.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div>
                              <p className="font-medium text-foreground">Order Date</p>
                              <p>{order.date}</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Total Amount</p>
                              <p>{order.total}</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Items</p>
                              <p>{order.items} item{order.items > 1 ? 's' : ''}</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Est. Shipping</p>
                              <p>{order.estimatedShipping}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          {order.canCancel ? (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleCancelOrder(order.orderNumber)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Order
                            </Button>
                          ) : (
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-2">Cannot cancel</p>
                              <Button variant="outline" size="sm" asChild>
                                <a href="/returns">
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Return Instead
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Processing Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instant cancellation:</span>
                    <span className="font-medium">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Review required:</span>
                    <span className="font-medium">2-24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refund processing:</span>
                    <span className="font-medium">3-5 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Refund Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refund method:</span>
                    <span className="font-medium">Original payment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing fee:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Partial refunds:</span>
                    <span className="font-medium">Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        /* Cancellation Form */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Cancel Order {selectedOrder}
            </CardTitle>
            <CardDescription>
              Please provide a reason for cancelling your order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reason for Cancellation *
                </label>
                <select 
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Reason for cancellation"
                >
                  <option value="">Select a reason...</option>
                  <option value="changed-mind">Changed my mind</option>
                  <option value="found-better-price">Found a better price elsewhere</option>
                  <option value="ordered-wrong-item">Ordered wrong item by mistake</option>
                  <option value="no-longer-needed">No longer need the item</option>
                  <option value="shipping-too-long">Shipping time too long</option>
                  <option value="payment-issues">Payment issues</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                  placeholder="Provide any additional details about your cancellation..."
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Cancellation Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <span className="font-medium">{selectedOrder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refund Amount:</span>
                    <span className="font-medium text-green-600">₦45,998</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refund Method:</span>
                    <span className="font-medium">Original Payment Method</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="font-medium">3-5 business days</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCancellationForm(false)}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Orders
                </Button>
                <Button 
                  variant="destructive"
                  onClick={submitCancellation}
                  disabled={!cancellationReason}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Confirm Cancellation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Support */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            If you're having trouble cancelling your order, our support team is here to help
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Phone className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">Call Support</p>
                <p className="text-sm text-muted-foreground">+234 70659 10449</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Mail className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">Email Support</p>
                <p className="text-sm text-muted-foreground">chijindu.nwokeohuru@gmail.com</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CancelOrder;
