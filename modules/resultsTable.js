const table = new Tabulator("#results", {
  index: "itemId",
  data: [], // initialise table with no data, pending scan results
  pagination: true,
  paginationSize: 10,
  layout: "fitColumns", //fit columns to width of table (optional)
  columns: [
    { title: "Name", field: "name" },
    { title: "URL", field: "url" },
    {
      title: "Response",
      field: "response",
    },
    {
      title: "Response Time",
      field: "responseTime",
    },
    {
      title: "Redirected",
      field: "redirect",
    },
    {
      title: "Error",
      field: "error",
    },
  ],
});

const download = document.getElementById("download");
download.style.display = "none";
download.addEventListener("click", function () {
  table.download("csv", "data.csv");
});

export { table };
