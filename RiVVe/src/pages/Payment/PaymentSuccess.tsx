import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] flex items-center justify-center">
      <div className="bg-[#3a85b3]/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">Payment Successful!</h2>
          <p className="text-white">Thank you for your subscription..</p>
          <p className="text-white mt-2">Session ID: {sessionId}</p>
        </div>
        
        <button 
          className="w-full px-6 py-3 rounded-xl bg-[#2772A0] text-white hover:bg-[#3a85b3] transition-all font-medium"
          onClick={() => navigate('/user')}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;