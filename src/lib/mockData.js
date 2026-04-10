export const mockPatient = {
  id: "p-001",
  name: "Sofia Martinez",
  age: 38,
  sex: "female",
  biologicalAge: 41,
  longevityScore: 68,
  lastVisit: "2026-02-14",
  nextMilestone: "Cardiovascular check-up",
  nextMilestoneDate: "2026-04-28",
  clinic: "Centrum Health & Diagnostics",

  vitals: {
    restingHeartRate: 74,
    hrv: 28,
    bloodPressure: "128/82",
    weight: 67,
    bmi: 24.1,
  },

  labs: [
    { name: "LDL Cholesterol", value: 148, unit: "mg/dL", ref: "<130", status: "elevated", trend: "up", date: "2026-02-14" },
    { name: "HDL Cholesterol", value: 52, unit: "mg/dL", ref: ">50", status: "normal", trend: "stable", date: "2026-02-14" },
    { name: "HbA1c", value: 5.4, unit: "%", ref: "<5.7", status: "normal", trend: "stable", date: "2026-02-14" },
    { name: "hsCRP", value: 2.1, unit: "mg/L", ref: "<1.0", status: "elevated", trend: "up", date: "2026-02-14" },
    { name: "Vitamin D", value: 22, unit: "ng/mL", ref: "30–80", status: "low", trend: "down", date: "2026-02-14" },
    { name: "Ferritin", value: 18, unit: "ng/mL", ref: "12–150", status: "normal", trend: "stable", date: "2026-02-14" },
    { name: "TSH", value: 2.1, unit: "mIU/L", ref: "0.4–4.0", status: "normal", trend: "stable", date: "2026-02-14" },
    { name: "Cortisol (AM)", value: 18, unit: "μg/dL", ref: "6–23", status: "normal", trend: "up", date: "2026-02-14" },
  ],

  wearable: {
    avgSleep: 5.9,
    sleepQuality: 54,
    avgSteps: 6200,
    avgActiveMinutes: 18,
    vo2max: 31,
    stressScore: 68,
    recoveryScore: 42,
    weeklyTrend: [
      { day: "Mon", steps: 5800, sleep: 5.5, hrv: 26 },
      { day: "Tue", steps: 7100, sleep: 6.2, hrv: 30 },
      { day: "Wed", steps: 5200, sleep: 5.8, hrv: 27 },
      { day: "Thu", steps: 8300, sleep: 6.5, hrv: 32 },
      { day: "Fri", steps: 6100, sleep: 5.4, hrv: 25 },
      { day: "Sat", steps: 9200, sleep: 7.1, hrv: 35 },
      { day: "Sun", steps: 4800, sleep: 6.0, hrv: 29 },
    ],
  },

  longevityDimensions: [
    { name: "Sleep & Recovery", score: 52, max: 100, color: "#22d3b0" },
    { name: "Cardiovascular Fitness", score: 61, max: 100, color: "#f59e0b" },
    { name: "Metabolic Health", score: 74, max: 100, color: "#a78bfa" },
    { name: "Inflammation", score: 58, max: 100, color: "#f87171" },
    { name: "Biological Resilience", score: 65, max: 100, color: "#60a5fa" },
    { name: "Lifestyle & Behavior", score: 71, max: 100, color: "#34d399" },
  ],

  diagnoses: ["Mild dyslipidemia", "Vitamin D insufficiency", "Chronic stress (self-reported)"],
  medications: ["None currently"],

  visits: [
    { date: "2026-02-14", type: "Annual Check-up", clinic: "Centrum Health", notes: "Full panel, discussed lifestyle" },
    { date: "2025-09-03", type: "Cardiology Consultation", clinic: "Centrum Health", notes: "Echo normal, advised monitoring LDL" },
    { date: "2025-03-11", type: "Preventive Screening", clinic: "Centrum Health", notes: "Baseline longevity assessment" },
  ],

  todayInsight: {
    headline: "Your inflammation marker is elevated — and it's connected to your sleep.",
    detail: "Your hsCRP of 2.1 mg/L suggests low-grade inflammation. Combined with averaging only 5.9 hours of sleep this week, your recovery capacity is under pressure. This pattern, if sustained, may affect your cardiovascular trajectory over the next 5–10 years.",
    urgency: "moderate",
    linkedLabs: ["hsCRP", "LDL Cholesterol"],
    linkedWearable: ["avgSleep", "recoveryScore"],
  },

  nextBestAction: {
    title: "Book a Sleep & Recovery Program",
    description: "A structured 6-week sleep protocol could lower your hsCRP by up to 30% and improve your recovery score measurably.",
    cta: "Schedule a consultation",
    type: "program",
    clinicOffering: true,
    estimatedImpact: "+8 longevity score points in 90 days",
  },

  futureProjection: {
    currentTrajectory: {
      biologicalAgeAt50: 56,
      label: "Current path",
      description: "If current sleep and LDL trends continue"
    },
    optimizedTrajectory: {
      biologicalAgeAt50: 49,
      label: "Optimized path",
      description: "With sleep improvement + LDL management"
    },
    interventions: [
      { action: "Improve sleep to 7.5h avg", impact: "+12 longevity score", timeframe: "3 months" },
      { action: "Reduce LDL below 130", impact: "+9 longevity score", timeframe: "6 months" },
      { action: "Raise Vitamin D to optimal", impact: "+5 longevity score", timeframe: "8 weeks" },
      { action: "Increase VO2max to 38", impact: "+11 longevity score", timeframe: "6 months" },
    ]
  },

  plan: {
    active: [
      { id: 1, title: "Sleep Optimization Protocol", type: "program", status: "recommended", priority: "high", clinic: true },
      { id: 2, title: "Omega-3 Supplementation", type: "supplement", status: "recommended", priority: "medium", clinic: false },
      { id: 3, title: "Vitamin D3+K2 — 4000 IU daily", type: "supplement", status: "recommended", priority: "medium", clinic: false },
      { id: 4, title: "Cardiovascular Fitness Assessment", type: "diagnostic", status: "due", priority: "high", clinic: true },
      { id: 5, title: "Repeat hsCRP in 90 days", type: "lab", status: "scheduled", priority: "medium", clinic: true },
    ]
  },

  journeyMilestones: [
    { date: "2025-03-11", event: "Longevity baseline assessment", status: "completed", type: "visit" },
    { date: "2025-09-03", event: "Cardiology check — LDL flagged", status: "completed", type: "visit" },
    { date: "2026-02-14", event: "Annual panel — AI insight delivered", status: "completed", type: "insight" },
    { date: "2026-04-28", event: "Sleep & Recovery consultation", status: "upcoming", type: "visit" },
    { date: "2026-05-14", event: "Repeat hsCRP lab", status: "upcoming", type: "lab" },
    { date: "2026-07-01", event: "3-month longevity re-score", status: "planned", type: "milestone" },
  ]
};

