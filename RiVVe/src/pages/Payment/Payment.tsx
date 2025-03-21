import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get plan info from location state (passed from email verification)
  const { planType, planDuration } = location.state || {};
  console.log("✅ Received Payment Data:", { planType, planDuration }); 
  useEffect(() => {
    // If no plan info, redirect to dashboard or home
    if (!planType || !planDuration) {
      navigate('/login');
      return;
    }

    // Automatically initiate checkout
    handlePayment(planType, planDuration);
  }, [planType, planDuration, navigate]);

  // Function to initiate payment process
  const handlePayment = async (planType: string, planDuration: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Call backend endpoint
      const response = await axios.post('https://sdgp-backend-590336222818.us-central1.run.app/create-checkout-session', {
        planType,
        planDuration
      });
      
      // Redirect to Stripe checkout page
      window.location.href = response.data.url;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Payment initialization failed');
      console.error('Payment error:', err);
      setLoading(false);
    }
  };

  // Show loading state or error
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] flex items-center justify-center">
      <div className="bg-[#3a85b3]/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
        {error ? (
          <>
            <h2 className="text-2xl font-bold text-red-400 mb-4">Payment Error</h2>
            <p className="text-white mb-6">{error}</p>
            <button 
              className="px-6 py-2 rounded-xl bg-[#2772A0] text-white hover:bg-[#3a85b3] transition-all"
              onClick={() => navigate('./pages/Login')}
            >
              Return to login
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">Preparing Your Payment...</h2>
            <p className="text-white mb-6">Please wait while we redirect you to our secure payment page.</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#60A5FA]"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;