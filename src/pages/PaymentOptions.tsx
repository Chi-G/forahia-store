import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionTitle } from '@/components';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  Lock,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  Banknote,
  QrCode,
  Building
} from 'lucide-react';

const paymentMethods = [
  {
    name: 'Credit & Debit Cards',
    description: 'Visa, Mastercard, and American Express accepted',
    icon: CreditCard,
    features: ['Instant processing', '3D Secure protection', 'Save for future use'],
    processingTime: 'Instant',
    fees: 'Free',
    supported: true,
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800'
  },
  {
    name: 'Paystack',
    description: 'Secure payment gateway for Nigerian customers',
    icon: Globe,
    features: ['Local bank support', 'Mobile money', 'USSD payments'],
    processingTime: 'Instant',
    fees: 'Free for customers',
    supported: true,
    color: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
  },
  {
    name: 'Bank Transfer',
    description: 'Direct transfer to our business account',
    icon: Building,
    features: ['No transaction fees', 'Manual verification', 'Bulk payments'],
    processingTime: '1-2 business days',
    fees: 'Free',
    supported: true,
    color: 'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800'
  },
  {
    name: 'Mobile Payment',
    description: 'Pay using your mobile wallet',
    icon: Smartphone,
    features: ['Quick checkout', 'Touch/Face ID', 'Loyalty points'],
    processingTime: 'Instant',
    fees: 'Free',
    supported: true,
    color: 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800'
  },
  {
    name: 'Cash on Delivery',
    description: 'Pay when your order arrives',
    icon: Banknote,
    features: ['No upfront payment', 'Inspect before paying', 'Lagos & Abuja only'],
    processingTime: 'Upon delivery',
    fees: '₦500 service fee',
    supported: true,
    color: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
  },
  {
    name: 'QR Code Payment',
    description: 'Scan and pay with your banking app',
    icon: QrCode,
    features: ['No card details needed', 'Bank app integration', 'Secure scanning'],
    processingTime: 'Instant',
    fees: 'Free',
    supported: false,
    color: 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800'
  }
];

const securityFeatures = [
  {
    title: 'SSL Encryption',
    description: 'All payment data is encrypted with 256-bit SSL',
    icon: Lock
  },
  {
    title: 'PCI Compliance',
    description: 'We meet the highest payment security standards',
    icon: Shield
  },
  {
    title: 'Fraud Protection',
    description: 'Advanced fraud detection and prevention',
    icon: AlertCircle
  },
  {
    title: 'Secure Storage',
    description: 'Your payment details are never stored on our servers',
    icon: CheckCircle
  }
];

function PaymentOptions() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="Payment Options" />
      
      {/* Introduction */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Secure & Convenient Payment Methods</h2>
              <p className="text-muted-foreground">
                We offer multiple secure payment options to make your shopping experience as convenient as possible. Choose the method that works best for you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Available Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method, index) => (
            <Card key={index} className={`${method.color} ${!method.supported ? 'opacity-60' : ''} transition-all hover:shadow-lg`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <method.icon className="h-8 w-8 text-primary" />
                  {method.supported ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{method.name}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span className="font-medium">{method.processingTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fees:</span>
                    <span className="font-medium text-green-600">{method.fees}</span>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-2">Features:</p>
                    <ul className="space-y-1">
                      {method.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                          {feature}
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

      {/* Payment Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            How Payment Processing Works
          </CardTitle>
          <CardDescription>
            Understanding our secure payment process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Select Payment</h4>
              <p className="text-sm text-muted-foreground">Choose your preferred payment method at checkout</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 dark:text-green-300 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Secure Processing</h4>
              <p className="text-sm text-muted-foreground">Your payment is processed through encrypted channels</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-600 dark:text-yellow-300 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Verification</h4>
              <p className="text-sm text-muted-foreground">Payment is verified and order is confirmed</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 dark:text-purple-300 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Order Processing</h4>
              <p className="text-sm text-muted-foreground">Your order enters our fulfillment process</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Payment Security
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <feature.icon className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">{feature.title}</h4>
                    <p className="text-sm text-green-700 dark:text-green-200">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Payment FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Is it safe to save my card details?</h4>
              <p className="text-sm text-muted-foreground">Yes, we use tokenization to securely store your payment information. Your actual card details are never stored on our servers.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">What if my payment fails?</h4>
              <p className="text-sm text-muted-foreground">If your payment fails, you'll receive an immediate notification. You can try again with the same or different payment method. Your order will be held for 15 minutes.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Can I get a refund?</h4>
              <p className="text-sm text-muted-foreground">Yes, refunds are processed back to your original payment method within 5-10 business days after we receive your return.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Do you accept international cards?</h4>
              <p className="text-sm text-muted-foreground">Yes, we accept international Visa, Mastercard, and American Express cards. Additional verification may be required for international transactions.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentOptions;
