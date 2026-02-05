import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export const ConversionBlockers = ({ scores, analysisNotes, revenueImpact, currencySymbol }) => {
  // Calculate priority actions based on scores
  const priorityActions = Object.keys(scores)
    .map(key => {
      const lostImpact = ((100 - scores[key]) / 100) * (revenueImpact.totalAnnualImpact / 8);
      return {
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        score: scores[key],
        impact: lostImpact,
        note: analysisNotes[key]
      };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);

  const getSeverityColor = (score) => {
    if (score < 50) return 'border-red-300 bg-red-50';
    if (score < 70) return 'border-amber-300 bg-amber-50';
    return 'border-emerald-300 bg-emerald-50';
  };

  const getSeverityBadge = (score) => {
    if (score < 50) return { color: 'bg-red-500', text: 'Critical', textColor: 'text-red-700' };
    if (score < 70) return { color: 'bg-amber-500', text: 'High Priority', textColor: 'text-amber-700' };
    return { color: 'bg-emerald-500', text: 'Good', textColor: 'text-emerald-700' };
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2" data-testid="blockers-title">Critical Conversion Blockers</h2>
        <p className="text-slate-600">Prioritized issues impacting your direct booking revenue</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {priorityActions.map((action, index) => {
          const badge = getSeverityBadge(action.score);
          return (
            <div
              key={index}
              className={`border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${getSeverityColor(action.score)}`}
              data-testid={`blocker-card-${index}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${badge.color} shadow-md`}>
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{action.name}</h3>
                    <span className={`text-sm font-semibold ${badge.textColor}`}>{badge.text}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800">{action.score}<span className="text-sm text-slate-600">/100</span></p>
                </div>
              </div>

              <p className="text-slate-700 mb-4 leading-relaxed">{action.note}</p>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-300">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Estimated Annual Impact: <span className="text-red-600">{currencySymbol}{Math.round(action.impact).toLocaleString()}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};