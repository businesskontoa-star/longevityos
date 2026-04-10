// Real data: PT0001 from provided datasets
// EHR: age 66, M, France | Wearable: 90-day avg | Lifestyle survey: 2023-11-30

export const mockPatient = {
  id: "PT0001",
  name: "Jean-Michel Dupont",
  firstName: "Jean-Michel",
  age: 66,
  sex: "male",
  country: "France",
  biologicalAge: 71,        // derived: elevated HbA1c + LDL + low activity + age
  longevityScore: 54,       // derived from risk factor composite
  lastVisit: "2023-01-03",
  nextMilestone: "Diabetes review & HbA1c recheck",
  nextMilestoneDate: "2024-02-15",
  clinic: "Centrum Health & Diagnostics",

  vitals: {
    height: 175.9,
    weight: 75.8,
    bmi: 24.5,
    sbp: 115,
    dbp: 74,
    smokingStatus: "never",
    alcoholUnitsWeekly: 16,
  },

  // Real lab values from ehr_records.csv PT0001
  labs: [
    { name: "HbA1c", value: 7.6, unit: "%", ref: "<7.0 (diabetic target)", status: "elevated", trend: "up", date: "2023-01-03", longevityNote: "Above target — persistent high glucose accelerates vascular ageing" },
    { name: "Fasting Glucose", value: 9.4, unit: "mmol/L", ref: "4.0–7.0", status: "elevated", trend: "up", date: "2023-01-03", longevityNote: "Elevated — review medication adherence with your care team" },
    { name: "LDL Cholesterol", value: 4.44, unit: "mmol/L", ref: "<2.6 (diabetic)", status: "elevated", trend: "stable", date: "2023-01-03", longevityNote: "Significantly above diabetic LDL target — cardiovascular risk amplifier" },
    { name: "Total Cholesterol", value: 7.46, unit: "mmol/L", ref: "<5.0", status: "elevated", trend: "stable", date: "2023-01-03", longevityNote: "High — combined with diabetes this is a priority area" },
    { name: "HDL Cholesterol", value: 1.61, unit: "mmol/L", ref: ">1.0 (M)", status: "normal", trend: "stable", date: "2023-01-03", longevityNote: "Within range — protective cholesterol at acceptable level" },
    { name: "Triglycerides", value: 1.63, unit: "mmol/L", ref: "<1.7", status: "normal", trend: "stable", date: "2023-01-03", longevityNote: "Borderline — worth monitoring alongside LDL" },
    { name: "hsCRP", value: 0.1, unit: "mg/L", ref: "<1.0", status: "normal", trend: "stable", date: "2023-01-03", longevityNote: "Low inflammation — a positive signal" },
    { name: "eGFR", value: 85, unit: "mL/min", ref: ">60", status: "normal", trend: "stable", date: "2023-01-03", longevityNote: "Kidney function adequate — continue monitoring annually" },
  ],

  // Real wearable averages from wearable_telemetry PT0001 (90 days)
  wearable: {
    avgSleep: 6.8,
    sleepQuality: 61,
    deepSleepPct: 19,
    avgSteps: 5240,
    avgActiveMinutes: 14,
    avgRestingHR: 84,
    avgHRV: 24.2,
    avgSpO2: 98.1,
    avgCalories: 1780,
    recoveryScore: 38,      // derived from HRV + sleep quality
    stressScore: 72,        // derived from HRV low + sedentary high
    weeklyTrend: [
      { day: "Mon", steps: 5400, sleep: 6.6, hrv: 23.1 },
      { day: "Tue", steps: 6100, sleep: 7.1, hrv: 25.8 },
      { day: "Wed", steps: 4800, sleep: 6.4, hrv: 22.4 },
      { day: "Thu", steps: 5900, sleep: 6.9, hrv: 26.1 },
      { day: "Fri", steps: 4600, sleep: 6.5, hrv: 22.9 },
      { day: "Sat", steps: 6800, sleep: 7.4, hrv: 27.3 },
      { day: "Sun", steps: 3900, sleep: 7.0, hrv: 24.8 },
    ],
  },

  // Real lifestyle survey PT0001
  lifestyle: {
    surveyDate: "2023-11-30",
    dietQualityScore: 6,
    fruitVegServingsDaily: 2.6,
    mealFrequencyDaily: 2,
    exerciseSessionsWeekly: 3,
    sedentaryHrsDay: 9.3,
    stressLevel: 3,
    sleepSatisfaction: 5,
    mentalWellbeingWho5: 16,
    selfRatedHealth: 3,
    waterGlassesDaily: 7,
  },

  longevityDimensions: [
    { name: "Metabolic Health", score: 42, max: 100, color: "#f87171" },
    { name: "Cardiovascular", score: 58, max: 100, color: "#14B8A6" },
    { name: "Sleep & Recovery", score: 48, max: 100, color: "#a78bfa" },
    { name: "Physical Activity", score: 45, max: 100, color: "#1D4ED8" },
    { name: "Mental Wellbeing", score: 64, max: 100, color: "#22C55E" },
    { name: "Lifestyle", score: 61, max: 100, color: "#F59E0B" },
  ],

  diagnoses: ["Type 2 Diabetes (E11)", "Dyslipidaemia (E78.5)"],
  medications: ["Metformin 500mg twice daily", "Atorvastatin 40mg once daily"],

  visits: [
    { date: "2023-01-03", type: "Follow-up — Reflux (K21.0)", clinic: "Centrum Health", notes: "ICD K21.0 — gastro-oesophageal reflux noted" },
    { date: "2022-09-28", type: "Upper respiratory (R05)", clinic: "Centrum Health", notes: "ICD R05 — acute cough episode" },
    { date: "2022-06-09", type: "Dyslipidaemia review (E78.5)", clinic: "Centrum Health", notes: "Statin therapy ongoing" },
    { date: "2022-04-15", type: "Diabetes review (E11)", clinic: "Centrum Health", notes: "HbA1c above target, Metformin dose stable" },
  ],

  todayInsight: {
    headline: "Your HbA1c of 7.6% is above target — and your activity data shows why.",
    detail: "With only 5,240 average daily steps and 14 active minutes per day, your body isn't getting the metabolic stimulus that helps glucose regulation. Research shows that even moderate daily movement — walking 30 minutes after meals — can lower HbA1c by 0.3–0.5% over 3 months. Combined with your LDL at 4.44 mmol/L (well above the 2.6 target for diabetic patients), your cardiovascular ageing trajectory is a priority conversation to have with your care team.",
    urgency: "high",
    linkedLabs: ["HbA1c", "LDL Cholesterol"],
    linkedWearable: ["avgSteps", "avgActiveMinutes"],
  },

  nextBestAction: {
    title: "Post-Meal Walking Programme",
    description: "A structured 10-minute post-meal walk, 3x daily. Clinically proven to reduce post-prandial glucose spikes and lower HbA1c in type 2 diabetic patients within 12 weeks.",
    cta: "Start your programme",
    type: "program",
    clinicOffering: true,
    estimatedImpact: "−0.5% HbA1c · +7 longevity score in 90 days",
  },

  futureProjection: {
    currentTrajectory: {
      biologicalAgeAt75: 84,
      label: "Current path",
      description: "If HbA1c and LDL remain uncontrolled"
    },
    optimizedTrajectory: {
      biologicalAgeAt75: 76,
      label: "Optimised path",
      description: "With glucose control + LDL management + activity"
    },
    interventions: [
      { action: "Increase daily steps to 8,000+", impact: "+9 longevity score", timeframe: "8 weeks" },
      { action: "Achieve HbA1c < 7.0%", impact: "+12 longevity score", timeframe: "3 months" },
      { action: "Reduce LDL below 2.6 mmol/L", impact: "+10 longevity score", timeframe: "6 months" },
      { action: "Improve sleep to 7.5h average", impact: "+6 longevity score", timeframe: "6 weeks" },
    ]
  },

  plan: {
    active: [
      { id: 1, title: "Post-Meal Walking Programme (30 min/day)", type: "program", status: "recommended", priority: "high", clinic: true },
      { id: 2, title: "HbA1c recheck in 3 months", type: "lab", status: "due", priority: "high", clinic: true },
      { id: 3, title: "LDL management review — statin dose assessment", type: "diagnostic", status: "due", priority: "high", clinic: true },
      { id: 4, title: "Reduce sedentary time — standing desk / breaks", type: "program", status: "recommended", priority: "medium", clinic: false },
      { id: 5, title: "Omega-3 supplementation (2g daily)", type: "supplement", status: "recommended", priority: "medium", clinic: false },
      { id: 6, title: "Annual eGFR monitoring (diabetes protocol)", type: "lab", status: "scheduled", priority: "medium", clinic: true },
    ]
  },

  journeyMilestones: [
    { date: "2022-04-15", event: "Diabetes review — HbA1c baseline set", status: "completed", type: "visit" },
    { date: "2022-06-09", event: "Dyslipidaemia confirmed — statin started", status: "completed", type: "visit" },
    { date: "2023-01-03", event: "Follow-up — AI longevity insight delivered", status: "completed", type: "insight" },
    { date: "2024-02-15", event: "HbA1c recheck + LDL management review", status: "upcoming", type: "visit" },
    { date: "2024-04-01", event: "3-month activity programme assessment", status: "upcoming", type: "milestone" },
    { date: "2024-07-01", event: "6-month longevity re-score", status: "planned", type: "milestone" },
  ]
};

