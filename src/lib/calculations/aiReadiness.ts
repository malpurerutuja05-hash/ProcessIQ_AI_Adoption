import { READINESS_QUESTIONS, ReadinessQuestion } from '../data/readinessQuestions';
import { 
  ReadinessTier, 
  ReadinessOutputs, 
  ReadinessClassification, 
  ReadinessCategoryScore, 
  RoadmapTask 
} from '../types/assessment';

export function calculateAIReadiness(
  tier: ReadinessTier,
  answers: Record<string, number> // questionId -> selectedOptionScore (0 to 4)
): ReadinessOutputs {
  // Filter questions for the selected tier
  const applicableQuestions = READINESS_QUESTIONS.filter(q => q.tiers.includes(tier));
  const questionCount = applicableQuestions.length;

  let totalEarnedScore = 0;
  let totalMaxScore = questionCount * 4;
  let answeredCount = 0;

  // Track category aggregates
  const categories: Record<string, { earned: number; max: number }> = {
    'Process': { earned: 0, max: 0 },
    'Data': { earned: 0, max: 0 },
    'Technology': { earned: 0, max: 0 },
    'Governance & Risk': { earned: 0, max: 0 },
    'Organization & Value': { earned: 0, max: 0 }
  };

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const risks: string[] = [];
  const opportunities: string[] = [];

  applicableQuestions.forEach(q => {
    const rawAnswer = answers[q.id];
    const score = rawAnswer !== undefined ? Math.min(4, Math.max(0, rawAnswer)) : 0;
    if (rawAnswer !== undefined) {
      answeredCount++;
    }

    totalEarnedScore += score;
    categories[q.category].earned += score;
    categories[q.category].max += 4;

    const normalizedDimScore = (score / 4) * 100;
    if (normalizedDimScore >= 75) {
      strengths.push(`${q.dimension}: High maturity (${score}/4). Provides a strong operational launchpad.`);
    } else if (normalizedDimScore <= 25) {
      weaknesses.push(`${q.dimension}: Critical gap (${score}/4). Current baseline lacks necessary maturity.`);
      risks.push(`Operational Risk in ${q.dimension}: Failure to remediate will create systemic bottlenecks during AI adoption.`);
    } else {
      opportunities.push(`Improvement Opportunity in ${q.dimension}: Targeted optimization could elevate readiness score.`);
    }
  });

  // Calculate overall score (0 to 100)
  const overallScore = totalMaxScore > 0 
    ? Math.round((totalEarnedScore / totalMaxScore) * 100) 
    : 0;

  // Determine classification
  let classification: ReadinessClassification = 'Not Ready';
  let classificationDescription = '';

  if (overallScore >= 80) {
    classification = 'Strong Readiness';
    classificationDescription = 'The process demonstrates high standardization, robust digital data assets, mature governance, and strong organizational ownership. You are well-positioned for immediate agentic AI deployment.';
  } else if (overallScore >= 60) {
    classification = 'Automation/AI Candidate';
    classificationDescription = 'The process has a solid operational foundation with good repetition and moderate digital readiness. A targeted pilot or hybrid rules-plus-AI implementation is highly recommended.';
  } else if (overallScore >= 40) {
    classification = 'Foundation Required';
    classificationDescription = 'Foundational deficiencies exist in data accessibility, process documentation, or governance. Focus on standardizing procedures and cleaning data before investing heavily in commercial AI licenses.';
  } else {
    classification = 'Not Ready';
    classificationDescription = 'The workflow is largely manual, informal, or unstructured. Introducing generative AI or autonomous agents at this stage carries high financial risk and potential operational disruption. Address core process debt first.';
  }

  // Compile Category Scores
  const categoryScores: ReadinessCategoryScore[] = Object.entries(categories)
    .filter(([_, data]) => data.max > 0)
    .map(([catName, data]) => {
      const pct = Math.round((data.earned / data.max) * 100);
      let status: 'Critical Gap' | 'Needs Attention' | 'Acceptable' | 'Strength' = 'Needs Attention';
      if (pct >= 80) status = 'Strength';
      else if (pct >= 60) status = 'Acceptable';
      else if (pct >= 40) status = 'Needs Attention';
      else status = 'Critical Gap';

      return {
        category: catName,
        scorePct: pct,
        maxScore: data.max,
        earnedScore: data.earned,
        status
      };
    });

  // Practical 30-Day Improvement Roadmap
  const thirtyDayRoadmap: RoadmapTask[] = [
    {
      dayRange: 'Days 1–10',
      phase: 'Phase 1: Process Hygiene & Ground Truth',
      title: 'Workflow Mapping & SOP Standardization',
      action: 'Document the exact 5-to-10 step workflow, establish decision trees, and catalog all common edge cases and exception handling paths.',
      deliverable: 'Approved Standard Operating Procedure (SOP) with step-level duration and exception matrix.',
      owner: 'Business Process Owner & Operations Lead'
    },
    {
      dayRange: 'Days 11–20',
      phase: 'Phase 2: Data Architecture & Governance',
      title: 'Data Accessibility Audit & Sanitization',
      action: 'Verify that required inputs are programmatically retrievable via APIs or cloud repositories. Implement input schema validation rules and remove PII from prompt paths.',
      deliverable: 'Clean Golden Evaluation Dataset of 50 historical transactions with verified ground truth outputs.',
      owner: 'Data Engineer & IT Security Lead'
    },
    {
      dayRange: 'Days 21–30',
      phase: 'Phase 3: Architecture Pilot & Change Enablement',
      title: 'Constrained Pilot & Human-in-the-Loop Setup',
      action: 'Deploy a bounded pilot (10% to 20% transaction volume) using a copilot or supervised agent architecture with strict human sign-off thresholds.',
      deliverable: 'Pilot Performance Scorecard measuring cycle-time reduction, error interception rate, and employee adoption telemetry.',
      owner: 'Transformation Lead & Functional Power Users'
    }
  ];

  const disclaimer = 
    'Disclaimer: The ProcessIQ AI Readiness Assessment is an indicative diagnostic framework designed for executive decision support. ' +
    'It does not constitute a certified legal, technological, or regulatory audit, nor does it guarantee implementation success.';

  return {
    tier,
    questionCount,
    answeredCount,
    overallScore,
    classification,
    classificationDescription,
    categoryScores,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
    improvementOpportunities: opportunities.slice(0, 4),
    keyRisks: risks.slice(0, 4),
    thirtyDayRoadmap,
    disclaimer
  };
}
