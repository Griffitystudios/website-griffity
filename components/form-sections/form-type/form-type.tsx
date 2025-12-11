export interface FormData {
  // Business Information
  businessName: string;
  businessDescription: string;
  contact: string;
  websiteGoal: string[];
  websiteGoalOther: string;

  // Product Information
  numberOfProducts: number;
  hasProductVariations: boolean;
  wantProductReviews: boolean;
  hasSeasonalProducts: boolean;

  // Website Features
  wantCustomerAccounts: boolean;
  wantShoppingCart: boolean;
  wantOnlinePayments: boolean;
  wantContactForm: boolean;
  wantNewsletter: boolean;
  wantDiscountCodes: boolean;
  wantAnalytics: boolean;
  wantDeliveryIntegration: boolean;

  // Design Preferences
  designType: string;
  brandingIdeas: string;

  // Business Operations
  websiteManager: string;
  wantMultipleAdminAccounts: boolean;
  orderManagement: string;
  orderManagementOther: string;
  wantInventoryTracking: boolean;

  // Hosting / Traffic Expectations
  expectedDailyVisitors: number;
  expectCatalogGrowth: boolean;
  expectHighTrafficSales: boolean;

  // Optional Features
  wantLoyaltyPrograms: boolean;
  wantMultilingualSupport: boolean;
  wantSocialMediaIntegration: boolean;
  otherFeatures: string;
}
