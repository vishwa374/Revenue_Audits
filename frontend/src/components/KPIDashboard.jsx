import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Percent, Target } from 'lucide-react';

export const KPIDashboard = ({ revenueImpact, currencySymbol }) => {
  const kpis = [
    {
      label: 'Overall Performance Score',
      value: `${revenueImpact.totalScore}/100`,
      icon: Target,
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Annual Revenue at Risk',
      value: `${currencySymbol}${revenueImpact.totalAnnualImpact.toLocaleString()}`,
      icon: TrendingDown,
      gradient: 'from-red-500 to-red-700',
      bgGradient: 'from-red-50 to-red-100',
      textColor: 'text-red-900',
      iconColor: 'text-red-600'
    },
    {
      label: 'Lost Monthly Bookings',
      value: revenueImpact.lostBookings.toLocaleString(),
      icon: Users,
      gradient: 'from-amber-500 to-amber-700',
      bgGradient: 'from-amber-50 to-amber-100',
      textColor: 'text-amber-900',
      iconColor: 'text-amber-600'
    },
    {
      label: 'Current Conversion Rate',
      value: `${revenueImpact.currentConversion}%`,
      icon: Percent,
      gradient: 'from-purple-500 to-purple-700',
      bgGradient: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-900',
      iconColor: 'text-purple-600'
    },
    {
      label: 'Potential Conversion Rate',
      value: `${revenueImpact.optimalConversion}%`,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-emerald-700',
      bgGradient: 'from-emerald-50 to-emerald-100',
      textColor: 'text-emerald-900',
      iconColor: 'text-emerald-600'
    },
    {
      label: 'Annual OTA Commission Loss',
      value: `${currencySymbol}${revenueImpact.annualOTACost.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-orange-500 to-orange-700',
      bgGradient: 'from-orange-50 to-orange-100',
      textColor: 'text-orange-900',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6" data-testid="kpi-title">Executive KPI Snapshot</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${kpi.bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 transform hover:-translate-y-1`}
              data-testid={`kpi-card-${index}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white shadow-md`}>
                  <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-2">{kpi.label}</p>
              <p className={`text-3xl font-bold ${kpi.textColor}`}>{kpi.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};