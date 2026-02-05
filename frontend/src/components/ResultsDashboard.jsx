import React from 'react';
import { KPIDashboard } from './KPIDashboard';
import { EnhancedCharts } from './EnhancedCharts';
import { ConversionBlockers } from './ConversionBlockers';
import { PerformanceTable } from './PerformanceTable';
import { CheckCircle } from 'lucide-react';

export const ResultsDashboard = ({ scores, analysisNotes, revenueImpact, currencySymbol, formData }) => {
  if (!revenueImpact) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Success Message */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6 shadow-lg" data-testid="success-message">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
          <div>
            <h3 className="text-xl font-bold text-emerald-900">Analysis Complete!</h3>
            <p className="text-emerald-700">Your comprehensive revenue audit is ready</p>
          </div>
        </div>
      </div>

      {/* KPI Dashboard */}
      <KPIDashboard revenueImpact={revenueImpact} currencySymbol={currencySymbol} />

      {/* Charts Section */}
      <EnhancedCharts scores={scores} revenueImpact={revenueImpact} currencySymbol={currencySymbol} />

      {/* Conversion Blockers */}
      <ConversionBlockers scores={scores} analysisNotes={analysisNotes} revenueImpact={revenueImpact} currencySymbol={currencySymbol} />

      {/* Performance Table */}
      <PerformanceTable revenueImpact={revenueImpact} />
    </div>
  );
};