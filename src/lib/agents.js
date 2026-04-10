import { base44 } from '@/api/base44Client';

// Simulated agent calls — uses InvokeLLM for coach, mock for speed on others

export async function runTranslationAgent(patient) {
  return {
    headline: patient.todayInsight.headline,
    detail: patient.todayInsight.detail,
    linkedItems: patient.todayInsight.linkedLabs,
    urgency: patient.todayInsight.urgency,
    longevityFrame: "Your inflammation pattern is one of the most modifiable risk factors for healthy aging. The good news: it responds well to targeted sleep and lifestyle interventions.",
    clinicCTA: "Your care team at Centrum Health has reviewed this pattern. A consultation is recommended.",
  };
}

export async function runPreventionAgent(patient) {
  return {
    primaryAction: patient.nextBestAction,
    secondaryActions: patient.plan.active.slice(1, 4),
    reasoning: "Based on your current hsCRP and sleep data, addressing sleep quality is the highest-leverage intervention for your longevity trajectory.",
    estimatedImpact: patient.nextBestAction.estimatedImpact,
  };
}

export async function runRecallAgent(patient) {
  const daysSinceVisit = Math.floor((new Date() - new Date(patient.lastVisit)) / 86400000);
  return {
    daysSinceVisit,
    needsReactivation: daysSinceVisit > 45,
    message: daysSinceVisit > 45
      ? `It's been ${daysSinceVisit} days since your last visit. Based on your recent data, your sleep trend needs attention.`
      : `You're on track. Your next milestone is in ${Math.ceil((new Date(patient.nextMilestoneDate) - new Date()) / 86400000)} days.`,
    nextMilestone: patient.nextMilestone,
    nextMilestoneDate: patient.nextMilestoneDate,
  };
}

export async function askCoach(patient, userMessage, conversationHistory = []) {
  const systemContext = `You are an AI health coach for LongevityOS. You are speaking with ${patient.name}, age ${patient.age}.

Patient key data:
- Biological age: ${patient.biologicalAge} (chronological: ${patient.age})
- Longevity score: ${patient.longevityScore}/100
- Key concerns: hsCRP ${patient.labs.find(l => l.name === 'hsCRP')?.value} mg/L (elevated), Vitamin D ${patient.labs.find(l => l.name === 'Vitamin D')?.value} ng/mL (low), avg sleep ${patient.wearable.avgSleep}h
- Active diagnoses: ${patient.diagnoses.join(', ')}

CRITICAL RULES:
- Never diagnose. Use uncertainty language ("may suggest", "could indicate", "worth discussing with your doctor").
- Always guide back to clinic for confirmation.
- Frame everything in longevity language — investment in future self, resilience, trajectory.
- Be warm, calm, reassuring. Never create fear or false urgency.
- Keep responses concise — 2-4 sentences max unless patient asks for more detail.
- End with a gentle nudge toward a next step or clinic touchpoint when appropriate.`;

  const messages = [
    ...conversationHistory.map(m => `${m.role === 'user' ? 'Patient' : 'Coach'}: ${m.content}`),
    `Patient: ${userMessage}`
  ].join('\n');

  const response = await base44.integrations.Core.InvokeLLM({
    prompt: `${systemContext}\n\nConversation:\n${messages}\n\nCoach:`,
    model: 'claude_sonnet_4_6',
  });

  return response;
}