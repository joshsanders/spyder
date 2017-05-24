$(document).ready(function() {

	$('.js-btn--addCol').on('click', function(addCol) {

		var targetRow = $('.js-varyColumns--row'),
	    	columns = targetRow.children('.grid__col'),
	    	newColumn = '<div class="grid__col"><div class="content"><span>.grid__col</span></div></div>',
	    	targetCode = $('.js-varyColumns--code'),
			newCode = '<div><span class="indent"></span>&lt;div class="grid__col"&gt;&lt;/div&gt;<br></div>';

	    if (columns.length >= 2 && columns.length != 12) {
	        targetRow.append(newColumn);
	        targetCode.children('.target').append(newCode);
	    }
	    // else if ($columns.length == 12) {
	    // 	// throw a warning here
	    // }
	});

	    
	$('.js-btn--removeCol').on('click', function(removeCol) {
		var targetRow = $('.js-varyColumns--row'),
	    	columns = targetRow.children('.grid__col'),

	    	targetCode = $('.js-varyColumns--code'),
			newCode = '<span class="indent"></span>&lt;div class="grid__col"&gt;&lt;/div&gt;<br>';

	    	// existingColumn = $('.grid__col');

		if (columns.length <= 12 && columns.length != 2) {
			// console.log('remove btn is clicked');

	        targetRow.children().last().remove();
	        targetCode.children('.target').children('div').last().remove();
	    }

	});



		// function moveButton(elem){
		//     var $selected = $('#selected');
		//     var $kids = $selected.children();
		//     if ($kids.length >= 3)
		//     {
		//         $kids.last().remove();
		//     }
		//     $(elem).detach().appendTo('#selected');
		// }



		// $( document.body ).on('click', function() {
		// 	$( document.body ).append( $( "<div>" ) );
		// 	var n = $( "div" ).length;
		// 	$( "span" ).text( "There are " + n + " divs." +
		// 	  "Click to add more.");
		// });
	





});