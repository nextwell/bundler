$(document).ready(function(){
	let step = 0;
	$('.custom-file-input').on('change', function() { 
		let fileName = $(this).val().split('\\').pop(); 
		$(this).next('.custom-file-control').addClass("selected").html(this.files.length + " files"); 
		    
	});

	$('.land').hide();
	$('.safepage').hide();
	$('.confirm').hide()

	$('.btn').click(function(){
		step++;
		if ( step == 1 ){
			$('.land').show();
			$('.safepage').hide();
			$('.preland').hide();
		}
		if ( step == 2 ){
			$('.land').hide();
			$('.safepage').show();
			$('.preland').hide();
		}
		if ( step == 3 ){
			$('.land').hide();
			$('.safepage').hide();
			$('.preland').hide();
			$('.confirm').show();
		}
	})


})