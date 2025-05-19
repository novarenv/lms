// Layout.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelRow {
  [key: string]: string;
}

const CourseTable: React.FC = () => {
  const [data, setData] = useState<ExcelRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryString = event.target?.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

        // Extract column headers
        if (jsonData.length > 0) {
          setColumns(Object.keys(jsonData[0]));
        }

        setData(jsonData);
        setCurrentPage(1); // Reset to first page when new file is loaded
      } catch (error) {
        console.error('Error parsing Excel file:', error);
      }
    };

    reader.readAsBinaryString(file);
  };

  // Calculate pagination values
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle rows per page change
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  return (
    <>
      <a>Course Table</a>
      <h2>Excel File Viewer with Pagination</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="file-input"
      />

      {data.length > 0 ? (
        <>
          <div className="table-container">
            <table className="excel-table">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>{row[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <div className="rows-per-page">
              <span>Rows per page:</span>
              <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Upload an Excel file to view data</p>
      )}
    </>
  );
}

export default CourseTable;