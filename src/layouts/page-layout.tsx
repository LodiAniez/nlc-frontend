import Button from "@components/button";
import Modal from "@components/modal";
import Table from "@components/table";

type Props<T> = {
  children: React.ReactNode;
  handleAdd: () => void;
  isModalOpen: boolean;
  modalTitle: string;
  tableColumns: { header: string; accessor: keyof T }[];
  datableData: T[];
  handleEdit?: (item: T) => void;
  handleDelete?: (item: T) => void;
};

const PageLayout = <T,>({
  children,
  datableData,
  handleAdd,
  isModalOpen,
  modalTitle,
  tableColumns,
  handleDelete,
  handleEdit,
}: Props<T>) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Projects</h1>
        <Button onClick={handleAdd}>Add Project</Button>
      </div>
      <Modal isOpen={isModalOpen} title={modalTitle}>
        {children}
      </Modal>
      <Table
        columns={tableColumns}
        data={datableData.map((data, index) => ({
          ...data,
          index: index + 1,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PageLayout;
