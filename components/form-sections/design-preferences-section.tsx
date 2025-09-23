"use client";

import type { FormData } from "./form-type/form-type";

interface DesignPreferencesSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function DesignPreferencesSection({
  formData,
  updateFormData,
}: DesignPreferencesSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="designType"
          className="block text-sm font-medium text-slate-200"
        >
          Do you want a template design or custom design?
        </label>
        <select
          id="designType"
          value={formData.designType}
          onChange={(e) => updateFormData({ designType: e.target.value })}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        >
          <option value="">Select design type</option>
          <option value="template">Template design</option>
          <option value="custom">Custom design</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="brandingIdeas"
          className="block text-sm font-medium text-slate-200"
        >
          Preferred colors, styles, or branding ideas
        </label>
        <textarea
          id="brandingIdeas"
          value={formData.brandingIdeas}
          onChange={(e) => updateFormData({ brandingIdeas: e.target.value })}
          placeholder="Describe your preferred colors, styles, or any branding ideas you have"
          rows={3}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
        />
      </div>
    </div>
  );
}
