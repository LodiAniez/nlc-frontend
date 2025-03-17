import Button from "@components/button";
import { Suspense } from "react";

type Props<T> = {
  columns: { header: string; accessor: keyof T }[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
};

const Table = <T,>({ columns, data, onEdit, onDelete }: Props<T>) => {
  return (
    <Suspense fallback={<div className="text-center">Loading data...</div>}>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="py-2 px-4 border-b text-left">
                  {column.header}
                </th>
              ))}
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-2 px-4 border-b">
                      {String(item[column.accessor])}
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b flex space-x-2">
                    {onEdit && (
                      <Button onClick={() => onEdit(item)}>Edit</Button>
                    )}
                    {onDelete && (
                      <Button
                        className="bg-red-500"
                        onClick={() => onDelete(item)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-2">
                  No items to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};

export default Table;
