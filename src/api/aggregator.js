// api/aggregator.js

import { fetchJira } from "./jira";
import { fetchGithub } from "./github";

export async function aggregate(emp) {
  const jira = await fetchJira(emp);
  const github = await fetchGithub(emp);

  return {
    name: emp.name,

    // HRMS
    attendance: emp.hrms?.attendance || 0,
    past_rating: emp.hrms?.past_rating || 0,
    goals: emp.hrms?.goals || [],

    // Jira
    jira_tasks: jira.tasks,
    completed_tasks: jira.completed,
    in_progress: jira.in_progress,

    // GitHub
    github_commits: github.commits,
    pull_requests: github.prs,
    code_reviews: github.reviews,

    // Documentation
    docs_written: emp.documentation?.docs_written || 0,

    // Communication
    collaboration_score: emp.communication?.collaboration_score || 0,

    // Meta
    feedbackGenerated: emp.feedbackGenerated || false
  };
}