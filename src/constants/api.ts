export const Endpoints = {
  Auth: {
    Login: "http://localhost:3000/auth/login",
  },
  Project: {
    List: "http://localhost:3000/projects/",
    Create: "http://localhost:3000/projects/",
    Edit: "http://localhost:3000/projects",
    Delete: "http://localhost:3000/projects",
  },
} as const;

export const defaultHeaders = {
  "Content-Type": "application/json",
} as const;
