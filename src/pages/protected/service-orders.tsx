import Button from "@components/button";
import Input from "@components/input";
import { useServiceOrder } from "./hooks/useServiceOrders";
import { ServiceOrder } from "@store/service-order/service-order.types";
import PageLayout from "@layouts/page-layout";
import { FormProvider } from "react-hook-form";
import Select from "@components/select";

const ServiceOrders = () => {
  const {
    handleAdd,
    handleDelete,
    handleEdit,
    handleSubmit,
    isModalOpen,
    methods,
    toggleModal,
    modalTitle,
    btnLabel,
    serviceOrders,
    projects,
  } = useServiceOrder();

  return (
    <PageLayout<ServiceOrder>
      pageTitle="Service Orders"
      addBtnLabel="Add Service Order"
      tableData={serviceOrders}
      handleAdd={handleAdd}
      isModalOpen={isModalOpen}
      modalTitle={modalTitle}
      tableColumns={[
        { header: "#", accessor: "index" as keyof ServiceOrder },
        { header: "Name", accessor: "name" },
        { header: "Category", accessor: "category" },
        { header: "Description", accessor: "description" },
        { header: "Project", accessor: "project_name" },
        { header: "Approved", accessor: "is_approved" },
      ]}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Input name="name" label="Service Order Name" />
          <Input name="category" label="Category" />
          <Input name="description" label="Description" />
          <Select
            name="project_id"
            label="Project"
            defaultValue={projects.length ? projects[0].id : undefined}
            options={projects.map((project) => ({
              value: project.id,
              label: project.name,
            }))}
          />
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

export default ServiceOrders;
