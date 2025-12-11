"use client";

import type { FormData } from "./form-type/form-type";

interface BusinessInfoSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function BusinessInfoSection({
  formData,
  updateFormData,
}: BusinessInfoSectionProps) {
  const handleGoalChange = (goal: string, checked: boolean) => {
    const updatedGoals = checked
      ? [...formData.websiteGoal, goal]
      : formData.websiteGoal.filter((g) => g !== goal);
    updateFormData({ websiteGoal: updatedGoals });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="businessName"
          className="block text-sm font-medium text-slate-200"
        >
          Business Name <span className="text-red-500"> * required</span>
        </label>
        <input
          id="businessName"
          type="text"
          value={formData.businessName}
          onChange={(e) => updateFormData({ businessName: e.target.value })}
          placeholder="Enter your business name"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="businessContact"
          className="block text-sm font-medium text-slate-200"
        >
          Business Contact <span className="text-red-500"> * required</span>
        </label>
        <input
          id="businessContact"
          type="text"
          value={formData.contact}
          onChange={(e) => updateFormData({ contact: e.target.value })}
          placeholder="Enter your business contact"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="businessDescription"
          className="block text-sm font-medium text-slate-200"
        >
          Business Description<span className="text-red-500"> * required</span>
        </label>
        <textarea
          id="businessDescription"
          value={formData.businessDescription}
          onChange={(e) =>
            updateFormData({ businessDescription: e.target.value })
          }
          placeholder="Describe what your business does"
          rows={3}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Website Goal (select all that apply)
        </label>
        <div className="space-y-3">
          {[
            "Showcase products only",
            "Sell products online",
            "Collect customer information",
          ].map((goal) => (
            <div key={goal} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={goal}
                checked={formData.websiteGoal.includes(goal)}
                onChange={(e) => handleGoalChange(goal, e.target.checked)}
                className="w-5 h-5 bg-slate-700/50 border-2 border-slate-600 rounded-md text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
              />
              <label
                htmlFor={goal}
                className="text-sm text-slate-300 cursor-pointer"
              >
                {goal}
              </label>
            </div>
          ))}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="other-goal"
              checked={formData.websiteGoal.includes("Other")}
              onChange={(e) => handleGoalChange("Other", e.target.checked)}
              className="w-5 h-5 bg-slate-700/50 border-2 border-slate-600 rounded-md text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="other-goal"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Other:
            </label>
            <input
              type="text"
              value={formData.websiteGoalOther}
              onChange={(e) =>
                updateFormData({ websiteGoalOther: e.target.value })
              }
              placeholder="Specify other goal"
              disabled={!formData.websiteGoal.includes("Other")}
              className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
