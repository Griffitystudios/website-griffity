"use client";

import type { FormData } from "./form-type/form-type";

interface OptionalFeaturesSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function OptionalFeaturesSection({
  formData,
  updateFormData,
}: OptionalFeaturesSectionProps) {
  const features = [
    {
      key: "wantLoyaltyPrograms",
      label: "Do you want loyalty or reward programs for customers?",
    },
    {
      key: "wantMultilingualSupport",
      label:
        "Do you need multilingual support (e.g., English + local language)?",
    },
    {
      key: "wantSocialMediaIntegration",
      label:
        "Do you want social media integration (Facebook, Instagram shop, etc.)?",
    },
  ];

  return (
    <div className="space-y-6">
      {/* <CHANGE> Replaced RadioGroup components with native radio inputs */}
      {features.map((feature) => (
        <div key={feature.key} className="space-y-3">
          <label className="block text-sm font-medium text-slate-200">
            {feature.label}
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id={`${feature.key}-yes`}
                name={feature.key}
                value="true"
                checked={formData[feature.key as keyof FormData] === true}
                onChange={(e) =>
                  updateFormData({ [feature.key]: e.target.value === "true" })
                }
                className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
              />
              <label
                htmlFor={`${feature.key}-yes`}
                className="text-sm text-slate-300 cursor-pointer"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id={`${feature.key}-no`}
                name={feature.key}
                value="false"
                checked={formData[feature.key as keyof FormData] === false}
                onChange={(e) =>
                  updateFormData({ [feature.key]: e.target.value === "true" })
                }
                className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
              />
              <label
                htmlFor={`${feature.key}-no`}
                className="text-sm text-slate-300 cursor-pointer"
              >
                No
              </label>
            </div>
          </div>
        </div>
      ))}

      {/* <CHANGE> Replaced Textarea with native textarea */}
      <div className="space-y-2">
        <label
          htmlFor="otherFeatures"
          className="block text-sm font-medium text-slate-200"
        >
          Any other features or ideas
        </label>
        <textarea
          id="otherFeatures"
          value={formData.otherFeatures}
          onChange={(e) => updateFormData({ otherFeatures: e.target.value })}
          placeholder="Describe any other features or ideas you have in mind"
          rows={4}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
        />
      </div>
    </div>
  );
}
