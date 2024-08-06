import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../spinner/Spinner";

interface IDataGridProps {
  columns: any;
  data: any;
  loading: boolean;
  small?: boolean;
}

function DataGrid(props: IDataGridProps) {
  const { columns, data, loading, small } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {data && !loading && (
        <div
          className={`${
            small ? `max-h-[400px]` : "max-h-[calc(100vh_-_120px)]"
          } overflow-y-auto border border-tableBorderGrey border-collapse rounded-lg`}
        >
          <table className="w-full">
            <thead className="bg-tableHeaderGrey h-[56px] border-b border-tableBorderGrey sticky top-0 z-[1]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={uuidv4()} className="text-left h-[56px]">
                  {headerGroup.headers.map((header) => (
                    <th key={uuidv4()} className={`font-normal text-xs pl-2`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={uuidv4()}
                  className="h-14 border-b border-tableBorderGrey odd:bg-white even:bg-neutral-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={uuidv4()}
                      className="text-sm pl-2"
                      style={{
                        maxWidth: "300px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        paddingRight: "10px",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(!data || loading) && (
        <div className="flex justify-center items-center mt-20">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default DataGrid;
