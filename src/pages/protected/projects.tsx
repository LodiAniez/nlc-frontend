import { FormProvider } from "react-hook-form";
import Input from "@components/input";
import Button from "@components/button";
import { useProjects } from "./hooks/useProjects";
import PageLayout from "@layouts/page-layout";
import { Project } from "@store/projects/projects.types";

const Projects = () => {
  const {
    handleAdd,
    handleDelete,
    handleEdit,
    handleSubmit,
    isModalOpen,
    methods,
    toggleModal,
    projects,
    modalTitle,
    btnLabel,
  } = useProjects();

  return (
    <PageLayout<Project>
      pageTitle="Projects"
      addBtnLabel="Add Project"
      tableData={projects}
      handleAdd={handleAdd}
      isModalOpen={isModalOpen}
      modalTitle={modalTitle}
      tableColumns={[
        { header: "#", accessor: "index" as keyof Project },
        { header: "Name", accessor: "name" },
        { header: "Description", accessor: "description" },
      ]}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Input name="name" label="Project Name" />
          <Input name="description" label="Description" />
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" onClick={toggleModal}>
              Cancel
            </Button>
            <Button type="submit">{btnLabel}</Button>
          </div>
        </form>
      </FormProvider>
    </PageLayout>
  );
};

export default Projects;
