$(document).ready(function() {

	$('.js-btn--addCol').on('click', function(addCol) {

		var targetRow = $('.js-varyColumns--row'),
	    	columns = targetRow.children('.grid__col'),
	    	newColumn = '<div class="grid__col"><div class="content"><span>.grid__col</span></div></div>',
	    	targetCode = $('.js-varyColumns--code'),
			newCode = '<div><span class="indent"></span>&lt;div class="grid__col"&gt;&lt;/div&gt;<br></div>';

	    if (columns.length >= 2 && columns.length < 12) {
	        targetRow.append(newColumn);
	        targetCode.children('.target').append(newCode);
	    }

	    else if (columns.length == 12) {
	    	alert("While it's possible to add as many columns as you want, it is recommended to stick with 12 columns. If you want smaller divisions, you can always nest columns.");
	    }
	});

	    
	$('.js-btn--removeCol').on('click', function(removeCol) {

		var targetRow = $('.js-varyColumns--row'),
	    	columns = targetRow.children('.grid__col'),
	    	targetCode = $('.js-varyColumns--code'),
			newCode = '<span class="indent"></span>&lt;div class="grid__col"&gt;&lt;/div&gt;<br>';

		if (columns.length <= 12 && columns.length != 2) {
	        targetRow.children().last().remove();
	        targetCode.children('.target').children('div').last().remove();
	    }

	});

});