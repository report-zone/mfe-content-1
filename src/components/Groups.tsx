import React from "react";
import data from "../data/groups.json";
import { useTable, useRowSelect } from "react-table";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import VisualizationContent from "./VisualizationContent";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef: any = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export default function Groups() {
  const [openVis, setOpenVis] = React.useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenVis(event.target.checked);
  };

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 50,
      width: 100,
      maxWidth: 600,
    }),
    []
  );
  const columns: any = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
        width: 60,
        disableResizing: true,
      },
      {
        Header: "Group Name",
        accessor: "name",
      },
      {
        Header: "Permission",
        accessor: "permission",
        width: 300,
      },
    ],
    []
  );
  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          disableResizing: true,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }: any) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: any) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div
      style={{
        marginLeft: "16px",
        display: "flex",
        height: "calc(100vh - 64px)",
        overflow: "auto",
        width: "100%",
      }}
    >
      <table
        {...getTableProps()}
        style={{ border: "solid 1px blue", flexGrow: 1 }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                    height: "40px",
                    width: column.width,
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "16px",
          width: openVis ? "calc(50% - 32px)" : "350px",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={<Switch onChange={onChange} />}
            label="Show Network Graph"
          />
        </FormGroup>
        {openVis ? (
          <React.Suspense fallback={<div>Loading Visualization...</div>}>
            <div style={{ width: "calc(100% - 16px)" }}>
              <VisualizationContent></VisualizationContent>
            </div>
          </React.Suspense>
        ) : null}
      </div>
    </div>
  );
}
