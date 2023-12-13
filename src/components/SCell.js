import React, { useState } from "react";

const SCell = ({ rowId, value, column, updateRowValue, path, idx }) => {
  const [cellValue, setCellValue] = useState(value);
  const renderByType = {
    string: (column, cellValue, handleOnChangeValue, rowId = null) => (
      <input
        key={rowId + column.id + idx}
        type={column.type}
        value={cellValue}
        width={column.width || "100px"}
        onChange={handleOnChangeValue}
        style={{
          maxWidth: column.width || "100px",
          marginLeft: path.length * 14,
        }}
      />
    ),
    number: (column, cellValue, handleOnChangeValue, rowId = null) => (
      <input
        key={rowId + column.id + idx}
        type={column.type}
        value={cellValue}
        width={column.width || "100px"}
        onChange={handleOnChangeValue}
        style={{
          maxWidth: column.width || "100px",
          marginLeft: path.length * 14,
        }}
      />
    ),
    boolean: (column, cellValue, handleOnChangeValue, rowId = null) => (
      <select
        value={cellValue}
        width={column.width || "100px"}
        onChange={handleOnChangeValue}
        style={{
          maxWidth: column.width || "100px",
          marginLeft: path.length * 14,
        }}
      >
        <option>Yes</option>
        <option>No</option>
      </select>
    ),
  };

  const handleOnChangeValue = (e) => {
    const newValue = e.target.value;
    setCellValue(newValue);
    updateRowValue(rowId, column, newValue, path);
  };

  if (column.id === "remove-row") {
    return (
      <div className="remove-row-div">
        <i
          className="fa-regular fa-square-minus"
          onClick={() => updateRowValue(rowId, column, null, null)}
        ></i>
      </div>
    );
  }

  return (
    <>{renderByType[column.type](column, cellValue, handleOnChangeValue)} </>
  );
};

export default SCell;
