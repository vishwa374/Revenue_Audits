import React from 'react';

export const PerformanceTable = ({ revenueImpact }) => {
  const comparisonData = [
    {
      metric: 'Website Traffic (Monthly)',
      current: revenueImpact.monthlyVisitors.toLocaleString(),
      target: revenueImpact.monthlyVisitors.toLocaleString(),
      status: 'neutral'
    },
    {
      metric: 'Conversion Rate',
      current: `${revenueImpact.currentConversion}%`,
      target: `${revenueImpact.optimalConversion}%`,
      status: 'warning'
    },
    {
      metric: 'Monthly Direct Bookings',
      current: revenueImpact.currentBookings.toLocaleString(),
      target: revenueImpact.potentialBookings.toLocaleString(),
      status: 'warning'
    },
    {
      metric: 'Booking Gap',
      current: `${revenueImpact.lostBookings.toLocaleString()} lost`,
      target: '0 lost',
      status: 'danger'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'danger': return 'text-red-600 font-bold';
      case 'warning': return 'text-amber-600 font-semibold';
      case 'neutral': return 'text-slate-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2" data-testid="table-title">Performance Comparison</h2>
        <p className="text-slate-600">Current performance vs. industry benchmarks</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="performance-table">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Performance Metric</th>
                <th className="px-6 py-4 text-center font-bold text-sm uppercase tracking-wider">Current</th>
                <th className="px-6 py-4 text-center font-bold text-sm uppercase tracking-wider">Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {comparisonData.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{row.metric}</td>
                  <td className={`px-6 py-4 text-center ${getStatusColor(row.status)}`}>{row.current}</td>
                  <td className="px-6 py-4 text-center text-emerald-600 font-semibold">{row.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};