"use client";

import type { FormData } from "./form-type/form-type";

interface WebsiteFeaturesSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function WebsiteFeaturesSection({
  formData,
  updateFormData,
}: WebsiteFeaturesSectionProps) {
  const features = [
    {
      key: "wantCustomerAccounts",
      label: "Do you want customers to create accounts?",
    },
    {
      key: "wantShoppingCart",
      label: "Do you want a shopping cart and online checkout?",
    },
    {
      key: "wantOnlinePayments",
      label: "Do you want to accept online payments?",
    },
    {
      key: "wantContactForm",
      label: "Do you want a contact form for inquiries?",
    },
    {
      key: "wantNewsletter",
      label: "Do you want newsletter or email promotions?",
    },
    {
      key: "wantDiscountCodes",
      label: "Do you want discount codes or special offers?",
    },
    {
      key: "wantAnalytics",
      label: "Do you want analytics to track sales and customer behavior?",
    },
    {
      key: "wantDeliveryIntegration",
      label: "Do you want integration with delivery/logistics services?",
    },
  ];

  return (
    <div className="space-y-6">
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
    </div>
  );
}
