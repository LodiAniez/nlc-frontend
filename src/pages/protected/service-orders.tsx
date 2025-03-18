import Button from "@components/button";
import Input from "@components/input";
import Modal from "@components/modal";
import Table from "@components/table";

const ServiceOrders = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Service Order</h1>
        <Button>Add Service Order</Button>
      </div>
      <Modal isOpen={false} title={""}>
        {/*  {...methods} */}
        {/* <FormProvider> */}
        {/* onSubmit={handleSubmit} */}
        <form>
          <Input name="name" label="Project Name" />
          <Input name="description" label="Description" />
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button">Cancel</Button>
            <Button type="submit">{"btnLabel"}</Button>
          </div>
        </form>
        {/* </FormProvider> */}
      </Modal>
      <Table
        columns={[
          { header: "#", accessor: "index" },
          { header: "Name", accessor: "name" },
          { header: "Description", accessor: "description" },
        ]}
        data={[]}
      />
    </div>
  );
};

export default ServiceOrders;
