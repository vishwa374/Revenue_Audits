import React from 'react';
import { Calculator, Loader2 } from 'lucide-react';

export const FormSection = ({ formData, handleInputChange, analyzeWebsite, isAnalyzing, error }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Your Email Address *
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@hotel.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            data-testid="email-input"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Hotel Website URL *
          </label>
          <input
            type="url"
            name="websiteUrl"
            placeholder="https://yourhotel.com"
            value={formData.websiteUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            data-testid="website-input"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Total Rooms *
          </label>
          <input
            type="number"
            name="totalRooms"
            placeholder="50"
            value={formData.totalRooms}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            data-testid="rooms-input"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Average Daily Rate (USD) *
          </label>
          <input
            type="number"
            name="avgDailyRate"
            placeholder="150"
            value={formData.avgDailyRate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            data-testid="adr-input"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Average Length of Stay (nights)
          </label>
          <input
            type="number"
            name="avgLengthOfStay"
            placeholder="2.5"
            step="0.5"
            value={formData.avgLengthOfStay}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            data-testid="los-input"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" data-testid="error-message">
          {error}
        </div>
      )}

      <button
        onClick={analyzeWebsite}
        disabled={isAnalyzing}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="analyze-button"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Your Property...
          </>
        ) : (
          <>
            <Calculator className="w-5 h-5" />
            Run Revenue Analysis
          </>
        )}
      </button>
    </div>
  );
};