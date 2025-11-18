import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
 const recaptcha = data.get("recaptcha") as string | null;
 
   
  const secret = process.env.RECAPTCHA_SECRET;

  if (!recaptcha) {
    return new Response(
      JSON.stringify({ error: "Missing reCAPTCHA token" }),
      { status: 400 }
    );
  }
  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptcha}`,
    { method: "POST" }
  );

  const result: {
    success: boolean;
    score?: number;
    "error-codes"?: string[];
  } = await verifyRes.json();

  if (!result.success) {
    return new Response(
      JSON.stringify({ error: "reCAPTCHA failed", details: result }),
      { status: 400 }
    );
  }

    // Match frontend field names
    const name = data.get("name") || data.get("fullName");
    const email = data.get("email");
    const contact = data.get("contact");
    const message = data.get("message") || data.get("coverLetter");
    const attachment = data.get("attachment") as File | null;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare attachment if exists
    const attachments = [];
    if (attachment && attachment.size > 0) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      attachments.push({
        filename: attachment.name,
        content: buffer,
        contentType: attachment.type,
      });
    }

    // Email content
    const subject = contact
      ? `New Contact Message from ${name}`
      : `New Message from ${name}`;

    const text = `
Full Name: ${name}
Email: ${email}
${contact ? `Contact: ${contact}` : ""}
Message:
${message}
    `;

    const html = `
      <p><strong>Full Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${contact ? `<p><strong>Contact:</strong> ${contact}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await transporter.sendMail({
      from: `"HeyJob Contact" <${process.env.SENDER_MAIL}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SENDER_MAIL,
      subject,
      text,
      html,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail send error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
