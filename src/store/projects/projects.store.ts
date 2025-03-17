import { Project } from "@store/projects/projects.types";
import { authHeader } from "@utils/methods";
import { defaultHeaders, Endpoints } from "@constants/api";
import { atom } from "jotai";

export const projectAtom = atom<Project[]>([]);

export const fetchProjectsAtom = atom(
  async () => {
    try {
      const response = await fetch(Endpoints.Project.List, {
        method: "GET",
        credentials: "include",
        headers: {
          ...defaultHeaders,
          ...authHeader(),
        },
      });

      if (response.status === 401) {
        alert("");
        window.location.replace("/");
        return [];
      }

      const json: Project[] = await response.json();

      return json;
    } catch (error) {
      return [];
    }
  },
  async (get, set) => {
    const projects = await get(fetchProjectsAtom); // get the value of fetchProjectsAtom
    set(projectAtom, projects); // set the projects into the projectAtom
  }
);
