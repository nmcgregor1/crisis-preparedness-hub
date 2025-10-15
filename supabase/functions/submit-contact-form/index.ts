import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10 && phone.length <= 20;
};

const sanitize = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { firstName, lastName, email, company, phone, message }: ContactSubmission = await req.json();

    // Validation
    if (!firstName || firstName.length < 2 || firstName.length > 100) {
      throw new Error("First name must be between 2 and 100 characters");
    }
    if (!lastName || lastName.length < 2 || lastName.length > 100) {
      throw new Error("Last name must be between 2 and 100 characters");
    }
    if (!email || !validateEmail(email) || email.length > 255) {
      throw new Error("Invalid email address");
    }
    if (!company || company.length < 2 || company.length > 200) {
      throw new Error("Company name must be between 2 and 200 characters");
    }
    if (phone && !validatePhone(phone)) {
      throw new Error("Invalid phone number");
    }
    if (!message || message.length < 10 || message.length > 2000) {
      throw new Error("Message must be between 10 and 2000 characters");
    }

    // Sanitize inputs
    const sanitizedData = {
      first_name: sanitize(firstName),
      last_name: sanitize(lastName),
      email: sanitize(email.toLowerCase()),
      company: sanitize(company),
      phone: phone ? sanitize(phone) : null,
      message: sanitize(message),
      user_agent: req.headers.get("user-agent") || null,
      ip_address: req.headers.get("x-forwarded-for") || null,
    };

    // Rate limiting - check recent submissions from this email
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentSubmissions, error: checkError } = await supabase
      .from("contact_submissions")
      .select("id")
      .eq("email", sanitizedData.email)
      .gte("created_at", oneHourAgo);

    if (checkError) {
      console.error("Error checking rate limit:", checkError);
    }

    if (recentSubmissions && recentSubmissions.length >= 3) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert into database
    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert(sanitizedData)
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save submission");
    }

    console.log("Contact submission saved:", submission.id);

    // Send emails
    try {
      // Admin notification email
      await resend.emails.send({
        from: "Crisistance Contact Form <onboarding@resend.dev>",
        to: ["support@crisistance.com"],
        subject: `New Contact Form Submission - ${sanitizedData.company}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Submission ID:</strong> ${submission.id}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p><strong>Name:</strong> ${sanitizedData.first_name} ${sanitizedData.last_name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Company:</strong> ${sanitizedData.company}</p>
          <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        `,
      });

      // User confirmation email
      await resend.emails.send({
        from: "Crisistance <onboarding@resend.dev>",
        to: [sanitizedData.email],
        subject: "Thank you for contacting Crisistance",
        html: `
          <h2>Thank you for contacting us, ${sanitizedData.first_name}!</h2>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p>Our crisis management experts are reviewing your inquiry about ${sanitizedData.company}.</p>
          <hr>
          <h3>What happens next?</h3>
          <ol>
            <li>We'll review your submission and contact you within 24 hours</li>
            <li>Schedule a free 30-minute consultation to assess your needs</li>
            <li>Receive a customized crisis management proposal</li>
            <li>Begin implementing your protection plan immediately</li>
          </ol>
          <p>If you need immediate assistance, please call our emergency hotline: <strong>1-647-600-5210</strong></p>
          <p>Best regards,<br>The Crisistance Team</p>
        `,
      });

      console.log("Emails sent successfully");
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Continue even if email fails - submission is saved
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Thank you! We'll contact you within 24 hours.",
        submissionId: submission.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact-form:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to submit form" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
