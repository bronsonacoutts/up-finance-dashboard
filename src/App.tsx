import { SubscriptionDashboard } from './features/subscriptions/components/SubscriptionDashboard';
import { BillingCalendar } from './features/subscriptions/components/BillingCalendar';
import { useSubscriptionStore } from './features/subscriptions/store';

function App() {
  const { subscriptions } = useSubscriptionStore();

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <SubscriptionDashboard />
        {subscriptions.length > 0 && (
             <div className="grid grid-cols-1">
                <BillingCalendar subscriptions={subscriptions} />
             </div>
        )}
      </div>
    </div>
  );
}

export default App;
