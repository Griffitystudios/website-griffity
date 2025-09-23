"use client";

import type { FormData } from "./form-type/form-type";

interface HostingTrafficSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function HostingTrafficSection({
  formData,
  updateFormData,
}: HostingTrafficSectionProps) {
  return (
    <div className="space-y-6">
      {/* <CHANGE> Replaced Input and Label with native HTML elements */}
      <div className="space-y-2">
        <label
          htmlFor="expectedDailyVisitors"
          className="block text-sm font-medium text-slate-200"
        >
          Approximate daily visitors expected
        </label>
        <input
          id="expectedDailyVisitors"
          type="number"
          min="0"
          value={formData.expectedDailyVisitors || ""}
          onChange={(e) =>
            updateFormData({
              expectedDailyVisitors: Number.parseInt(e.target.value) || 0,
            })
          }
          placeholder="Enter expected daily visitors"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      {/* <CHANGE> Replaced RadioGroup with native radio inputs */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Do you expect your product catalog to grow significantly?
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="catalog-growth-yes"
              name="expectCatalogGrowth"
              value="true"
              checked={formData.expectCatalogGrowth === true}
              onChange={(e) =>
                updateFormData({
                  expectCatalogGrowth: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="catalog-growth-yes"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="catalog-growth-no"
              name="expectCatalogGrowth"
              value="false"
              checked={formData.expectCatalogGrowth === false}
              onChange={(e) =>
                updateFormData({
                  expectCatalogGrowth: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="catalog-growth-no"
              className="text-sm text-slate-300 cursor-pointer"
            >
              No
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Do you expect high traffic during sales or promotions?
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="high-traffic-yes"
              name="expectHighTrafficSales"
              value="true"
              checked={formData.expectHighTrafficSales === true}
              onChange={(e) =>
                updateFormData({
                  expectHighTrafficSales: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="high-traffic-yes"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="high-traffic-no"
              name="expectHighTrafficSales"
              value="false"
              checked={formData.expectHighTrafficSales === false}
              onChange={(e) =>
                updateFormData({
                  expectHighTrafficSales: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="high-traffic-no"
              className="text-sm text-slate-300 cursor-pointer"
            >
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
