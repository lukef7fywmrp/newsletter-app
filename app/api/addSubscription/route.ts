import mailchimp from "@mailchimp/mailchimp_marketing";

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY,
//   server: process.env.MAILCHIMP_API_SERVER,
// });

export async function POST(request: Request) {
  // console.log("Mailchimp Config", {
  //   apiKey: process.env.MAILCHIMP_API_KEY ? "exists" : "missing",
  //   server: process.env.MAILCHIMP_API_SERVER ? "exists" : "missing",
  //   audienceId: process.env.MAILCHIMP_AUDIENCE_ID ? "exists" : "missing",
  // });

  const { email } = await request.json();

  if (!email) new Response(JSON.stringify({ error: "Email is required" }));

  try {
    // const res = await mailchimp.lists.addListMember(
    //   process.env.MAILCHIMP_AUDIENCE_ID!,
    //   { email_address: email, status: "subscribed" }
    // );
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;
    const data = {
      email_address: email,
      status: "subscribed",
    };
    
    const res = await fetch(
     `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    ); 


    return new Response(JSON.stringify( res ));
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: JSON.parse(error.response.text) })
    );
  }
}
