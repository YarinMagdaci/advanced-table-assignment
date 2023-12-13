import { useEffect, useState } from "react";
import "./App.css";
import STable from "./components/STable";
import { tableData } from "./data/DUMMY_DATA";

function App() {
  const [sortedColumns, setSortedColumns] = useState([]);
  const [initializedRows, setInitializedRows] = useState([]);
  useEffect(() => {
    const sColumns = tableData.columns.sort(
      (a, b) => a.ordinalNo - b.ordinalNo
    );

    sColumns.unshift({
      id: "remove-row",
      title: "",
      ordinalNo: 0,
      type: "",
      width: "120px",
    });
    const sRows = tableData.data;

    setSortedColumns(sColumns);
    setInitializedRows(sRows.map((sRow) => ({ ...sRow, "remove-row": false })));
  }, []);

  return (
    <div>
      <h1>My Table!</h1>
      <STable sortedColumns={sortedColumns} initializedRows={initializedRows} />
    </div>
  );
}

export default App;
