import { FormProvider } from "react-hook-form";
import Input from "@components/input";
import Button from "@components/button";
import Table from "@components/table";
import Modal from "@components/modal";
import { useProjects } from "./hooks/useProjects";

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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Projects</h1>
        <Button onClick={handleAdd}>Add Project</Button>
      </div>
      <Modal isOpen={isModalOpen} title={modalTitle}>
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
      </Modal>
      <Table
        columns={[
          { header: "#", accessor: "index" },
          { header: "Name", accessor: "name" },
          { header: "Description", accessor: "description" },
        ]}
        data={projects.map((project, index) => ({
          ...project,
          index: index + 1,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Projects;
