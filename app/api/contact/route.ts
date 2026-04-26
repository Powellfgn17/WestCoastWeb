import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, business_type, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      )
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      // Dev fallback — log to console when no API key is configured
      console.log("[Contact Form — no RESEND_API_KEY]", {
        name,
        email,
        business_type,
        message,
      })
      return NextResponse.json({ success: true, dev: true })
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from:
          process.env.RESEND_FROM_EMAIL ||
          "WestCoastWeb <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "hello@powelldigital.com",
        subject: `[WestCoastWeb] New inquiry from ${name}`,
        reply_to: email,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Business type:</strong> ${business_type || "Not specified"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error("[Resend error]", err)
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Contact API error]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