export const clinicMetrics = {
  overview: {
    activePatients: 8420,
    activePatientsChange: +12,
    retentionRate: 71,
    retentionChange: +4,
    recallRecoveryRate: 38,
    recallChange: +9,
    preventiveConversionRate: 22,
    preventiveConversionChange: +6,
    aiInfluencedRevenue: 142000,
    aiInfluencedRevenueChange: +18,
    missedFollowUps: 1240,
  },
  segments: [
    { name: "High Risk / Low Engagement", count: 1840, opportunity: "€380K", priority: "critical", color: "#f87171" },
    { name: "Prevention-Ready / High Value", count: 2210, opportunity: "€510K", priority: "high", color: "#f59e0b" },
    { name: "Aging Risk (50+)", count: 3100, opportunity: "€290K", priority: "high", color: "#a78bfa" },
    { name: "Sleep & Stress Cluster", count: 1920, opportunity: "€220K", priority: "medium", color: "#60a5fa" },
    { name: "Chronic Care / Prevention", count: 2640, opportunity: "€460K", priority: "medium", color: "#34d399" },
  ],
  funnel: [
    { stage: "Onboarded", count: 8420, pct: 100 },
    { stage: "Connected Data", count: 6180, pct: 73 },
    { stage: "Got First Insight", count: 4920, pct: 58 },
    { stage: "Got Recommendation", count: 3640, pct: 43 },
    { stage: "Booked Next Step", count: 1850, pct: 22 },
    { stage: "Returned to Clinic", count: 1240, pct: 15 },
  ],
  opportunities: [
    { category: "Sleep & Recovery Programs", potentialPatients: 2800, conversionEst: 420, revenueEst: "€168K" },
    { category: "Cardiovascular Diagnostics", potentialPatients: 1900, conversionEst: 310, revenueEst: "€124K" },
    { category: "Metabolic Health Panels", potentialPatients: 2400, conversionEst: 380, revenueEst: "€114K" },
    { category: "Vitamin & Supplement Programs", potentialPatients: 3200, conversionEst: 640, revenueEst: "€96K" },
    { category: "Longevity Baseline Assessments", potentialPatients: 1600, conversionEst: 240, revenueEst: "€192K" },
  ],
  monthlyRevenue: [
    { month: "Oct", baseline: 280000, aiInfluenced: 298000 },
    { month: "Nov", baseline: 265000, aiInfluenced: 291000 },
    { month: "Dec", baseline: 248000, aiInfluenced: 278000 },
    { month: "Jan", baseline: 272000, aiInfluenced: 308000 },
    { month: "Feb", baseline: 290000, aiInfluenced: 334000 },
    { month: "Mar", baseline: 285000, aiInfluenced: 342000 },
  ],
  highRiskPatients: [
    { id: "p-001", name: "Sofia Martinez", age: 38, score: 68, risk: "Inflammation + Sleep", lastVisit: "2026-02-14", action: "Sleep program", urgency: "high" },
    { id: "p-002", name: "Thomas Becker", age: 54, score: 54, risk: "Cardiovascular + HbA1c", lastVisit: "2025-11-08", action: "Metabolic panel", urgency: "critical" },
    { id: "p-003", name: "Elena Voss", age: 46, score: 61, risk: "Stress + Vitamin D", lastVisit: "2026-01-22", action: "Stress assessment", urgency: "medium" },
    { id: "p-004", name: "Jean-Pierre Moreau", age: 62, score: 49, risk: "Aging + Sedentary", lastVisit: "2025-09-15", action: "Cardiology referral", urgency: "critical" },
    { id: "p-005", name: "Amara Diallo", age: 41, score: 72, risk: "Metabolic drift", lastVisit: "2026-03-01", action: "HbA1c repeat", urgency: "low" },
  ]
};