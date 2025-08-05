import { Header, Loading, Navbar, Footer } from '@/components';
import { Outlet, useNavigation } from 'react-router-dom';

function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar /> 

      <main className='w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-20 flex-1'>
        {isPageLoading ? <Loading /> : <Outlet />}
      </main>
      
      <Footer />
    </div>
  );
}
export default HomeLayout;
