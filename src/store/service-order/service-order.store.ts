import { authHeader } from "@utils/methods";
import { defaultHeaders, Endpoints } from "@constants/api";
import { atom } from "jotai";
import { ServiceOrder } from "@store/service-order/service-order.types";

export const serviceOrderAtom = atom<ServiceOrder[]>([]);

export const fetchServiceOrderAtom = atom(
  async () => {
    try {
      const response = await fetch(Endpoints.ServiceOrder.List, {
        method: "GET",
        credentials: "include",
        headers: {
          ...defaultHeaders,
          ...authHeader(),
        },
      });

      if (response.status === 401) {
        alert("Your session has expired, please login again.");
        window.location.replace("/");
        return [];
      }

      const json: ServiceOrder[] = await response.json();

      return json;
    } catch (error) {
      return [];
    }
  },
  async (get, set) => {
    const serviceOrders = await get(fetchServiceOrderAtom); // get the value of fetchProjectsAtom
    set(serviceOrderAtom, serviceOrders); // set the projects into the projectAtom
  }
);
