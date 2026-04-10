import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import { Outlet } from 'react-router-dom';
import Home from './pages/Home';
import MyHealth from './pages/MyHealth';
import MyFuture from './pages/MyFuture';
import MyPlan from './pages/MyPlan';
import Coach from './pages/Coach';
import Journey from './pages/Journey';
import ClinicOverview from './pages/clinic/ClinicOverview';
import ClinicSegments from './pages/clinic/ClinicSegments';
import ClinicFunnel from './pages/clinic/ClinicFunnel';
import ClinicOpportunities from './pages/clinic/ClinicOpportunities';
import Patient360 from './pages/clinic/Patient360';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout><Outlet /></Layout>}>
        <Route path="/" element={<Home />} />
        <Route path="/my-health" element={<MyHealth />} />
        <Route path="/my-future" element={<MyFuture />} />
        <Route path="/my-plan" element={<MyPlan />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/clinic" element={<ClinicOverview />} />
        <Route path="/clinic/segments" element={<ClinicSegments />} />
        <Route path="/clinic/funnel" element={<ClinicFunnel />} />
        <Route path="/clinic/opportunities" element={<ClinicOpportunities />} />
        <Route path="/clinic/patient/:id" element={<Patient360 />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App