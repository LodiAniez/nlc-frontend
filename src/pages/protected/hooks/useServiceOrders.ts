import { defaultHeaders, Endpoints } from "@constants/api";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  fetchServiceOrderAtom,
  serviceOrderAtom,
} from "@store/service-order/service-order.store";
import { ServiceOrder } from "@store/service-order/service-order.types";
import { authHeader, catchError, throwIfFailed } from "@utils/methods";
import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect, startTransition } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { projectAtom, fetchProjectsAtom } from "@store/projects/projects.store";

const schema = yup.object().shape({
  name: yup.string().required("Service order name is required"),
  category: yup.string().required("Category is required"),
  description: yup.string(),
  project_id: yup
    .number()
    .positive()
    .integer()
    .required("Project ID is required"),
});

export const useServiceOrder = () => {
  const [modalTitle, setModalTitle] = useState("Add Service Order");
  const [btnLabel, setBtnLabel] = useState("Add");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [serviceOrders, setServiceOrder] = useAtom(serviceOrderAtom);
  const [, fetchServiceOrder] = useAtom(fetchServiceOrderAtom);
  const projects = useAtomValue(projectAtom);
  const [, fetchProjects] = useAtom(fetchProjectsAtom);

  const methods = useForm<ServiceOrder>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: ServiceOrder) => {
    const isEdit = data.id;
    const endpoint = isEdit
      ? `${Endpoints.ServiceOrder.Edit}/${data.id}`
      : Endpoints.ServiceOrder.Create;
    const method = isEdit ? "PATCH" : "POST";

    try {
      const request = await fetch(endpoint, {
        method,
        credentials: "include",
        headers: {
          ...defaultHeaders,
          ...authHeader(),
        },
        body: JSON.stringify(data),
      });

      const response: ServiceOrder = await request.json();

      throwIfFailed({
        request,
        response,
      });

      const updateList = (item: ServiceOrder) => {
        if (item.id === data.id) {
          item.description = response.description;
          item.name = response.name;
          item.category = response.category;
          item.is_approved = response.is_approved;
          item.project_id = response.project_id;
          item.project_name = response.project_name;
        }

        return item;
      };

      setServiceOrder(
        isEdit ? serviceOrders.map(updateList) : [...serviceOrders, response]
      );
      setIsModalOpen(false);
      reset();
    } catch (e) {
      const err = catchError(e);
      alert(err);
    }
  };

  const handleAdd = () => {
    setModalTitle("Add Service Order");
    setBtnLabel("Add");
    methods.reset({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (project: ServiceOrder) => {
    setModalTitle("Edit Service Order");
    setBtnLabel("Edit");
    methods.reset(project);
    setIsModalOpen(true);
  };
  const handleDelete = async (project: ServiceOrder) => {
    try {
      const isConfirmed = confirm(
        "Are you sure you want to delete this record?"
      );

      if (isConfirmed) {
        const request = await fetch(
          `${Endpoints.ServiceOrder.Delete}/${project.id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              ...defaultHeaders,
              ...authHeader(),
            },
          }
        );

        const response: Pick<ServiceOrder, "id"> = await request.json();

        throwIfFailed({
          request,
          response,
        });

        setServiceOrder(
          serviceOrders.filter(
            (serviceOrder) => serviceOrder.id !== response.id
          )
        );
      }
    } catch (e) {
      const err = catchError(e);
      alert(err);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((state) => !state);
  };

  useEffect(() => {
    startTransition(() => {
      Promise.all([fetchServiceOrder(), fetchProjects()]);
    });
  }, [fetchServiceOrder]);

  return {
    handleDelete,
    handleAdd,
    handleEdit,
    handleSubmit: handleSubmit(onSubmit),
    isModalOpen,
    methods,
    toggleModal,
    serviceOrders,
    modalTitle,
    btnLabel,
    projects,
  };
};
