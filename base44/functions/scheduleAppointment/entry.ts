import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { patientName, patientEmail, date, time, type, clinic } = await req.json();

    // Log appointment to entities
    await base44.asServiceRole.entities.Appointment.create({
      patient_name: patientName,
      patient_email: patientEmail,
      appointment_date: date,
      appointment_time: time,
      appointment_type: type,
      clinic: clinic || 'Centrum Health & Diagnostics',
      status: 'confirmed',
    });

    // Send confirmation email
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: patientEmail,
      subject: `Termin bestätigt: ${type} — ${date} um ${time} Uhr`,
      body: `Sehr geehrte(r) ${patientName},

Ihr Termin wurde bestätigt:

📅 Datum: ${date}
⏰ Uhrzeit: ${time} Uhr
🏥 Klinik: ${clinic || 'Centrum Health & Diagnostics'}
📋 Termin-Art: ${type}

Wir freuen uns auf Ihren Besuch.

Mit freundlichen Grüßen,
Ihr VitaCore Team
Centrum Health & Diagnostics`,
    });

    return Response.json({ success: true, message: 'Appointment scheduled and confirmation email sent.' });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});