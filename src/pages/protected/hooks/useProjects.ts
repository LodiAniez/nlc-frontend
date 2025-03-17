import { defaultHeaders, Endpoints } from "@constants/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectAtom, fetchProjectsAtom } from "@store/projects/projects.store";
import { Project } from "@store/projects/projects.types";
import { authHeader, catchError, throwIfFailed } from "@utils/methods";
import { useAtom } from "jotai";
import { useState, useEffect, startTransition } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  description: yup.string(),
});

export const useProjects = () => {
  const [modalTitle, setModalTitle] = useState("Add Project");
  const [btnLabel, setBtnLabel] = useState("Add");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projects, setProjects] = useAtom(projectAtom);
  const [, fetchProjects] = useAtom(fetchProjectsAtom);

  const methods = useForm<Project>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: Project) => {
    const isEdit = data.id;
    const endpoint = isEdit
      ? `${Endpoints.Project.Edit}/${data.id}`
      : Endpoints.Project.Create;
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

      const response: Project = await request.json();

      throwIfFailed({
        request,
        response,
      });

      const updateList = (project: Project) => {
        if (project.id === data.id) {
          project.description = response.description;
          project.name = response.name;
        }

        return project;
      };

      setProjects(isEdit ? projects.map(updateList) : [...projects, response]);
      setIsModalOpen(false);
      reset();
    } catch (e) {
      const err = catchError(e);
      alert(err);
    }
  };

  const handleAdd = () => {
    setModalTitle("Add Project");
    setBtnLabel("Add");
    methods.reset({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setModalTitle("Edit Project");
    setBtnLabel("Edit");
    methods.reset(project);
    setIsModalOpen(true);
  };
  const handleDelete = async (project: Project) => {
    try {
      const isConfirmed = confirm(
        "Are you sure you want to delete this record? All associated service orders will also be deleted."
      );

      if (isConfirmed) {
        const request = await fetch(
          `${Endpoints.Project.Delete}/${project.id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              ...defaultHeaders,
              ...authHeader(),
            },
          }
        );

        const response: Pick<Project, "id"> = await request.json();

        throwIfFailed({
          request,
          response,
        });

        setProjects(projects.filter((project) => project.id !== response.id));
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
      fetchProjects();
    });
  }, [fetchProjects]);

  return {
    handleDelete,
    handleAdd,
    handleEdit,
    handleSubmit: handleSubmit(onSubmit),
    isModalOpen,
    methods,
    toggleModal,
    projects,
    modalTitle,
    btnLabel,
  };
};
