import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ControlledFormInput } from '@/components';
import { SectionTitle } from '@/components';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAppSelector } from '@/hooks';
import { toast } from '@/components/ui/use-toast';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2,
  AlertTriangle
} from 'lucide-react';

interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  accountSecurity: boolean;
  newsletter: boolean;
  smsNotifications: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  showPurchaseHistory: boolean;
  allowPersonalization: boolean;
  dataCollection: boolean;
}

function Settings() {
  const user = useAppSelector((state) => state.userState.user);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'security' | 'billing'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    website: ''
  });

  // Settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    orderUpdates: true,
    promotions: true,
    accountSecurity: true,
    newsletter: false,
    smsNotifications: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'private',
    showPurchaseHistory: false,
    allowPersonalization: true,
    dataCollection: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ] as const;

  const handleProfileUpdate = () => {
    // Here you would typically call an API to update the profile
    toast({ description: 'Profile updated successfully!' });
  };

  const handleNotificationUpdate = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({ description: 'Notification preferences updated' });
  };

  const handlePrivacyUpdate = (key: keyof PrivacySettings, value: boolean | string) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast({ description: 'Privacy settings updated' });
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Update your personal details and profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ControlledFormInput
              label="First Name"
              value={profileForm.firstName}
              onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
              type="text"
            />
            <ControlledFormInput
              label="Last Name"
              value={profileForm.lastName}
              onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
              type="text"
            />
          </div>
          
          <ControlledFormInput
            label="Email Address"
            value={profileForm.email}
            onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
            type="email"
          />
          
          <ControlledFormInput
            label="Phone Number"
            value={profileForm.phone}
            onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
            type="tel"
            placeholder="+234 800 000 0000"
          />
          
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              className="w-full px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
              value={profileForm.bio}
              onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
            />
          </div>
          
          <ControlledFormInput
            label="Website"
            value={profileForm.website}
            onChange={(e) => setProfileForm(prev => ({ ...prev, website: e.target.value }))}
            type="url"
            placeholder="https://yourwebsite.com"
          />
          
          <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Choose what email notifications you'd like to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  {key === 'orderUpdates' && <Mail className="h-4 w-4 text-blue-500" />}
                  {key === 'promotions' && <Globe className="h-4 w-4 text-green-500" />}
                  {key === 'accountSecurity' && <Shield className="h-4 w-4 text-red-500" />}
                  {key === 'newsletter' && <Mail className="h-4 w-4 text-purple-500" />}
                  {key === 'smsNotifications' && <Smartphone className="h-4 w-4 text-orange-500" />}
                  <label className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  {key === 'orderUpdates' && 'Get notified about your order status and shipping updates'}
                  {key === 'promotions' && 'Receive emails about sales, discounts, and special offers'}
                  {key === 'accountSecurity' && 'Important security alerts and login notifications'}
                  {key === 'newsletter' && 'Weekly newsletter with new products and company updates'}
                  {key === 'smsNotifications' && 'Receive text messages for urgent notifications'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => handleNotificationUpdate(key as keyof NotificationSettings, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Controls
          </CardTitle>
          <CardDescription>
            Manage how your information is used and displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Profile Visibility</label>
              <p className="text-xs text-muted-foreground">
                Control who can see your profile information
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={privacy.profileVisibility === 'public' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePrivacyUpdate('profileVisibility', 'public')}
              >
                Public
              </Button>
              <Button
                variant={privacy.profileVisibility === 'private' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePrivacyUpdate('profileVisibility', 'private')}
              >
                Private
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Show Purchase History</label>
              <p className="text-xs text-muted-foreground">
                Allow others to see your purchase history and reviews
              </p>
            </div>
            <Switch
              checked={privacy.showPurchaseHistory}
              onCheckedChange={(checked) => handlePrivacyUpdate('showPurchaseHistory', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Personalization</label>
              <p className="text-xs text-muted-foreground">
                Use my data to personalize product recommendations
              </p>
            </div>
            <Switch
              checked={privacy.allowPersonalization}
              onCheckedChange={(checked) => handlePrivacyUpdate('allowPersonalization', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Data Collection</label>
              <p className="text-xs text-muted-foreground">
                Allow collection of usage data to improve our services
              </p>
            </div>
            <Switch
              checked={privacy.dataCollection}
              onCheckedChange={(checked) => handlePrivacyUpdate('dataCollection', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password & Security
          </CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 border border-input rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Confirm new password"
              />
            </div>
            
            <Button className="w-full md:w-auto">
              Update Password
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">SMS Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Secure your account with SMS verification
                </p>
              </div>
              <Badge variant="outline" className="text-green-600">
                Active
              </Badge>
            </div>
            
            <Button variant="outline" className="w-full md:w-auto">
              Manage 2FA Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
          <CardDescription>
            Manage your saved payment methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">**** **** **** 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            + Add New Payment Method
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-red-200 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-medium text-red-600">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionTitle text="Account Settings" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'privacy' && renderPrivacyTab()}
          {activeTab === 'security' && renderSecurityTab()}
          {activeTab === 'billing' && renderBillingTab()}
        </div>
      </div>
    </div>
  );
}

export default Settings;
