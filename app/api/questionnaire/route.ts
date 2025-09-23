import nodemailer from 'nodemailer';
import {NextResponse} from 'next/server';

// Define the FormData type
interface FormData {
    businessName: string;
    businessDescription: string;
    websiteGoal: string[];
    websiteGoalOther: string;
    numberOfProducts: number;
    hasProductVariations: boolean;
    wantProductReviews: boolean;
    hasSeasonalProducts: boolean;
    wantCustomerAccounts: boolean;
    wantShoppingCart: boolean;
    wantOnlinePayments: boolean;
    wantContactForm: boolean;
    wantNewsletter: boolean;
    wantDiscountCodes: boolean;
    wantAnalytics: boolean;
    wantDeliveryIntegration: boolean;
    designType: string;
    brandingIdeas: string;
    websiteManager: string;
    wantMultipleAdminAccounts: boolean;
    orderManagement: string;
    orderManagementOther: string;
    wantInventoryTracking: boolean;
    expectedDailyVisitors: number;
    expectCatalogGrowth: boolean;
    expectHighTrafficSales: boolean;
    wantLoyaltyPrograms: boolean;
    wantMultilingualSupport: boolean;
    wantSocialMediaIntegration: boolean;
    otherFeatures: string;
}

export async function POST(request: Request) {
    try {
        const formData: FormData = await request.json();

        // Basic validation
        if (!formData.businessName || !formData.businessDescription) {
            return NextResponse.json(
                {success: false, message: 'Business name and description are required'},
                {status: 400}
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.verify();

        // Create formatted email content
        const emailHtml = generateEmailHTML(formData);
        const emailText = generateEmailText(formData);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to your business email
            subject: `New Website Questionnaire from ${formData.businessName}`,
            text: emailText,
            html: emailHtml,
        });

        return NextResponse.json({
            success: true,
            message: 'Questionnaire submitted successfully!'
        }, {status: 200});

    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json(
            {success: false, message: 'Failed to submit questionnaire. Please try again.'},
            {status: 500}
        );
    }
}

