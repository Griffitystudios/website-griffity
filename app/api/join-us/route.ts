import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  // Fields from the form
  const name = data.get("name") || data.get("fullName");
  const position = data.get("position");
  const email = data.get("email");
  const message = data.get("message") || data.get("coverLetter");
  const contact = data.get("contact");
  const cvFile = data.get("attachment") as File | null; // <-- updated name

  // Optional: log received keys for debugging
  console.log("Received fields:", Array.from(data.keys()));
  console.log("Received file:", cvFile?.name, cvFile?.type, cvFile?.size);

  // Set up the mail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Prepare attachments if file is present
  const attachments = [];

  if (cvFile && cvFile.size > 0) {
    const buffer = Buffer.from(await cvFile.arrayBuffer());

    attachments.push({
      filename: cvFile.name,
      content: buffer,
      contentType: cvFile.type,
    });
  }

  // Determine subject and email body based on presence of contact or file
  const isJoinUs = !!contact || !!cvFile;

  const subject = isJoinUs
    ? `New Application Submission from ${name} for position ${position}`
    : `New Contact Message from ${name}`;

  const text = isJoinUs
    ? `
Full Name: ${name}
Email: ${email}
Contact: ${contact}
Cover Letter / Message:
${message}
    `
    : `
Name: ${name}
Email: ${email}
Message:
${message}
    `;

  // Send email
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
