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
  ServiceOrder: {
    List: "http://localhost:3000/service-orders/",
    Create: "http://localhost:3000/service-orders/",
    Edit: "http://localhost:3000/service-orders",
    Delete: "http://localhost:3000/service-orders",
  },
} as const;

export const defaultHeaders = {
  "Content-Type": "application/json",
} as const;
