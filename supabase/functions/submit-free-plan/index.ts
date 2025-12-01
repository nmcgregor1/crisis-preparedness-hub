import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FreePlanFormData {
  businessName: string;
  location: string;
  employees: string;
  industry: string;
  physicalLocation: string;
  sqft: string;
  ownRent: string;
  infrastructure: string[];
  criticalProducts: string;
  functions: string[];
  tools: string;
  records: string;
  hazards: string[];
  recentDisruption: string;
  insurance: string;
  backupStaff: string;
  notifyTime: string;
  commChannel: string;
  emergencyContacts: string;
  surviveTime: string;
  priority: string;
  support: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Submit free plan function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FreePlanFormData = await req.json();
    console.log("Received form data for:", formData.businessName);

    // Build a nicely formatted email
    const emailHtml = `
      <h1>New Free Plan Submission</h1>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      
      <h2>Section 1 — Basic Company Info</h2>
      <ul>
        <li><strong>Business Name:</strong> ${formData.businessName}</li>
        <li><strong>Location:</strong> ${formData.location}</li>
        <li><strong>Employees:</strong> ${formData.employees}</li>
        <li><strong>Industry:</strong> ${formData.industry}</li>
        <li><strong>Contact Email:</strong> ${formData.email}</li>
      </ul>

      <h2>Section 2 — Physical Location & Infrastructure</h2>
      <ul>
        <li><strong>Physical Location Type:</strong> ${formData.physicalLocation}</li>
        <li><strong>Square Footage:</strong> ${formData.sqft || 'Not specified'}</li>
        <li><strong>Own or Rent:</strong> ${formData.ownRent}</li>
        <li><strong>Infrastructure Dependencies:</strong> ${formData.infrastructure.length ? formData.infrastructure.join(', ') : 'None'}</li>
      </ul>

      <h2>Section 3 — Key Business Operations</h2>
      <ul>
        <li><strong>Critical Products/Services:</strong> ${formData.criticalProducts || 'Not specified'}</li>
        <li><strong>Critical Functions (24-72hrs):</strong> ${formData.functions.length ? formData.functions.join(', ') : 'Not specified'}</li>
        <li><strong>Tools/Platforms:</strong> ${formData.tools || 'Not specified'}</li>
        <li><strong>Customer Records Storage:</strong> ${formData.records}</li>
      </ul>

      <h2>Section 4 — Risk Exposure</h2>
      <ul>
        <li><strong>Relevant Hazards:</strong> ${formData.hazards.length ? formData.hazards.join(', ') : 'None specified'}</li>
        <li><strong>Recent Disruption (5 years):</strong> ${formData.recentDisruption || 'None'}</li>
        <li><strong>Insurance Coverage:</strong> ${formData.insurance}</li>
      </ul>

      <h2>Section 5 — People & Continuity</h2>
      <ul>
        <li><strong>Backup Staff Available:</strong> ${formData.backupStaff}</li>
        <li><strong>Staff Notification Speed:</strong> ${formData.notifyTime}</li>
        <li><strong>Communication Channel:</strong> ${formData.commChannel || 'Not specified'}</li>
        <li><strong>Documented Emergency Contacts:</strong> ${formData.emergencyContacts}</li>
      </ul>

      <h2>Section 6 — Recovery Priorities</h2>
      <ul>
        <li><strong>Survival Time During Outage:</strong> ${formData.surviveTime}</li>
        <li><strong>Top Recovery Priority:</strong> ${formData.priority}</li>
        <li><strong>Additional Support Interest:</strong> ${formData.support === 'freeResources' ? 'Free resources' : formData.support === 'consulting' ? 'Consulting options' : 'No'}</li>
      </ul>
    `;

    // Send email to nick@crisistance.com
    const emailResponse = await resend.emails.send({
      from: "Crisistance <onboarding@resend.dev>",
      to: ["nick@crisistance.com"],
      subject: `Free Plan Submission: ${formData.businessName}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Submission received" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-free-plan function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
