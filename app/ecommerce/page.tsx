"use client";

import { useState } from "react";
import { BusinessInfoSection } from "@/components/form-sections/business-info-section";
import { ProductInfoSection } from "@/components/form-sections/product-info-section";
import { WebsiteFeaturesSection } from "@/components/form-sections/website-features-section";
import { DesignPreferencesSection } from "@/components/form-sections/design-preferences-section";
import { BusinessOperationsSection } from "@/components/form-sections/business-operations-section";
import { HostingTrafficSection } from "@/components/form-sections/hosting-traffic-section";
import { OptionalFeaturesSection } from "@/components/form-sections/optional-features-section";
import type { FormData } from "@/components/form-sections/form-type/form-type";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <-- Add this import
import { motion } from "framer-motion";

const sections = [
  {
    id: 1,
    title: "Business Information",
    description: "Tell us about your business",
  },
  {
    id: 2,
    title: "Product Information",
    description: "Details about your products",
  },
  {
    id: 3,
    title: "Website Features",
    description: "What features do you need?",
  },
  {
    id: 4,
    title: "Design Preferences",
    description: "How should your site look?",
  },
  {
    id: 5,
    title: "Business Operations",
    description: "How will you manage your site?",
  },
  {
    id: 6,
    title: "Hosting & Traffic",
    description: "Expected usage and growth",
  },
  {
    id: 7,
    title: "Optional Features",
    description: "Additional features for the future",
  },
];

export default function QuestionnairePage() {
  const navItems = [
    "about us",
    "services",
    "clients",
    "careers",
    "blogs",
    "contact us",
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessDescription: "",
    contact: '',
    websiteGoal: [],
    websiteGoalOther: "",
    numberOfProducts: 0,
    hasProductVariations: false,
    wantProductReviews: false,
    hasSeasonalProducts: false,
    wantCustomerAccounts: false,
    wantShoppingCart: false,
    wantOnlinePayments: false,
    wantContactForm: false,
    wantNewsletter: false,
    wantDiscountCodes: false,
    wantAnalytics: false,
    wantDeliveryIntegration: false,
    designType: "",
    brandingIdeas: "",
    websiteManager: "",
    wantMultipleAdminAccounts: false,
    orderManagement: "",
    orderManagementOther: "",
    wantInventoryTracking: false,
    expectedDailyVisitors: 0,
    expectCatalogGrowth: false,
    expectHighTrafficSales: false,
    wantLoyaltyPrograms: false,
    wantMultilingualSupport: false,
    wantSocialMediaIntegration: false,
    otherFeatures: "",
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentSection < sections.length) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.businessName.trim() || !formData.businessDescription.trim()) {
      setSubmitStatus({
        type: "error",
        message:
          "Please fill in at least the business name and description before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! Your questionnaire has been submitted successfully. We'll get back to you soon!",
        });

        setTimeout(() => {
          router.push("/");
        }, 3000);

        // Optional: Reset form after successful submission
        setTimeout(() => {
          setCurrentSection(1);
          setFormData({
            businessName: "",
            businessDescription: "",
            contact: "",
            websiteGoal: [],
            websiteGoalOther: "",
            numberOfProducts: 0,
            hasProductVariations: false,
            wantProductReviews: false,
            hasSeasonalProducts: false,
            wantCustomerAccounts: false,
            wantShoppingCart: false,
            wantOnlinePayments: false,
            wantContactForm: false,
            wantNewsletter: false,
            wantDiscountCodes: false,
            wantAnalytics: false,
            wantDeliveryIntegration: false,
            designType: "",
            brandingIdeas: "",
            websiteManager: "",
            wantMultipleAdminAccounts: false,
            orderManagement: "",
            orderManagementOther: "",
            wantInventoryTracking: false,
            expectedDailyVisitors: 0,
            expectCatalogGrowth: false,
            expectHighTrafficSales: false,
            wantLoyaltyPrograms: false,
            wantMultilingualSupport: false,
            wantSocialMediaIntegration: false,
            otherFeatures: "",
          });
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        throw new Error(result.message || "Failed to submit questionnaire");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit questionnaire. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <BusinessInfoSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <ProductInfoSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <WebsiteFeaturesSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <DesignPreferencesSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <BusinessOperationsSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 6:
        return (
          <HostingTrafficSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 7:
        return (
          <OptionalFeaturesSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  const progress = (currentSection / sections.length) * 100;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-body via-body-900 to-body relative overflow-hidden">
        <div className="flex justify-between items-center w-full z-50 ">
          <Link href={"/"}>
            <motion.img
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              src="/logos/griffity.png"
              alt="Griffity Studios logo"
              className="w-6 sm:w-7 md:w-8 h-auto z-30 ml-5"
            />
          </Link>
          {/* Desktop Navigation Items - Hidden on mobile/tablet */}
          <nav className="hidden xl:flex  flex-row gap-8 z-50 mr-10">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={
                  ["blogs", "careers"].includes(item.toLowerCase())
                    ? `/${item.toLowerCase()}`
                    : `/#${item.replace(/\s+/g, "-").toLowerCase()}`
                }
                className={`transition-all duration-300 ease-out transform cursor-pointer md:p-base ml-12 hover:text-[#dba039]  
                `}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Burger Menu Button - Only visible on mobile/tablet */}
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onClick={toggleMobileMenu}
            className="xl:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 0 : -6,
              }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
            <motion.span
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? 0 : 6,
              }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
          </motion.button>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 p-4 md:p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Build Your Perfect{" "}
                <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                  Website
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Help us understand your business needs to create a tailored
                website solution that drives results
              </p>
            </div>
            {/* Status Messages */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-xl border ${
                  submitStatus.type === "success"
                    ? "bg-green-900/50 border-green-500/50 text-green-200"
                    : "bg-red-900/50 border-red-500/50 text-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {submitStatus.type === "success" ? "✅" : "❌"}
                  </span>
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
                {submitStatus.type === "success" && (
                  <div className="mt-4 flex justify-end">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
                    >
                      <span>🏠</span> Go Home
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-pink-500 text-white text-sm font-bold shadow-lg">
                    {currentSection}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white">
                      Step {currentSection} of {sections.length}
                    </span>
                    <p className="text-xs text-slate-400">
                      {sections[currentSection - 1].title}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-slate-700/50 rounded-full h-3 backdrop-blur-sm">
                  <div
                    className="bg-gradient-to-r from-primary to-pink-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg shadow-primary/30"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-pink-500/50 rounded-2xl blur-sm"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-pink-500 text-white font-bold shadow-lg">
                      {currentSection}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {sections[currentSection - 1].title}
                      </h2>
                      <p className="text-slate-400 text-base mt-1">
                        {sections[currentSection - 1].description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">{renderCurrentSection()}</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentSection === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-600 bg-slate-800/50 text-white hover:border-primary/50 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm"
              >
                <span className="text-sm">←</span>
                Previous
              </button>
              {currentSection === sections.length ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    <>Submit Questionnaire</>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  Next Step
                  <span className="text-sm">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
