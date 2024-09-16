import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

const ReactTable = ({
  columns,
  data = [],
  headerProps = {},
  headerCellProps = {},
  bodyProps = {},
  className = "",
  rowDataProps = { className: "" },
  cellProps = { className: "" },
  size,
  variant,
  noDataText = "No data available",
  ...restConfig
}) => {
  const tableConfig = {
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...restConfig,
  };

  const table = useReactTable(tableConfig);

  return (
    <div className="react-table-container relative h-[30vh] overflow-y-auto">
      <table className={className}>
        <thead {...headerProps}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  // className="sticky left-0"
                  {...header.column.columnDef?.meta}
                  {...headerCellProps}
                >
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
        <tbody {...bodyProps}>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 dark:text-white-a700"
              >
                {noDataText}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                {...rowDataProps}
                className={`striped: "dark:even:bg-white-a700", ${rowDataProps?.className}`}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`xs: "py-1 px-2", ${cellProps?.className} `}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export { ReactTable };
