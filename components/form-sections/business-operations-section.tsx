"use client";

import type { FormData } from "./form-type/form-type";

interface BusinessOperationsSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function BusinessOperationsSection({
  formData,
  updateFormData,
}: BusinessOperationsSectionProps) {
  return (
    <div className="space-y-6">
      {/* <div className="space-y-2">
        <label
          htmlFor="websiteManager"
          className="block text-sm font-medium text-slate-200"
        >
          Who will manage the website?
        </label>
        <input
          id="websiteManager"
          type="text"
          value={formData.websiteManager}
          onChange={(e) => updateFormData({ websiteManager: e.target.value })}
          placeholder="Enter who will manage the website"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        />
      </div> */}

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Do you want multiple staff/admin accounts?
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="admin-accounts-yes"
              name="wantMultipleAdminAccounts"
              value="true"
              checked={formData.wantMultipleAdminAccounts === true}
              onChange={(e) =>
                updateFormData({
                  wantMultipleAdminAccounts: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="admin-accounts-yes"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="admin-accounts-no"
              name="wantMultipleAdminAccounts"
              value="false"
              checked={formData.wantMultipleAdminAccounts === false}
              onChange={(e) =>
                updateFormData({
                  wantMultipleAdminAccounts: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="admin-accounts-no"
              className="text-sm text-slate-300 cursor-pointer"
            >
              No
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="orderManagement"
          className="block text-sm font-medium text-slate-200"
        >
          How will you manage orders?
        </label>
        <select
          id="orderManagement"
          value={formData.orderManagement}
          onChange={(e) => updateFormData({ orderManagement: e.target.value })}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        >
          <option value="">Select order management method</option>
          <option value="excel">Excel / CSV</option>
          <option value="admin-panel">Through the website admin panel</option>
          <option value="other">Other</option>
        </select>
        {formData.orderManagement === "other" && (
          <input
            type="text"
            value={formData.orderManagementOther}
            onChange={(e) =>
              updateFormData({ orderManagementOther: e.target.value })
            }
            placeholder="Specify other order management method"
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm mt-2"
          />
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Do you want to track inventory automatically?
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="inventory-yes"
              name="wantInventoryTracking"
              value="true"
              checked={formData.wantInventoryTracking === true}
              onChange={(e) =>
                updateFormData({
                  wantInventoryTracking: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="inventory-yes"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="inventory-no"
              name="wantInventoryTracking"
              value="false"
              checked={formData.wantInventoryTracking === false}
              onChange={(e) =>
                updateFormData({
                  wantInventoryTracking: e.target.value === "true",
                })
              }
              className="w-5 h-5 text-purple-500 bg-slate-700/50 border-2 border-slate-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
            />
            <label
              htmlFor="inventory-no"
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
