import { NextResponse } from "next/server";
import axios from "axios";

export async function POST() {
  try {
    // 1️⃣ Get Azure token (app-only)
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: process.env.AZURE_CLIENT_ID,
        client_secret: process.env.AZURE_CLIENT_SECRET,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 2️⃣ Send Teams message (replace IDs with your own)
    const response = await axios.post(
      `https://teams.microsoft.com/l/channel/19%3AKbct8yWVoSkUfCRmWS3IoEn351HPK2u7S4hF3BQRx8c1%40thread.tacv2/General?groupId=164ebd2c-8444-4651-8e12-4094aea75da5&tenantId=aae8fbe2-488b-49d9-b471-e4be61674a71/messages`,
      {
        body: {
          content: "Hello World from Next.js App Router!",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      message: "Notification sent",
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
