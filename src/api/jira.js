// api/jira.js

export async function fetchJira(emp) {
  return {
    tasks: emp.jira?.tasks_assigned || 0,
    completed: emp.jira?.tasks_completed || 0,
    in_progress: emp.jira?.in_progress || 0
  };
}