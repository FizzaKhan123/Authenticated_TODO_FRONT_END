'use client';
import './globals.css';
import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './redux/store';
import { setAuthenticated } from './redux/features/authSlice';
import { useRouter } from 'next/navigation'; 
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

interface RootLayoutProps {
  children: ReactNode;
}

const AuthHandler = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => { 
    const token = document.cookie.split('; ').find((row) => row.startsWith('authToken='));
    if (token) {
      dispatch(setAuthenticated(true)); 
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]);

  useEffect(() => {
    // Redirect based on authentication state
    if (isAuthenticated) {
      router.push('/'); // Redirect to home page if authenticated
    } else {
      router.push('/login'); // Redirect to signin page if not authenticated
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      {children}
    </div>
  );
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {/* Wrap content in AuthHandler for authentication and redirection logic */}
          <AuthHandler>{children}</AuthHandler>
        </Provider>
      </body>
    </html>
  );
}
