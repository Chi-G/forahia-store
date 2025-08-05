import { ActionFunction, Form, Link, redirect } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitBtn, FormInput, Footer, Header, Navbar } from '@/components';
import { customFetch } from '@/utils';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

export const action: ActionFunction = async ({
  request,
}): Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/local/register', data);
    toast({ description: 'Registered' });
    return redirect('/login');
  } catch (error) {
    // console.log(error);
    const errorMsg =
      error instanceof AxiosError
        ? error.response?.data.error.message
        : 'Registration Failed';
    toast({ description: errorMsg });

    return null;
  }
};

function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className='w-full max-w-md bg-muted'>
          <CardHeader>
            <CardTitle className='text-center'>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method='post'>
              <FormInput type='text' name='username' />
              <FormInput type='email' name='email' />
              <FormInput type='password' name='password' />
              <SubmitBtn text='Register' className='w-full mt-4' />
              <p className='text-center mt-4'>
                Already a member?{' '}
                <Button type='button' asChild variant='link'>
                  <Link to='/login'>Login</Link>
                </Button>
              </p>
            </Form>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
export default Register;