// ── Clinic dashboard metrics (population-level from 1,000 pt dataset) ──────
export const clinicMetrics = {
  overview: {
    activePatients: 1000,
    activePatientsChange: +8,
    retentionRate: 68,
    retentionChange: +5,
    recallRecoveryRate: 34,
    recallChange: +11,
    preventiveConversionRate: 19,
    preventiveConversionChange: +7,
    aiInfluencedRevenue: 187000,
    aiInfluencedRevenueChange: +22,
    missedFollowUps: 312,
    avgBiologicalAgeDelta: 4.2,   // avg bio age ahead of chronological
    highRiskCount: 284,
  },
  segments: [
    { name: "Diabetic / High HbA1c", count: 218, opportunity: "€420K", priority: "critical", color: "#f87171", description: "HbA1c > 7%, often with dyslipidaemia co-occurrence" },
    { name: "Cardiovascular Risk Cluster", count: 341, opportunity: "€580K", priority: "high", color: "#F59E0B", description: "LDL > 3.5 mmol/L, hypertension, or both" },
    { name: "Sedentary + Sleep Deficit", count: 289, opportunity: "€310K", priority: "high", color: "#1D4ED8", description: "<6k steps/day AND <7h sleep — metabolic risk building" },
    { name: "Older Prevention-Ready (55+)", count: 387, opportunity: "€490K", priority: "medium", color: "#a78bfa", description: "No chronic conditions yet — prime prevention window" },
    { name: "High Engagement / Adherent", count: 156, opportunity: "€220K", priority: "medium", color: "#22C55E", description: ">8 visits/2yr, exercise >4x/week — upsell candidates" },
  ],
  funnel: [
    { stage: "Onboarded", count: 1000, pct: 100 },
    { stage: "Connected Data", count: 760, pct: 76 },
    { stage: "Got First Insight", count: 590, pct: 59 },
    { stage: "Got Recommendation", count: 420, pct: 42 },
    { stage: "Booked Next Step", count: 190, pct: 19 },
    { stage: "Returned to Clinic", count: 128, pct: 13 },
  ],
  opportunities: [
    { category: "Diabetic Metabolic Programme", potentialPatients: 218, conversionEst: 87, revenueEst: "€174K" },
    { category: "Cardiovascular Prevention Panel", potentialPatients: 341, conversionEst: 102, revenueEst: "€204K" },
    { category: "Sleep & Recovery Programme", potentialPatients: 289, conversionEst: 86, revenueEst: "€129K" },
    { category: "Annual Longevity Assessment", potentialPatients: 387, conversionEst: 116, revenueEst: "€232K" },
    { category: "Lipid Management & Statin Review", potentialPatients: 312, conversionEst: 93, revenueEst: "€111K" },
  ],
  monthlyRevenue: [
    { month: "Aug", baseline: 310000, aiInfluenced: 324000 },
    { month: "Sep", baseline: 295000, aiInfluenced: 318000 },
    { month: "Oct", baseline: 320000, aiInfluenced: 351000 },
    { month: "Nov", baseline: 308000, aiInfluenced: 362000 },
    { month: "Dec", baseline: 285000, aiInfluenced: 348000 },
    { month: "Jan", baseline: 330000, aiInfluenced: 401000 },
  ],
  highRiskPatients: [
    { id: "PT0001", name: "Jean-Michel Dupont", age: 66, score: 54, risk: "HbA1c 7.6% + LDL 4.44", lastVisit: "2023-01-03", action: "Metabolic programme + statin review", urgency: "critical" },
    { id: "PT0003", name: "Elena Hoffmann", age: 51, score: 49, risk: "Hypertension + T2D + Dyslipidaemia", lastVisit: "2023-04-10", action: "BP optimisation + HbA1c recheck", urgency: "critical" },
    { id: "PT0007", name: "Claire Voss", age: 51, score: 52, risk: "LDL 5.74 + Depression + Smoking", lastVisit: "2023-11-30", action: "Lipid panel review + mental health screen", urgency: "high" },
    { id: "PT0008", name: "Marco Fischer", age: 48, score: 55, risk: "LDL 5.0 + BP 137/89 + CRP 2.8", lastVisit: "2023-07-04", action: "Cardiovascular risk assessment", urgency: "high" },
    { id: "PT0004", name: "Sophie Laurent", age: 36, score: 58, risk: "LDL 4.78 + Obesity + CRP 6.1", lastVisit: "2023-02-13", action: "Weight management + statin optimisation", urgency: "high" },
  ]
};