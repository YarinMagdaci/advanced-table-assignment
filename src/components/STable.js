import React, { useEffect, useState } from "react";
import SCell from "./SCell";

const STable = ({ sortedColumns, initializedRows }) => {
  const [columns, setColumns] = useState(sortedColumns);
  const [rows, setRows] = useState(initializedRows);

  // for the filtering columns logic we have created map which is a state
  // every column user wants to see it's id is set to true, else false
  const [columnsVisibility, setColumnsVisibility] = useState(new Map());

  // handling the removal of rows
  const handleOnRemoveRow = (rowId) => {
    setRows((prevRows) =>
      [...prevRows].filter((prevRow) => prevRow.id !== rowId)
    );
  };
  // event handler to toggle on/off the column, works same logic you want to show / unshow a folder in vs-code
  const handleOnToggleColumn = (colIdx) => {
    setColumnsVisibility((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(colIdx, !prevMap.get(colIdx));
      return newMap;
    });
  };

  // useEffect will be called on the beginning because we pass an array of columns and we want to sort them before
  // we actually use them in this component by the ordinalNo, so we need to make sure this triggers re-render and update
  // the actual columns we are intending to render here
  useEffect(() => {
    setColumns([...sortedColumns]);
    setRows([...initializedRows]);
    setColumnsVisibility(
      new Map([...sortedColumns].map((col) => [col.id, true]))
    );
  }, [sortedColumns, initializedRows]);

  // event handler to changes on rows which are just by editing the cell contains the data.
  // uses updateNestedField to "track" down the actual field it needs to update using 'path' array
  const updateRowValue = (rowId, col, newValue, path) => {
    if (col.id === "remove-row") {
      handleOnRemoveRow(rowId);
      return;
    }
    if (col.type === "boolean") {
      newValue = newValue === "Yes" ? true : false;
    }
    setRows((prevRows) =>
      prevRows.map((prevRow) =>
        prevRow.id === rowId
          ? updateNestedField({ ...prevRow }, col.id, newValue, path)
          : prevRow
      )
    );
  };

  const updateNestedField = (row, colId, newValue, path) => {
    if (path.length === 0) {
      return { ...row, [colId]: newValue };
    }

    let currentObject = row[colId];
    for (let i = 0; i < path.length; i++) {
      const fieldName = path[i];
      if (i === path.length - 1) {
        currentObject[fieldName] = newValue;
      } else {
        currentObject = currentObject[fieldName];
      }
    }

    return { ...row };
  };

  // just to know if we need to display the remove line button because there could be no columns displayed at all.
  const columnsBeingRenderedCounter = Array.from(
    columnsVisibility.values()
  ).reduce((count, value) => (value === true ? count + 1 : count), 0);

  // renderCell is function that renders each type we feed her with.
  // if it's a primitive type we just put it in <input /> element [unless it's boolean and then we use select
  // with two options yes/no].
  // if it's an object we use recursive approach to track down all fields and values to present to the user
  const renderCell = (rowId, column, value, path = [], idx) => {
    if (value instanceof Date) {
      return renderCell(rowId, column, value.toLocaleDateString(), path, idx);
    }

    if (typeof value !== "object") {
      return (
        <SCell
          rowId={rowId}
          value={value}
          column={{ ...column, type: typeof value }}
          path={path}
          updateRowValue={updateRowValue}
          idx={idx}
        />
      );
    } else {
      return (
        <div key={rowId + column.id + path.length}>
          {Object.keys(value).map((fieldName, idx) => {
            const fieldVal = value[fieldName];
            return (
              <div className="object-div-container" key={fieldName}>
                <strong style={{ marginLeft: path.length * 14 }}>
                  {fieldName}:
                </strong>
                {renderCell(rowId, column, fieldVal, [...path, fieldName], idx)}
              </div>
            );
          })}
        </div>
      );
    }
  };
  const renderColumnHeaders = () => {
    return columns.map((col) => (
      <th key={col.id}>
        <div className="column-title-div">
          {col.id !== "remove-row" && (
            <i
              className="toggle-column-button"
              onClick={() => handleOnToggleColumn(col.id)}
            >
              {columnsVisibility.get(col.id) ? "🞃" : "🞂"}
            </i>
          )}
          {col.title}
        </div>
      </th>
    ));
  };
  const renderTableCells = () => {
    return rows.map((row) => (
      <tr key={row.id}>
        {columns.map((col) => {
          return columnsVisibility.get(col.id) ? (
            <td key={row.id + col.id}>
              {renderCell(row.id, col, row[col.id])}
            </td>
          ) : (
            <td width={col.width || "100px"}></td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      <table>
        <thead>
          <tr>{renderColumnHeaders()}</tr>
        </thead>
        <tbody>{columnsBeingRenderedCounter > 1 && renderTableCells()}</tbody>
      </table>
    </>
  );
};

export default STable;
