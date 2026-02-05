import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';

export const EnhancedCharts = ({ scores, revenueImpact, currencySymbol }) => {
  // Luxury hospitality color palette
  const COLORS = {
    primary: '#1e40af',
    secondary: '#3b82f6',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    gold: '#f59e0b',
    emerald: '#10b981',
    navy: '#1e3a8a'
  };

  // Booking Distribution Data (Pie Chart)
  const distributionData = [
    { name: 'Direct Bookings', value: revenueImpact.currentBookings, color: COLORS.success },
    { name: 'OTA Bookings', value: revenueImpact.otaBookings, color: COLORS.danger }
  ];

  // Revenue Opportunity Data (Bar Chart)
  const opportunityData = [
    {
      category: 'Current',
      bookings: revenueImpact.currentBookings,
      fill: COLORS.danger
    },
    {
      category: 'Potential',
      bookings: revenueImpact.potentialBookings,
      fill: COLORS.success
    }
  ];

  // Conversion Blockers Impact (Horizontal Bar)
  const blockersData = Object.keys(scores)
    .map(key => ({
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      score: scores[key],
      impact: 100 - scores[key]
    }))
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 5);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label, prefix = '', suffix = '' }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-slate-200">
          <p className="font-semibold text-slate-800 mb-1">{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{prefix}{entry.value.toLocaleString()}{suffix}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom Label for bars
  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y + height / 2}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold text-sm"
        >
          {value.toLocaleString()}
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-8">
      {/* Revenue Waterfall Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2" data-testid="charts-title">Revenue Waterfall Analysis</h2>
        <p className="text-slate-600">Visual breakdown of booking performance and revenue opportunities</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Distribution - Pie Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200" data-testid="distribution-chart">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Current Booking Channel Mix</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip suffix=" bookings" />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-slate-600 mt-4 text-center">
            Direct bookings: <span className="font-bold text-emerald-600">{revenueImpact.currentBookings}</span> • 
            OTA bookings: <span className="font-bold text-red-600"> {revenueImpact.otaBookings}</span>
          </p>
        </div>

        {/* Revenue Opportunity - Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200" data-testid="opportunity-chart">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Monthly Booking Opportunity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={opportunityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="potentialGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="category" 
                tick={{ fill: '#475569', fontWeight: 600 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                tick={{ fill: '#475569' }}
                axisLine={{ stroke: '#cbd5e1' }}
                label={{ value: 'Bookings', angle: -90, position: 'insideLeft', fill: '#475569' }}
              />
              <Tooltip content={<CustomTooltip suffix=" bookings" />} />
              <Bar 
                dataKey="bookings" 
                radius={[10, 10, 0, 0]}
                fill="url(#currentGradient)"
              >
                {opportunityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.category === 'Current' ? 'url(#currentGradient)' : 'url(#potentialGradient)'} 
                  />
                ))}
                <LabelList dataKey="bookings" position="top" fill="#1e293b" fontWeight="bold" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-slate-600 mt-4 text-center">
            Potential gain: <span className="font-bold text-emerald-600">+{revenueImpact.lostBookings} bookings/month</span>
          </p>
        </div>

        {/* Top 5 Conversion Blockers - Horizontal Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 lg:col-span-2" data-testid="blockers-chart">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Top 5 Conversion Blockers by Impact</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={blockersData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <defs>
                <linearGradient id="blockerGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number" 
                tick={{ fill: '#475569' }}
                label={{ value: 'Impact Score (Lower = More Critical)', position: 'insideBottom', offset: -5, fill: '#475569' }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                width={115}
              />
              <Tooltip content={<CustomTooltip suffix="/100" />} />
              <Bar 
                dataKey="score" 
                fill="url(#blockerGradient)" 
                radius={[0, 10, 10, 0]}
              >
                <LabelList dataKey="score" position="right" fill="#1e293b" fontWeight="bold" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-slate-600 mt-4 text-center">
            Lower scores indicate higher priority issues requiring immediate attention
          </p>
        </div>
      </div>
    </div>
  );
};
