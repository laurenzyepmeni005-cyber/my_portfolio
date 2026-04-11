export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { Name, Email, Phone, subject, message } = req.body || {};

    if (!Name || !Email || !message) {
      return res.status(400).json({
        error: "Name, Email et message sont obligatoires.",
      });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        error: "Variables d'environnement manquantes sur Vercel.",
      });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/akiba`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        Name,
        Email,
        Phone : Phone || null,
        subject: subject || null,
        Message: message,
      }),
    });

    const data = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erreur Supabase",
        details: data,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message envoyé avec succès.",
      data: data ? JSON.parse(data) : null,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}


