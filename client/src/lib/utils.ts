export const dataFridClassNames = "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";


// class="MuiDataGrid-filler css-xv98vr"
// MuiDataGrid-root MuiDataGrid-root--densityStandard MuiDataGrid-withBorderColor border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200 MuiDataGridVariables-3851315942 css-js8qpo-MuiDataGrid-root
export const dataGridSxStyles = (isDarkMode: boolean) => {

      const textColor = "#e5e7eb"; // Tailwind: text-gray-200
  const bgPrimary = "#1d1f21"; // Tailwind: dark-secondary
  const bgSecondary = "#3b3d40"; // Tailwind: dark-tertiary
  const borderColor = "#2d3135"; // Tailwind: stroke-dark
  const mutedText = "#a3a3a3"; // Tailwind: text-neutral-500
   return {
    // Grid Root
    "&.MuiDataGrid-root": {
      backgroundColor: isDarkMode ? bgPrimary : "white",
      color: isDarkMode ? textColor : "black",
      borderColor: isDarkMode ? borderColor : "#e5e7eb",
    },

    // Column Headers
    "& .MuiDataGrid-columnHeaders": {
      color: isDarkMode ? textColor : undefined,
      backgroundColor: isDarkMode ? bgPrimary : "white",
      borderBottom: `1px solid ${isDarkMode ? borderColor : "#e5e7eb"}`,
    },

    // Header cells
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: isDarkMode ? bgPrimary : "white",
      color: isDarkMode ? textColor : undefined,
    },

    // Cells
    "& .MuiDataGrid-cell": {
      backgroundColor: isDarkMode ? bgSecondary : "white",
      color: isDarkMode ? textColor : undefined,
      borderBottom: `1px solid ${isDarkMode ? borderColor : "#e5e7eb"}`,
    },

    // Row background
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? borderColor : "#e5e7eb"}`,
      backgroundColor: isDarkMode ? bgSecondary : "white",
      color: isDarkMode ? textColor : undefined,
    },

    // Hover state
    "& .MuiDataGrid-row:hover": {
      backgroundColor: isDarkMode ? "#2b2e31" : "#f3f4f6", // hover color
    },

    // Pagination controls
    "& .MuiTablePagination-root": {
      color: isDarkMode ? mutedText : undefined,
    },
    "& .MuiSelect-icon": {
      color: isDarkMode ? mutedText : undefined,
    },
    "& .MuiTablePagination-selectIcon": {
      color: isDarkMode ? mutedText : undefined,
    },

    // Icons (like sorting/filter icons)
    "& .MuiSvgIcon-root": {
      color: isDarkMode ? mutedText : undefined,
    },
    // Toolbar buttons
    "& .MuiIconButton-root": {
      color: isDarkMode ? mutedText : undefined,
    },

    // Focus outlines and selected row
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor: isDarkMode ? "#3b3d40" : "#e5e7eb",
    },

    "& .MuiDataGrid-filler": {
         backgroundColor: isDarkMode ? "#1d1f21" : "#ffffff"
    }
  };
};