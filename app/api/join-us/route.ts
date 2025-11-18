import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  // ----- 🔐 1. reCAPTCHA Validation -----
  const recaptchaToken = data.get("recaptcha") as string | null;

  if (!recaptchaToken) {
    return NextResponse.json(
      { success: false, error: "Missing reCAPTCHA token" },
      { status: 400 }
    );
  }

  const secret = process.env.RECAPTCHA_SECRET;

  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
    { method: "POST" }
  );

  const recaptchaResult = await verifyRes.json();

  if (!recaptchaResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed reCAPTCHA validation",
        details: recaptchaResult["error-codes"] || [],
      },
      { status: 400 }
    );
  }

  // ----- 📥 2. Normal Form Fields -----
  const name = data.get("name") || data.get("fullName");
  const position = data.get("position");
  const email = data.get("email");
  const message = data.get("message") || data.get("coverLetter");
  const contact = data.get("contact");
  const cvFile = data.get("attachment") as File | null;

  // Require attachment
  if (!cvFile || cvFile.size === 0) {
    return NextResponse.json(
      { success: false, error: "Attachment (CV) is required" },
      { status: 400 }
    );
  }

  console.log("Received fields:", Array.from(data.keys()));
  console.log("Received file:", cvFile?.name, cvFile?.type, cvFile?.size);

  // ----- 📧 3. Mail Transporter -----
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const buffer = Buffer.from(await cvFile.arrayBuffer());

  const attachments = [
    {
      filename: cvFile.name,
      content: buffer,
      contentType: cvFile.type,
    },
  ];

  // Email subject/body
  const subject = `New Application Submission from ${name} for position ${position}`;
  const text = `
Full Name: ${name}
Email: ${email}
Contact: ${contact}

Cover Letter / Message:
${message}
`;

  // ----- ✉️ 4. Send Email -----
  try {
    await transporter.sendMail({
      from: `"HeyJob Form" <${process.env.SENDER_MAIL}>`,
      to: process.env.CONTACT_RECEIVER,
      subject,
      text,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
