"use client";

import type { FormData } from "./form-type/form-type";

interface ProductInfoSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function ProductInfoSection({
  formData,
  updateFormData,
}: ProductInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="numberOfProducts"
          className="block text-sm font-medium text-slate-200"
        >
          Number of products to list initially
        </label>
        <input
          id="numberOfProducts"
          type="number"
          min="0"
          value={formData.numberOfProducts || ""}
          onChange={(e) =>
            updateFormData({
              numberOfProducts: Number.parseInt(e.target.value) || 0,
            })
          }
          placeholder="Enter number of products"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Do your products have variations (size, color, etc.)?
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="variations-yes"
              name="hasProductVariations"
              value="true"
              checked={formData.hasProductVariations === true}
              onChange={(e) =>
                updateFormData({
                  hasProductVariations: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="variations-yes"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="variations-no"
              name="hasProductVariations"
              value="false"
              checked={formData.hasProductVariations === false}
              onChange={(e) =>
                updateFormData({
                  hasProductVariations: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="variations-no"
              className="text-sm text-slate-300 cursor-pointer"
            >
              No
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Do you want product reviews/ratings?
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="reviews-yes"
              name="wantProductReviews"
              value="true"
              checked={formData.wantProductReviews === true}
              onChange={(e) =>
                updateFormData({
                  wantProductReviews: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="reviews-yes"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="reviews-no"
              name="wantProductReviews"
              value="false"
              checked={formData.wantProductReviews === false}
              onChange={(e) =>
                updateFormData({
                  wantProductReviews: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="reviews-no"
              className="text-sm text-slate-300 cursor-pointer"
            >
              No
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Will you have seasonal or promotional products?
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="seasonal-yes"
              name="hasSeasonalProducts"
              value="true"
              checked={formData.hasSeasonalProducts === true}
              onChange={(e) =>
                updateFormData({
                  hasSeasonalProducts: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="seasonal-yes"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="seasonal-no"
              name="hasSeasonalProducts"
              value="false"
              checked={formData.hasSeasonalProducts === false}
              onChange={(e) =>
                updateFormData({
                  hasSeasonalProducts: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="seasonal-no"
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
