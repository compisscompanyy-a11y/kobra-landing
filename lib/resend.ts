import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification(lead: {
  name: string
  email: string
  phone?: string | null
  product: string
  message?: string | null
}) {
  return resend.emails.send({
    from: 'Kobra AI <onboarding@resend.dev>',
    to: 'kobra.automation.ia@gmail.com',
    subject: `Nuevo lead: ${lead.product} — ${lead.name}`,
    html: `
      <h2 style="color:#00E676">Nuevo contacto desde kobra-automation.com</h2>
      <p><strong>Nombre:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Teléfono:</strong> ${lead.phone ?? '—'}</p>
      <p><strong>Servicio:</strong> ${lead.product}</p>
      <p><strong>Mensaje:</strong> ${lead.message ?? '—'}</p>
    `,
  })
}

export async function sendReplyToLead(
  to: string,
  subject: string,
  body: string
) {
  return resend.emails.send({
    from: 'Kobra AI <onboarding@resend.dev>',
    to,
    subject,
    html: body.replace(/\n/g, '<br>'),
  })
}
