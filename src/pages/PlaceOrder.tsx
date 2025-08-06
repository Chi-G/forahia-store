import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Search, 
  CreditCard, 
  MapPin, 
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Truck,
  Star
} from 'lucide-react';

const orderSteps = [
  {
    step: 1,
    title: 'Browse & Search Products',
    description: 'Find the perfect products for your needs',
    icon: Search,
    details: [
      'Use the search bar to find specific items',
      'Browse categories from the navigation menu',
      'Apply filters to narrow down your choices',
      'Read product reviews and ratings'
    ]
  },
  {
    step: 2,
    title: 'Add to Cart or Wishlist',
    description: 'Save items you want to purchase',
    icon: ShoppingCart,
    details: [
      'Click "Add to Cart" to purchase immediately',
      'Use the heart icon to save items for later',
      'Adjust quantities in your cart',
      'Review your cart before checkout'
    ]
  },
  {
    step: 3,
    title: 'Secure Checkout',
    description: 'Complete your purchase safely',
    icon: CreditCard,
    details: [
      'Enter your shipping address',
      'Choose your preferred payment method',
      'Review your order summary',
      'Apply discount codes if available'
    ]
  },
  {
    step: 4,
    title: 'Order Confirmation',
    description: 'Your order is confirmed and processing',
    icon: CheckCircle,
    details: [
      'Receive order confirmation email',
      'Get your unique order tracking number',
      'Monitor order status in your account',
      'Expect shipping notification soon'
    ]
  }
];

const orderTips = [
  {
    title: 'Create an Account',
    description: 'Save your information for faster checkout and order tracking',
    icon: Shield
  },
  {
    title: 'Check Product Details',
    description: 'Review size charts, specifications, and customer reviews',
    icon: Star
  },
  {
    title: 'Verify Shipping Address',
    description: 'Ensure your delivery address is correct to avoid delays',
    icon: MapPin
  },
  {
    title: 'Track Your Package',
    description: 'Use your tracking number to monitor delivery progress',
    icon: Truck
  }
];

function PlaceOrder() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="How to Place an Order" />
      
      {/* Introduction */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Welcome to Our Easy Ordering Process!</h2>
              <p className="text-muted-foreground">
                Placing an order with us is simple and secure. Follow our step-by-step guide below to complete your purchase in just a few minutes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Step-by-Step Ordering Process</h2>
        <div className="space-y-6">
          {orderSteps.map((step, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Step Number */}
                  <div className="bg-primary text-primary-foreground p-6 flex flex-col items-center justify-center min-w-[120px]">
                    <div className="text-2xl font-bold mb-2">Step {step.step}</div>
                    <step.icon className="h-8 w-8" />
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Start CTA */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Start Shopping?</h3>
          <p className="text-muted-foreground mb-6">
            Browse our amazing collection of products and find exactly what you're looking for!
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <a href="/products">
                <Search className="h-4 w-4 mr-2" />
                Browse Products
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/featured">
                <Star className="h-4 w-4 mr-2" />
                View Featured
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Helpful Tips */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Helpful Ordering Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orderTips.map((tip, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <tip.icon className="h-5 w-5 text-primary" />
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            What Happens After You Order?
          </CardTitle>
          <CardDescription>
            Here's what you can expect after placing your order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Immediate
              </Badge>
              <p>Order confirmation email sent to your inbox</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                1-2 Hours
              </Badge>
              <p>Payment processing and order verification</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                1-2 Days
              </Badge>
              <p>Order preparation and packaging</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                3-5 Days
              </Badge>
              <p>Shipping and delivery to your address</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <Button className="w-full" asChild>
              <a href="/orders">
                <ArrowRight className="h-4 w-4 mr-2" />
                Track Your Orders
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PlaceOrder;
