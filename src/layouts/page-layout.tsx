import Button from "@components/button";
import Modal from "@components/modal";
import Table from "@components/table";

type Props<T> = {
  children: React.ReactNode;
  handleAdd: () => void;
  isModalOpen: boolean;
  modalTitle: string;
  tableColumns: { header: string; accessor: keyof T }[];
  tableData: T[];
  handleEdit?: (item: T) => void;
  handleDelete?: (item: T) => void;
  pageTitle: string;
  addBtnLabel: string;
};

const PageLayout = <T,>({
  children,
  tableData,
  handleAdd,
  isModalOpen,
  modalTitle,
  tableColumns,
  handleDelete,
  handleEdit,
  addBtnLabel,
  pageTitle,
}: Props<T>) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">{pageTitle}</h1>
        <Button onClick={handleAdd}>{addBtnLabel}</Button>
      </div>
      <Modal isOpen={isModalOpen} title={modalTitle}>
        {children}
      </Modal>
      <Table
        columns={tableColumns}
        data={tableData.map((data, index) => ({
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
