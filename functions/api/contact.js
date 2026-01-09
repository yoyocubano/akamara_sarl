
export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { name, email, phone, message, company, division } = body;

    const PROJECT_ID = env.VITE_APPWRITE_PROJECT_ID || '696075130002ba18c0ac';
    const ENDPOINT = env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
    const DATABASE_ID = env.VITE_APPWRITE_DATABASE_ID || 'main';
    const COLLECTION_ID = env.VITE_APPWRITE_COLLECTION_ID || 'petitions';
    const API_KEY = env.APPWRITE_API_KEY;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Guardar en Appwrite vía REST API
    try {
        const appwritePayload = {
            documentId: 'unique()',
            data: {
                name,
                email,
                message,
                company: company || 'No especificada',
                division: division || 'General',
                phone: phone || 'No proveído',
                date: new Date().toISOString()
            }
        };

        await fetch(`${ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': PROJECT_ID,
                'X-Appwrite-Key': API_KEY
            },
            body: JSON.stringify(appwritePayload)
        });
    } catch (dbError) {
        console.error('Error Appwrite REST:', dbError);
    }

    // 2. Enviar Email vía Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Akamara Web <onboarding@resend.dev>',
        to: ['akamarasurl@gmail.com'],
        reply_to: email,
        subject: `Nueva Propuesta: ${division} - ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; border-top: 5px solid #d97706;">
              <h2 style="color: #d97706;">Nueva Propuesta Recibida</h2>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Empresa:</strong> ${company || '-'}</p>
              <p><strong>División:</strong> ${division}</p>
              <p><strong>Teléfono:</strong> ${phone || '-'}</p>
              <div style="background: #fffbeb; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <p style="margin: 0;">${message}</p>
              </div>
            </div>
          </div>
        `
      })
    });

    const emailData = await resendResponse.json();

    return new Response(JSON.stringify({ success: true, id: emailData.id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

    return new Response(JSON.stringify({ success: true, id: emailData.id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  }
};
