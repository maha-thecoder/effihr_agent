// api/github.js

export async function fetchGithub(emp) {
  return {
    commits: emp.github?.commits || 0,
    prs: emp.github?.pull_requests || 0,
    reviews: emp.github?.code_reviews || 0
  };
}