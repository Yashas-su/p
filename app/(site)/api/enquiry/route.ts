import { NextRequest, NextResponse } from "next/server";

/**
 * Receives the contact/brief-upload form. Wired to forward to email/CRM —
 * plug in Resend, SendGrid, or a CRM webhook here. Kept provider-agnostic
 * since Planning Labs' preferred CRM wasn't specified in the brief.
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const payload = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    vertical: formData.get("vertical"),
    message: formData.get("message"),
  };

  const brief = formData.get("brief") as File | null;

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO(integration): send `payload` + `brief` to the chosen email/CRM
  // provider. Left as a clearly-marked integration point since Planning
  // Labs' preferred destination wasn't specified in the brief.
  console.log("New enquiry:", payload, brief ? `brief: ${brief.name}` : "no brief attached");

  return NextResponse.json({ ok: true });
}
