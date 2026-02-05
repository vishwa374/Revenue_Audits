import React, { useState, useEffect } from 'react';
import { FormSection } from './FormSection';
import { ResultsDashboard } from './ResultsDashboard';

const HotelAudit = () => {
  const [formData, setFormData] = useState({
    email: '',
    websiteUrl: '',
    totalRooms: '',
    avgDailyRate: '',
    avgLengthOfStay: 2.5
  });

  const [scores, setScores] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [error, setError] = useState('');
  const [analysisNotes, setAnalysisNotes] = useState({});

  // Detect currency based on location
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const currencyCode = data.currency || 'USD';
        setCurrency(currencyCode);
        
        const symbols = {
          'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥',
          'AUD': 'A$', 'CAD': 'C$', 'CHF': 'Fr', 'CNY': '¥',
          'INR': '₹', 'MXN': '$', 'BRL': 'R$', 'AED': 'د.إ'
        };
        setCurrencySymbol(symbols[currencyCode] || '$');
      } catch (err) {
        console.log('Using default currency');
      }
    };
    detectCurrency();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const analyzeWebsite = async () => {
    // Validate inputs
    if (!formData.email || !formData.websiteUrl || !formData.totalRooms || !formData.avgDailyRate) {
      setError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // URL validation
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (!urlRegex.test(formData.websiteUrl)) {
      setError('Please enter a valid website URL');
      return;
    }

    if (formData.totalRooms < 1 || formData.totalRooms > 10000) {
      setError('Total rooms must be between 1 and 10,000');
      return;
    }

    if (formData.avgDailyRate < 1 || formData.avgDailyRate > 100000) {
      setError('Average daily rate must be between 1 and 100,000');
      return;
    }

    setError('');
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Simulate analysis with realistic delay
    setTimeout(() => {
      // Demo scores (in production, this would come from actual analysis)
      const demoScores = {
        mobileBooking: Math.floor(Math.random() * 30) + 50,
        trustSignals: Math.floor(Math.random() * 25) + 60,
        bookingFriction: Math.floor(Math.random() * 20) + 65,
        visualAppeal: Math.floor(Math.random() * 25) + 55,
        loadSpeed: Math.floor(Math.random() * 30) + 50,
        priceTransparency: Math.floor(Math.random() * 25) + 60,
        roomPresentation: Math.floor(Math.random() * 20) + 65,
        urgencySignals: Math.floor(Math.random() * 35) + 40
      };

      const notes = {
        mobileBooking: demoScores.mobileBooking < 70 ? 'Mobile experience needs optimization for touch interactions and simplified booking flow.' : 'Good mobile optimization detected.',
        trustSignals: demoScores.trustSignals < 70 ? 'Consider adding security badges, guest reviews, and certifications prominently.' : 'Trust signals are well displayed.',
        bookingFriction: demoScores.bookingFriction < 70 ? 'Reduce booking steps and simplify the reservation process.' : 'Booking process is streamlined.',
        visualAppeal: demoScores.visualAppeal < 70 ? 'Enhance property photography and implement virtual tours.' : 'Visual presentation is engaging.',
        loadSpeed: demoScores.loadSpeed < 70 ? 'Page load time exceeds 3 seconds. Optimize images and scripts.' : 'Site loads quickly.',
        priceTransparency: demoScores.priceTransparency < 70 ? 'Display total pricing upfront including all fees and taxes.' : 'Pricing is transparent.',
        roomPresentation: demoScores.roomPresentation < 70 ? 'Add detailed room descriptions, amenities list, and 360° views.' : 'Rooms are well presented.',
        urgencySignals: demoScores.urgencySignals < 70 ? 'Implement real-time availability updates and limited-time offers.' : 'Urgency tactics are effective.'
      };

      setScores(demoScores);
      setAnalysisNotes(notes);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const calculateTotalImpact = () => {
    if (!scores) return 0;
    const weights = {
      mobileBooking: 0.20,
      trustSignals: 0.15,
      bookingFriction: 0.18,
      visualAppeal: 0.12,
      loadSpeed: 0.15,
      priceTransparency: 0.10,
      roomPresentation: 0.08,
      urgencySignals: 0.02
    };
    
    return Object.keys(scores).reduce((total, key) => {
      return total + (scores[key] * weights[key]);
    }, 0);
  };

  const estimateRevenueImpact = () => {
    if (!scores || !formData.totalRooms || !formData.avgDailyRate) {
      return null;
    }

    const totalScore = calculateTotalImpact();
    const safeRooms = parseInt(formData.totalRooms) || 0;
    const safeADR = parseFloat(formData.avgDailyRate) || 0;
    const safeLOS = parseFloat(formData.avgLengthOfStay) || 2.5;

    // Estimate monthly website visitors (rough approximation)
    const monthlyVisitors = safeRooms * 300;
    
    // Current conversion rate based on score
    const baselineConversion = totalScore / 100 * 0.02;
    
    // Optimal conversion rate (industry benchmark)
    const optimalConversion = 0.035;
    
    // Current and potential bookings
    const currentBookings = Math.floor(monthlyVisitors * baselineConversion);
    const potentialBookings = Math.floor(monthlyVisitors * optimalConversion);
    const lostBookings = potentialBookings - currentBookings;
    
    // Revenue calculations
    const revenuePerBooking = safeADR * safeLOS;
    const monthlyDirectLoss = lostBookings * revenuePerBooking;
    const annualDirectLoss = monthlyDirectLoss * 12;
    
    // OTA impact (assuming 70% of lost direct bookings go to OTAs with 15-20% commission)
    const otaBookings = Math.floor(lostBookings * 0.7);
    const avgOTACommission = 0.175;
    const monthlyOTACost = otaBookings * revenuePerBooking * avgOTACommission;
    const annualOTACost = monthlyOTACost * 12;
    
    // Total potential impact
    const totalAnnualImpact = annualDirectLoss + annualOTACost;

    return {
      totalScore: Math.round(totalScore),
      monthlyVisitors,
      currentConversion: (baselineConversion * 100).toFixed(2),
      optimalConversion: (optimalConversion * 100).toFixed(2),
      currentBookings,
      potentialBookings,
      lostBookings,
      revenuePerBooking,
      monthlyDirectLoss,
      annualDirectLoss,
      otaBookings,
      monthlyOTACost,
      annualOTACost,
      totalAnnualImpact
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-4">
            Hotel Direct Booking Revenue Audit
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Professional Revenue Analysis for Hospitality Leaders
          </p>
        </div>

        {/* Form Section */}
        <FormSection
          formData={formData}
          handleInputChange={handleInputChange}
          analyzeWebsite={analyzeWebsite}
          isAnalyzing={isAnalyzing}
          error={error}
        />

        {/* Results Dashboard */}
        {analysisComplete && (
          <ResultsDashboard
            scores={scores}
            analysisNotes={analysisNotes}
            revenueImpact={estimateRevenueImpact()}
            currencySymbol={currencySymbol}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default HotelAudit;