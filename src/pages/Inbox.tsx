import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SectionTitle } from '@/components';
import { 
  Mail, 
  MailOpen, 
  Star, 
  Archive, 
  Trash2, 
  Clock,
  Package,
  CreditCard,
  Gift,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'order' | 'promotion' | 'account' | 'system';
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'order',
    subject: 'Order Confirmation - #ORD-2024-001',
    preview: 'Your order has been confirmed and is being processed. Expected delivery: 3-5 business days.',
    date: '2 hours ago',
    isRead: false,
    isStarred: true,
    priority: 'high'
  },
  {
    id: '2',
    type: 'promotion',
    subject: 'Flash Sale: 50% Off Electronics!',
    preview: 'Limited time offer on all electronics. Use code FLASH50 at checkout. Sale ends midnight tonight!',
    date: '1 day ago',
    isRead: false,
    isStarred: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'account',
    subject: 'Security Alert: New Login Detected',
    preview: 'We detected a new login to your account from Lagos, Nigeria. If this wasn\'t you, please secure your account.',
    date: '2 days ago',
    isRead: true,
    isStarred: false,
    priority: 'high'
  },
  {
    id: '4',
    type: 'order',
    subject: 'Your Package is Out for Delivery',
    preview: 'Good news! Your order #ORD-2024-002 is out for delivery and will arrive today between 2-6 PM.',
    date: '3 days ago',
    isRead: true,
    isStarred: true,
    priority: 'medium'
  },
  {
    id: '5',
    type: 'system',
    subject: 'Welcome to Forahia Store!',
    preview: 'Thank you for joining Forahia Store. Explore our amazing collection and enjoy exclusive member benefits.',
    date: '1 week ago',
    isRead: true,
    isStarred: false,
    priority: 'low'
  }
];

const getMessageIcon = (type: Message['type']) => {
  switch (type) {
    case 'order':
      return <Package className="h-4 w-4 text-blue-600" />;
    case 'promotion':
      return <Gift className="h-4 w-4 text-green-600" />;
    case 'account':
      return <AlertCircle className="h-4 w-4 text-orange-600" />;
    case 'system':
      return <CreditCard className="h-4 w-4 text-purple-600" />;
    default:
      return <Mail className="h-4 w-4 text-gray-600" />;
  }
};

const getPriorityColor = (priority: Message['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

function Inbox() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'starred'>('all');

  const unreadCount = messages.filter(m => !m.isRead).length;
  const starredCount = messages.filter(m => m.isStarred).length;

  const filteredMessages = messages.filter(message => {
    switch (selectedFilter) {
      case 'unread':
        return !message.isRead;
      case 'starred':
        return message.isStarred;
      default:
        return true;
    }
  });

  const toggleRead = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: !msg.isRead } : msg
    ));
  };

  const toggleStar = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="Inbox" />
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('all')}
          className="flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          All Messages
          <Badge variant="secondary" className="ml-1">
            {messages.length}
          </Badge>
        </Button>
        <Button
          variant={selectedFilter === 'unread' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('unread')}
          className="flex items-center gap-2"
        >
          <MailOpen className="h-4 w-4" />
          Unread
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-1">
              {unreadCount}
            </Badge>
          )}
        </Button>
        <Button
          variant={selectedFilter === 'starred' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('starred')}
          className="flex items-center gap-2"
        >
          <Star className="h-4 w-4" />
          Starred
          {starredCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {starredCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No messages found</h3>
              <p className="text-muted-foreground text-center">
                {selectedFilter === 'unread' && 'You have no unread messages.'}
                {selectedFilter === 'starred' && 'You have no starred messages.'}
                {selectedFilter === 'all' && 'Your inbox is empty.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`transition-all hover:shadow-md cursor-pointer ${
                !message.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getMessageIcon(message.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className={`text-base truncate ${!message.isRead ? 'font-bold' : 'font-medium'}`}>
                          {message.subject}
                        </CardTitle>
                        <Badge variant="outline" className={getPriorityColor(message.priority)}>
                          {message.priority}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm line-clamp-2">
                        {message.preview}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {message.date}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRead(message.id)}
                      className="flex items-center gap-1"
                    >
                      {message.isRead ? (
                        <>
                          <Mail className="h-4 w-4" />
                          Mark Unread
                        </>
                      ) : (
                        <>
                          <MailOpen className="h-4 w-4" />
                          Mark Read
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(message.id)}
                      className="flex items-center gap-1"
                    >
                      <Star className={`h-4 w-4 ${message.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      {message.isStarred ? 'Unstar' : 'Star'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Inbox;
