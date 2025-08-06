import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  FileText,
  ShoppingBag,
  CreditCard,
  Truck,
  RefreshCw,
  Users,
  ArrowRight
} from 'lucide-react';

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of shopping with us',
    icon: ShoppingBag,
    articles: [
      'How to create an account',
      'Browsing and finding products',
      'Understanding product details',
      'Using filters and search'
    ]
  },
  {
    title: 'Orders & Payment',
    description: 'Everything about placing and paying for orders',
    icon: CreditCard,
    articles: [
      'How to place an order',
      'Payment methods accepted',
      'Understanding checkout process',
      'Order confirmation emails'
    ]
  },
  {
    title: 'Shipping & Delivery',
    description: 'Track your orders and delivery info',
    icon: Truck,
    articles: [
      'Shipping options and costs',
      'Delivery timeframes',
      'Tracking your order',
      'Delivery address changes'
    ]
  },
  {
    title: 'Returns & Refunds',
    description: 'Return policy and refund process',
    icon: RefreshCw,
    articles: [
      'Return policy guidelines',
      'How to return an item',
      'Refund processing times',
      'Exchange procedures'
    ]
  }
];

const frequentlyAsked = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers through our secure payment gateway.'
  },
  {
    question: 'Can I change my order after placing it?',
    answer: 'You can modify your order within 2 hours of placing it. After that, please contact our support team.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in original packaging. Return shipping is free for defective items.'
  }
];

function HelpCenter() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="Help Center" />
      
      {/* Search Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or common questions..."
                className="w-full pl-10 pr-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Live Chat</h3>
            <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">Get instant help from our support team</p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardContent className="p-4 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900 dark:text-green-100">Call Us</h3>
            <p className="text-sm text-green-700 dark:text-green-200 mb-3">Speak directly with our support team</p>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              +234 800 000 0000
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800">
          <CardContent className="p-4 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">Email Support</h3>
            <p className="text-sm text-purple-700 dark:text-purple-200 mb-3">Send us your questions anytime</p>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Email Us
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Help Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Browse Help Topics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <category.icon className="h-6 w-6 text-primary" />
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                      <ArrowRight className="h-3 w-3" />
                      {article}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  View All Articles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="h-6 w-6" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {frequentlyAsked.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <Card className="mt-8 bg-muted/50">
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">Support Hours</h3>
          <p className="text-muted-foreground">
            Monday - Friday: 9:00 AM - 6:00 PM (WAT)<br />
            Saturday: 10:00 AM - 4:00 PM (WAT)<br />
            Sunday: Closed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default HelpCenter;
