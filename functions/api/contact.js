
export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { name, email, phone, message, company, division } = body;

    // --- CONFIGURATION ---
    // Use Akamara-specific variables first, fallback to standard ones
    const APPWRITE_ENDPOINT = env.AKAMARA_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
    const APPWRITE_PROJECT = env.AKAMARA_APPWRITE_PROJECT_ID || 'fra-696075130002ba18c0ac';
    const APPWRITE_KEY = env.AKAMARA_APPWRITE_SERVER_KEY || env.APPWRITE_API_KEY; // The long secret key
    const APPWRITE_DB = 'main';
    const APPWRITE_COLLECTION = 'petitions';
    
    // Resend Config
    const RESEND_KEY = env.AKAMARA_RESEND_API_KEY || env.RESEND_API_KEY;
    const MAIL_FROM = env.AKAMARA_MAIL_FROM || 'onboarding@resend.dev';

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

        const dbResponse = await fetch(`${APPWRITE_ENDPOINT}/databases/${APPWRITE_DB}/collections/${APPWRITE_COLLECTION}/documents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': APPWRITE_PROJECT,
                'X-Appwrite-Key': APPWRITE_KEY
            },
            body: JSON.stringify(appwritePayload)
        });
        
        if (!dbResponse.ok) {
            const errorText = await dbResponse.text();
            console.error('Appwrite Error:', errorText);
        }

    } catch (dbError) {
        console.error('Error Appwrite REST:', dbError);
    }

    // 2. Enviar Email vía Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `Akamara Web <${MAIL_FROM}>`,
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
            <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
                Enviado desde el formulario web de Akamara S.U.R.L.
            </div>
          </div>
        `
      })
    });

    const emailData = await resendResponse.json();

    if (!resendResponse.ok) {
        throw new Error(emailData.message || 'Error enviando email');
    }

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

