import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateUser } from '@/features/user/userSlice';
import { useToast } from '@/components/ui/use-toast';
import { User, Settings, Shield } from 'lucide-react';

type AccountFormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function Account() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const user = useAppSelector((state) => state.userState.user);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<AccountFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      const newValues = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
      };
      
      // Only update if not currently editing to avoid interfering with user input
      if (!isEditingProfile) {
        resetProfile(newValues);
      }
    }
  }, [user, resetProfile, isEditingProfile]);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch,
  } = useForm<PasswordFormData>();

  const onSubmitProfile = async (data: AccountFormData) => {
    setIsSaving(true);
    try {
      dispatch(updateUser(data));
      
      // Reset form with the updated values to ensure fresh state
      resetProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
      
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitPassword = (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({ 
        description: 'New passwords do not match',
        variant: 'destructive'
      });
      return;
    }
    
    // Here you would typically make an API call to update the password
    toast({ description: 'Password updated successfully' });
    setIsChangingPassword(false);
    resetPassword();
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    resetProfile({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    });
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    resetPassword();
  };

  if (!user) {
    return (
      <main className="flex-1 flex items-center justify-center py-12 px-6 sm:px-8 lg:px-12 xl:px-16">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please log in to access your account settings.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12 px-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Information Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...registerProfile('firstName', { 
                          required: 'First name is required' 
                        })}
                        disabled={!isEditingProfile}
                        className={!isEditingProfile ? 'bg-muted cursor-not-allowed' : ''}
                        placeholder="Enter your first name"
                      />
                      {profileErrors.firstName && (
                        <p className="text-sm text-red-500">
                          {profileErrors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...registerProfile('lastName', { 
                          required: 'Last name is required' 
                        })}
                        disabled={!isEditingProfile}
                        className={!isEditingProfile ? 'bg-muted' : ''}
                      />
                      {profileErrors.lastName && (
                        <p className="text-sm text-red-500">
                          {profileErrors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        {...registerProfile('username', { 
                          required: 'Username is required' 
                        })}
                        disabled={!isEditingProfile}
                        className={!isEditingProfile ? 'bg-muted' : ''}
                      />
                      {profileErrors.username && (
                        <p className="text-sm text-red-500">
                          {profileErrors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...registerProfile('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        disabled={!isEditingProfile}
                        className={!isEditingProfile ? 'bg-muted' : ''}
                      />
                      {profileErrors.email && (
                        <p className="text-sm text-red-500">
                          {profileErrors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        {...registerProfile('phoneNumber')}
                        disabled={!isEditingProfile}
                        placeholder="(Optional)"
                        className={!isEditingProfile ? 'bg-muted' : ''}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    {isEditingProfile ? (
                      <>
                        <Button type="submit" size="sm" disabled={isSaving}>
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button 
                        type="button" 
                        size="sm"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Security Settings */}
          <div className="space-y-6">
            {/* Change Password Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isChangingPassword ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Keep your account secure by updating your password regularly.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      Change Password
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        {...registerPassword('currentPassword', { 
                          required: 'Current password is required' 
                        })}
                      />
                      {passwordErrors.currentPassword && (
                        <p className="text-sm text-red-500">
                          {passwordErrors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...registerPassword('newPassword', { 
                          required: 'New password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                      />
                      {passwordErrors.newPassword && (
                        <p className="text-sm text-red-500">
                          {passwordErrors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...registerPassword('confirmPassword', { 
                          required: 'Please confirm your password',
                          validate: (value) => 
                            value === watch('newPassword') || 'Passwords do not match'
                        })}
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {passwordErrors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button type="submit" size="sm" className="w-full">
                        Update Password
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={handleCancelPasswordChange}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Account Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Member since</span>
                    <span>January 2024</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total orders</span>
                    <span>0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account status</span>
                    <span className="text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;