function generateEmailHTML(data: FormData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .section { margin: 20px 0; padding: 15px; border-left: 4px solid #667eea; background: #f9f9f9; }
        .section h3 { margin: 0 0 10px 0; color: #667eea; }
        .field { margin: 10px 0; }
        .field strong { color: #333; }
        .yes { color: #27ae60; font-weight: bold; }
        .no { color: #e74c3c; font-weight: bold; }
        .list-item { margin: 5px 0; padding-left: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Website Development Questionnaire</h1>
        <p>New submission from ${data.businessName}</p>
      </div>

      <div class="section">
        <h3>🏢 Business Information</h3>
        <div class="field"><strong>Business Name:</strong> ${data.businessName}</div>
        <div class="field"><strong>Business Description:</strong> ${data.businessDescription}</div>
        <div class="field">
          <strong>Website Goals:</strong>
          ${data.websiteGoal.length > 0 ?
            data.websiteGoal.map(goal => `<div class="list-item">• ${goal}</div>`).join('') :
            '<div class="list-item">None specified</div>'
        }
          ${data.websiteGoalOther ? `<div class="list-item">• Other: ${data.websiteGoalOther}</div>` : ''}
        </div>
      </div>

      <div class="section">
        <h3>📦 Product Information</h3>
        <div class="field"><strong>Number of Products:</strong> ${data.numberOfProducts}</div>
        <div class="field"><strong>Product Variations:</strong> <span class="${data.hasProductVariations ? 'yes' : 'no'}">${data.hasProductVariations ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Product Reviews:</strong> <span class="${data.wantProductReviews ? 'yes' : 'no'}">${data.wantProductReviews ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Seasonal Products:</strong> <span class="${data.hasSeasonalProducts ? 'yes' : 'no'}">${data.hasSeasonalProducts ? 'Yes' : 'No'}</span></div>
      </div>

      <div class="section">
        <h3>✨ Website Features</h3>
        <div class="field"><strong>Customer Accounts:</strong> <span class="${data.wantCustomerAccounts ? 'yes' : 'no'}">${data.wantCustomerAccounts ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Shopping Cart:</strong> <span class="${data.wantShoppingCart ? 'yes' : 'no'}">${data.wantShoppingCart ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Online Payments:</strong> <span class="${data.wantOnlinePayments ? 'yes' : 'no'}">${data.wantOnlinePayments ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Contact Form:</strong> <span class="${data.wantContactForm ? 'yes' : 'no'}">${data.wantContactForm ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Newsletter:</strong> <span class="${data.wantNewsletter ? 'yes' : 'no'}">${data.wantNewsletter ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Discount Codes:</strong> <span class="${data.wantDiscountCodes ? 'yes' : 'no'}">${data.wantDiscountCodes ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Analytics:</strong> <span class="${data.wantAnalytics ? 'yes' : 'no'}">${data.wantAnalytics ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Delivery Integration:</strong> <span class="${data.wantDeliveryIntegration ? 'yes' : 'no'}">${data.wantDeliveryIntegration ? 'Yes' : 'No'}</span></div>
      </div>

      <div class="section">
        <h3>🎨 Design Preferences</h3>
        <div class="field"><strong>Design Type:</strong> ${data.designType || 'Not specified'}</div>
        <div class="field"><strong>Branding Ideas:</strong> ${data.brandingIdeas || 'None provided'}</div>
      </div>

      <div class="section">
        <h3>⚙️ Business Operations</h3>
        <div class="field"><strong>Website Manager:</strong> ${data.websiteManager || 'Not specified'}</div>
        <div class="field"><strong>Multiple Admin Accounts:</strong> <span class="${data.wantMultipleAdminAccounts ? 'yes' : 'no'}">${data.wantMultipleAdminAccounts ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Order Management:</strong> ${data.orderManagement || 'Not specified'}</div>
        ${data.orderManagementOther ? `<div class="field"><strong>Order Management (Other):</strong> ${data.orderManagementOther}</div>` : ''}
        <div class="field"><strong>Inventory Tracking:</strong> <span class="${data.wantInventoryTracking ? 'yes' : 'no'}">${data.wantInventoryTracking ? 'Yes' : 'No'}</span></div>
      </div>

      <div class="section">
        <h3>📊 Hosting & Traffic</h3>
        <div class="field"><strong>Expected Daily Visitors:</strong> ${data.expectedDailyVisitors}</div>
        <div class="field"><strong>Catalog Growth Expected:</strong> <span class="${data.expectCatalogGrowth ? 'yes' : 'no'}">${data.expectCatalogGrowth ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>High Traffic Sales Expected:</strong> <span class="${data.expectHighTrafficSales ? 'yes' : 'no'}">${data.expectHighTrafficSales ? 'Yes' : 'No'}</span></div>
      </div>

      <div class="section">
        <h3>🚀 Optional Features</h3>
        <div class="field"><strong>Loyalty Programs:</strong> <span class="${data.wantLoyaltyPrograms ? 'yes' : 'no'}">${data.wantLoyaltyPrograms ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Multilingual Support:</strong> <span class="${data.wantMultilingualSupport ? 'yes' : 'no'}">${data.wantMultilingualSupport ? 'Yes' : 'No'}</span></div>
        <div class="field"><strong>Social Media Integration:</strong> <span class="${data.wantSocialMediaIntegration ? 'yes' : 'no'}">${data.wantSocialMediaIntegration ? 'Yes' : 'No'}</span></div>
        ${data.otherFeatures ? `<div class="field"><strong>Other Features:</strong> ${data.otherFeatures}</div>` : ''}
      </div>

      <div style="margin-top: 30px; padding: 20px; background: #f0f0f0; text-align: center; color: #666;">
        <p>This questionnaire was submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
      </div>
    </body>
    </html>
  `;
}

function generateEmailText(data: FormData): string {
    return `
WEBSITE DEVELOPMENT QUESTIONNAIRE
New submission from ${data.businessName}

BUSINESS INFORMATION
Business Name: ${data.businessName}
Business Description: ${data.businessDescription}
Website Goals: ${data.websiteGoal.join(', ')}${data.websiteGoalOther ? `, Other: ${data.websiteGoalOther}` : ''}

PRODUCT INFORMATION
Number of Products: ${data.numberOfProducts}
Product Variations: ${data.hasProductVariations ? 'Yes' : 'No'}
Product Reviews: ${data.wantProductReviews ? 'Yes' : 'No'}
Seasonal Products: ${data.hasSeasonalProducts ? 'Yes' : 'No'}

WEBSITE FEATURES
Customer Accounts: ${data.wantCustomerAccounts ? 'Yes' : 'No'}
Shopping Cart: ${data.wantShoppingCart ? 'Yes' : 'No'}
Online Payments: ${data.wantOnlinePayments ? 'Yes' : 'No'}
Contact Form: ${data.wantContactForm ? 'Yes' : 'No'}
Newsletter: ${data.wantNewsletter ? 'Yes' : 'No'}
Discount Codes: ${data.wantDiscountCodes ? 'Yes' : 'No'}
Analytics: ${data.wantAnalytics ? 'Yes' : 'No'}
Delivery Integration: ${data.wantDeliveryIntegration ? 'Yes' : 'No'}

DESIGN PREFERENCES
Design Type: ${data.designType || 'Not specified'}
Branding Ideas: ${data.brandingIdeas || 'None provided'}

BUSINESS OPERATIONS
Website Manager: ${data.websiteManager || 'Not specified'}
Multiple Admin Accounts: ${data.wantMultipleAdminAccounts ? 'Yes' : 'No'}
Order Management: ${data.orderManagement || 'Not specified'}
${data.orderManagementOther ? `Order Management (Other): ${data.orderManagementOther}` : ''}
Inventory Tracking: ${data.wantInventoryTracking ? 'Yes' : 'No'}

HOSTING & TRAFFIC
Expected Daily Visitors: ${data.expectedDailyVisitors}
Catalog Growth Expected: ${data.expectCatalogGrowth ? 'Yes' : 'No'}
High Traffic Sales Expected: ${data.expectHighTrafficSales ? 'Yes' : 'No'}

OPTIONAL FEATURES
Loyalty Programs: ${data.wantLoyaltyPrograms ? 'Yes' : 'No'}
Multilingual Support: ${data.wantMultilingualSupport ? 'Yes' : 'No'}
Social Media Integration: ${data.wantSocialMediaIntegration ? 'Yes' : 'No'}
${data.otherFeatures ? `Other Features: ${data.otherFeatures}` : ''}

Submitted on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
  `;
}