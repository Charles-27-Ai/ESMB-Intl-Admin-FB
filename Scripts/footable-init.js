
$(window).on('load', function() {

	//$('demo-foo-addrow2').footable({ 
	//    calculateWidthOverride: function() {
	//        return {width: $(window).width()};
	//    }, 
	//    breakpoints: { phone: 992, tablet: 2048}
	//});

	// Row Toggler
	// -----------------------------------------------------------------
	$('#demo-foo-row-toggler').footable();

	// Accordion
	// -----------------------------------------------------------------
	$('#demo-foo-accordion').footable().on('footable_row_expanded', function(e) {
		$('#demo-foo-accordion tbody tr.footable-detail-show').not(e.row).each(function() {
			$('#demo-foo-accordion').data('footable').toggleDetail(this);
		});

	});

	// Pagination
	// -----------------------------------------------------------------
    $('#demo-foo-addrow2').footable();
    //$('#demo-foo-addrow2').footable({
    //    "columns": [{
    //            "sorted": true,
    //            "direction": "DESC"
    //    }]
    //});
	$('#demo-show-entries').change(function (e) {
		e.preventDefault();
		var pageSize = $(this).val();
		$('#demo-foo-addrow2').data('page-size', pageSize);
		$('#demo-foo-addrow2').trigger('footable_initialized');
	});

    $("#author-table").footable();
    $('#author-show-entries').change(function (e) {
        e.preventDefault();
        var pageSize = $(this).val();
        $('#author-table').data('page-size', pageSize);
        $('#author-table').trigger('footable_initialized');
    });

	// Filtering
	// -----------------------------------------------------------------
	var filtering = $('#demo-foo-filtering');
	filtering.footable().on('footable_filtering', function (e) {
		var selected = $('#demo-foo-filter-status').find(':selected').val();
		e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected : selected;
		e.clear = !e.filter;
	});

	// Filter status
	$('#demo-foo-filter-status').change(function (e) {
		e.preventDefault();
		filtering.trigger('footable_filter', {filter: $(this).val()});
	});

	// Search input
	$('#demo-foo-search').on('input', function (e) {
		e.preventDefault();
		filtering.trigger('footable_filter', {filter: $(this).val()});
	});



	// Search input
    var addrow = $('#demo-foo-addrow2');

	$('#demo-input-search2').on('input', function (e) {
		e.preventDefault();
		addrow.trigger('footable_filter', {filter: $(this).val()});
	});

    var author = $('#author-table');

    $('#author-search').on('input', function (e) {
        e.preventDefault();
        author.trigger('footable_filter', {filter: $(this).val()});
    });
	



	////Add & Remove Row
	//var addrow = $('#demo-foo-addrow');
	//addrow.footable().on('click', '.delete-row-btn', function() {

	//	//get the footable object
	//	var footable = addrow.data('footable');

	//	//get the row we are wanting to delete
	//	var row = $(this).parents('tr:first');

	//	//delete the row
	//	footable.removeRow(row);
	//});
	
	
	//addrow.footable().on('click', '.delete-row-btn', function() {

	//	//get the footable object
	//	var footable = addrow.data('footable');

	//	//get the row we are wanting to delete
	//	var row = $(this).parents('tr:first');

	//	//delete the row
	//	footable.removeRow(row);
	//});

});
