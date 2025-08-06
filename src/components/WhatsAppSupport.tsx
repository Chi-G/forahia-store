import { useState } from 'react';
import { MessageCircle, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function WhatsAppSupport() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello! I need help with my order from Forahia Store. Please assist me."
    );
    const whatsappUrl = `https://wa.me/2347065910449?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Support Request - Forahia Store');
    const body = encodeURIComponent('Hello Forahia Support Team,\n\nI need assistance with my order.\n\nOrder Number: \nDescription of issue: \n\nThank you!');
    window.open(`mailto:chijindu.nwokeohuru@gmail.com?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Support Options */}
      {isExpanded && (
        <Card className="mb-4 w-80 shadow-2xl animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Need Help?</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Choose how you'd like to get support:
            </p>
            
            <div className="space-y-3">
              {/* WhatsApp Option */}
              <Button
                onClick={handleWhatsAppClick}
                className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">WhatsApp Chat</div>
                  <div className="text-xs opacity-90">Available 24/7 • Instant response</div>
                </div>
              </Button>
              
              {/* Email Option */}
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="w-full justify-start"
              >
                <Mail className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Email Support</div>
                  <div className="text-xs text-muted-foreground">Response within 24 hours</div>
                </div>
              </Button>
            </div>
            
            <div className="mt-4 pt-3 border-t text-center">
              <p className="text-xs text-muted-foreground">
                Our support team is here to help!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Support Button */}
      <div className="flex flex-col items-center">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="lg"
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl transition-all duration-300 hover:scale-105 mb-2"
          aria-label="Get support"
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )} 
        </Button>
        
        {/* Live Chat Text */}
        <span className="text-xs font-medium text-white bg-green-600 px-2 py-1 rounded-full shadow-lg">
          Live Chat
        </span>
      </div>
      
      {/* Notification Badge */}
      {!isExpanded && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">!</span>
        </div>
      )}
    </div>
  );
}

export default WhatsAppSupport;
