// Call the dataTables jQuery plugin
$(document).ready(function() {
  var table = $('#dataTable').DataTable();

  // Pendo Track Event once the user stops typing in the table's search box. search.dt also
  // fires on sort/page redraws, so only a changed, non-empty search term is reported.
  var lastSearchTerm = '';
  var searchTimer = null;
  table.on('search.dt', function() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function() {
      var term = $.trim(table.search());
      if (term === lastSearchTerm) return;
      lastSearchTerm = term;
      if (!term || !window.pendo || typeof window.pendo.track !== 'function') return;
      var order = table.order()[0] || [];
      window.pendo.track('data_table_searched', {
        search_term: term.substring(0, 100),
        results_count: table.rows({ search: 'applied' }).count(),
        total_rows: table.rows().count(),
        page_length: table.page.len(),
        sort_column: order.length ? $.trim($(table.column(order[0]).header()).text()) : null,
        sort_direction: order[1] || null
      });
    }, 750);
  });
});
