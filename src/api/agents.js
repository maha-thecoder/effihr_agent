// api/agents.js

import { aggregate } from "./aggregator";
import { callAI } from "./gemini";

// 🤖 MAIN AI AGENT
export async function generateFullAnalysis(emp) {
  const data = await aggregate(emp);

 const prompt = `
You are an AI HR Performance Analyst.

Analyze this employee using real work signals:

HR:
- Attendance: ${data.attendance}%
- Past Rating: ${data.past_rating}

Jira:
- Tasks Assigned: ${data.jira_tasks}
- Tasks Completed: ${data.completed_tasks}

GitHub:
- Commits: ${data.github_commits}
- Pull Requests: ${data.pull_requests}
- Code Reviews: ${data.code_reviews}

Documentation:
- Docs Written: ${data.docs_written}

Collaboration:
- Score: ${data.collaboration_score}/10

Instructions:
- Do NOT judge only by numbers
- Identify consistency and real contribution
- Detect if effort ≠ output
- Highlight hidden contributions

Output format:

Summary:
Strengths:
Weaknesses:
Rating (1-5):
Suggestions:
`;

  console.log("AI prompt data:", data);
  console.log("Generated Gemini prompt:\n", prompt);

  return await callAI(prompt);
}

// 📊 INSIGHT AGENT (SMART SCORING)
export function insightAgent(emp) {
  const score =
    (emp.jira?.tasks_completed || 0) * 2 +
    (emp.github?.commits || 0) * 0.5 +
    (emp.documentation?.docs_written || 0) * 3 +
    (emp.communication?.collaboration_score || 0) * 5 +
    (emp.hrms?.attendance || 0);

  if (score > 300) return "High Performer 🚀";
  if (score > 180) return "Average Performer ⚡";
  return "Needs Improvement ⚠️";
}

// 🔔 NUDGE AGENT (SMART)
export function nudgeAgent(emp) {
  if (!emp.feedbackGenerated) {
    return "⚠️ Review pending - Manager action required";
  }
  return "✅ Review completed";
}