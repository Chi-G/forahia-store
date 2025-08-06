import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Clock, 
  Users, 
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';

const supportChannels = [
  {
    name: 'WhatsApp Support',
    description: 'Get instant help via WhatsApp chat',
    icon: MessageCircle,
    availability: 'Available 24/7',
    responseTime: 'Instant',
    color: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
    textColor: 'text-green-800 dark:text-green-200',
    action: 'Chat Now',
    url: 'https://wa.me/2347065910449?text=Hello! I need help with my order from Forahia Store.',
    featured: true
  },
  {
    name: 'Live Chat',
    description: 'Chat with our support agents in real-time',
    icon: MessageCircle,
    availability: 'Mon-Fri 9AM-6PM',
    responseTime: '< 2 minutes',
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
    textColor: 'text-blue-800 dark:text-blue-200',
    action: 'Start Chat',
    url: '#',
    featured: false
  },
  {
    name: 'Phone Support',
    description: 'Speak directly with our support team',
    icon: Phone,
    availability: 'Mon-Fri 9AM-6PM',
    responseTime: 'Immediate',
    color: 'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
    textColor: 'text-purple-800 dark:text-purple-200',
    action: 'Call Now',
    url: 'tel:+2347065910449',
    featured: false
  },
  {
    name: 'Email Support',
    description: 'Send us detailed questions via email',
    icon: Mail,
    availability: 'Always open',
    responseTime: '< 24 hours',
    color: 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800',
    textColor: 'text-orange-800 dark:text-orange-200',
    action: 'Send Email',
    url: 'mailto:chijindu.nwokeohuru@gmail.com',
    featured: false
  }
];

const commonQuestions = [
  {
    question: 'How can I track my order?',
    answer: 'You can track your order using the tracking number sent to your email, or by visiting the "Track Order" page.',
    category: 'Orders'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept credit cards, debit cards, PayPal, bank transfers, and mobile payments.',
    category: 'Payment'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 business days, while express delivery takes 1-2 business days.',
    category: 'Shipping'
  },
  {
    question: 'Can I return an item?',
    answer: 'Yes, we offer a 30-day return policy for most items in original condition.',
    category: 'Returns'
  }
];

const supportFeatures = [
  {
    title: 'Instant Responses',
    description: 'Get immediate answers to your questions',
    icon: Zap
  },
  {
    title: 'Multi-language Support',
    description: 'Available in English, Yoruba, Hausa, and Igbo',
    icon: Globe
  },
  {
    title: 'Mobile Friendly',
    description: 'Access support from any device',
    icon: Smartphone
  },
  {
    title: 'Expert Team',
    description: 'Trained professionals ready to help',
    icon: Users
  }
];

function LiveChat() {
  const handleWhatsAppChat = () => {
    const whatsappUrl = 'https://wa.me/2347065910449?text=Hello! I need help with my order from Forahia Store. Please assist me.';
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailSupport = () => {
    const subject = encodeURIComponent('Support Request - Forahia Store');
    const body = encodeURIComponent('Hello Forahia Support Team,\n\nI need assistance with my order.\n\nOrder Number: \nDescription of issue: \n\nThank you!');
    window.location.href = `mailto:chijindu.nwokeohuru@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="Live Support" />
      
      {/* Hero Section */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
        <CardContent className="p-8 text-center">
          <MessageCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold mb-4">Get Instant Help</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our friendly support team is here to help you with any questions about your orders, products, or account. 
            Choose your preferred way to connect with us.
          </p>
          <Button size="lg" onClick={handleWhatsAppChat} className="bg-green-600 hover:bg-green-700">
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </CardContent>
      </Card>

      {/* Support Channels */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Choose Your Support Channel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportChannels.map((channel, index) => (
            <Card key={index} className={`${channel.color} ${channel.featured ? 'ring-2 ring-green-500 relative' : ''} hover:shadow-lg transition-all`}>
              {channel.featured && (
                <Badge className="absolute -top-2 left-4 bg-green-600">
                  Recommended
                </Badge>
              )}
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 ${channel.textColor}`}>
                  <channel.icon className="h-6 w-6" />
                  {channel.name}
                </CardTitle>
                <CardDescription className={channel.textColor}>
                  {channel.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Availability:</span>
                    <span className="text-sm font-medium">{channel.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Response Time:</span>
                    <span className="text-sm font-medium text-green-600">{channel.responseTime}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant={channel.featured ? 'default' : 'outline'}
                  onClick={() => {
                    if (channel.name === 'WhatsApp Support') {
                      handleWhatsAppChat();
                    } else if (channel.name === 'Email Support') {
                      handleEmailSupport();
                    } else if (channel.name === 'Phone Support') {
                      window.open(channel.url, '_self');
                    } else {
                      window.open(channel.url, '_blank');
                    }
                  }}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Support Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Our Support?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportFeatures.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <feature.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Help */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Quick Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonQuestions.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {item.question}
                  </CardTitle>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Hours */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center">
            <Clock className="h-5 w-5" />
            Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div>
              <h4 className="font-semibold mb-2">WhatsApp Support</h4>
              <p className="text-muted-foreground">
                Available 24/7<br />
                Instant responses
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Phone & Live Chat</h4>
              <p className="text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM (WAT)<br />
                Saturday: 10:00 AM - 4:00 PM (WAT)<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LiveChat;
