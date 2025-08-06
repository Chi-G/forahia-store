import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Package, 
  CheckCircle, 
  XCircle,
  Clock,
  CreditCard,
  Truck,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Download
} from 'lucide-react';

const returnPolicies = [
  {
    category: 'Electronics',
    timeframe: '14 days',
    condition: 'Unopened packaging',
    restockingFee: 'None',
    icon: Package,
    color: 'text-blue-600'
  },
  {
    category: 'Clothing & Accessories',
    timeframe: '30 days',
    condition: 'Tags attached, unworn',
    restockingFee: 'None',
    icon: RefreshCw,
    color: 'text-green-600'
  },
  {
    category: 'Home & Furniture',
    timeframe: '30 days',
    condition: 'Original condition',
    restockingFee: '10% for large items',
    icon: CheckCircle,
    color: 'text-purple-600'
  },
  {
    category: 'Books & Media',
    timeframe: '14 days',
    condition: 'Unopened/unread',
    restockingFee: 'None',
    icon: FileText,
    color: 'text-orange-600'
  }
];

const returnSteps = [
  {
    step: 1,
    title: 'Request Return',
    description: 'Submit a return request through your account or contact support',
    icon: FileText
  },
  {
    step: 2,
    title: 'Return Authorization',
    description: 'Receive return label and instructions via email',
    icon: Mail
  },
  {
    step: 3,
    title: 'Package & Ship',
    description: 'Pack item securely and ship using our prepaid label',
    icon: Package
  },
  {
    step: 4,
    title: 'Processing',
    description: 'We inspect the item and process your refund',
    icon: CheckCircle
  },
  {
    step: 5,
    title: 'Refund Issued',
    description: 'Refund processed to your original payment method',
    icon: CreditCard
  }
];

const mockOrdersForReturn = [
  {
    orderNumber: 'FH-2024-0001230',
    date: 'December 15, 2023',
    status: 'Delivered',
    total: '₦25,999',
    items: [
      { name: 'Wireless Headphones', canReturn: true, returnBy: 'January 15, 2024' },
      { name: 'Phone Case', canReturn: true, returnBy: 'January 15, 2024' }
    ]
  },
  {
    orderNumber: 'FH-2024-0001231',
    date: 'December 20, 2023',
    status: 'Delivered',
    total: '₦45,500',
    items: [
      { name: 'Smart Watch', canReturn: false, returnBy: 'Return period expired' },
      { name: 'Charging Cable', canReturn: true, returnBy: 'January 20, 2024' }
    ]
  }
];

function ReturnsRefunds() {
  const [selectedTab, setSelectedTab] = useState<'policy' | 'return' | 'status'>('policy');

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="Returns & Refunds" />
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 max-w-md mx-auto">
        <button
          onClick={() => setSelectedTab('policy')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedTab === 'policy' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Return Policy
        </button>
        <button
          onClick={() => setSelectedTab('return')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedTab === 'return' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Start Return
        </button>
        <button
          onClick={() => setSelectedTab('status')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedTab === 'status' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Return Status
        </button>
      </div>

      {/* Return Policy Tab */}
      {selectedTab === 'policy' && (
        <>
          {/* Policy Overview */}
          <Card className="mb-8 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <RefreshCw className="h-5 w-5" />
                30-Day Return Guarantee
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                We stand behind our products with a hassle-free return policy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold mb-1">Extended Returns</h4>
                  <p className="text-sm text-muted-foreground">Up to 30 days for most items</p>
                </div>
                <div>
                  <Truck className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold mb-1">Free Return Shipping</h4>
                  <p className="text-sm text-muted-foreground">We provide prepaid return labels</p>
                </div>
                <div>
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold mb-1">Full Refunds</h4>
                  <p className="text-sm text-muted-foreground">100% refund to original payment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category-Specific Policies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Return Policy by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {returnPolicies.map((policy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <policy.icon className={`h-6 w-6 ${policy.color}`} />
                      {policy.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Return Period:</span>
                        <span className="font-medium">{policy.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition:</span>
                        <span className="font-medium">{policy.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Restocking Fee:</span>
                        <span className={`font-medium ${policy.restockingFee === 'None' ? 'text-green-600' : 'text-orange-600'}`}>
                          {policy.restockingFee}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Return Process */}
          <Card>
            <CardHeader>
              <CardTitle>Return Process</CardTitle>
              <CardDescription>Simple steps to return your item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {returnSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <step.icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Start Return Tab */}
      {selectedTab === 'return' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Order to Return</CardTitle>
              <CardDescription>Choose from your recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrdersForReturn.map((order, index) => (
                  <Card key={index} className="border-2 border-dashed">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold">{order.orderNumber}</h4>
                          <p className="text-sm text-muted-foreground">
                            Ordered: {order.date} • Total: {order.total}
                          </p>
                        </div>
                        <Badge>{order.status}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-center p-2 bg-muted rounded">
                            <span className="font-medium">{item.name}</span>
                            <div className="flex items-center gap-2">
                              {item.canReturn ? (
                                <>
                                  <span className="text-xs text-muted-foreground">
                                    Return by: {item.returnBy}
                                  </span>
                                  <Button size="sm">Return Item</Button>
                                </>
                              ) : (
                                <span className="text-xs text-red-600">{item.returnBy}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Return Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Return Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Required Information</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Order number
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Reason for return
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Photos of the item (if damaged)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Original packaging (when possible)
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Return Conditions</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Items must be unused
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      No signs of wear or damage
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      All accessories included
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Within return period
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Return Status Tab */}
      {selectedTab === 'status' && (
        <Card>
          <CardHeader>
            <CardTitle>Track Return Status</CardTitle>
            <CardDescription>Enter your return reference number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter return reference number"
                  className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Track Return
                </Button>
              </div>
              
              <div className="bg-muted p-6 rounded-lg text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Enter a return reference number to view the status
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Support */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Help with Returns?</CardTitle>
          <CardDescription>
            Our customer service team is here to help with any return questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Phone className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">Call Support</p>
                <p className="text-sm text-muted-foreground">+234 800 000 0000</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Mail className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">Email Support</p>
                <p className="text-sm text-muted-foreground">returns@forahia.com</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Download className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">Return Form</p>
                <p className="text-sm text-muted-foreground">Download PDF form</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReturnsRefunds;
