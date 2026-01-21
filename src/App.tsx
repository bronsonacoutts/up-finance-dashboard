import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './features/auth/components/Login';
import { SubscriptionDashboard } from './features/subscriptions/components/SubscriptionDashboard';
import { BillingCalendar } from './features/subscriptions/components/BillingCalendar';
import { useSubscriptionStore } from './features/subscriptions/store';
import { Layout } from './components/Layout';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return <Login />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  const { subscriptions } = useSubscriptionStore();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-foreground">
        <ProtectedRoute>
            <div className="space-y-6">
                <SubscriptionDashboard />
                {subscriptions.length > 0 && (
                     <div className="grid grid-cols-1">
                        <BillingCalendar subscriptions={subscriptions} />
                     </div>
                )}
            </div>
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}

export default App;
