<?php 
	$mobile = false;
	include 'libs/MobileDetect.php';
	$detect = new Mobile_Detect();

	if ($detect->isMobile()) {
	    $mobile = true;
	}
?>


<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Welcome</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
	<div class="ddh-1">
		
	</div>
	<div class="ddh-2">
		
	</div>
	<div class="ddh-3">
		
	</div>


	<script>
		<?php 
			if ( $mobile == true ){
				echo "$('.ddh-2').hide();
					  $('.ddh-3').hide();";
			}
			else {
				echo "$('.ddh-1').hide();
					  $('.ddh-2').hide();
					  $('.ddh-3').show();";
			}
		?>
		$(document).ready(function(){
			
			
			$('a[href="#preland"]').click(function(){
				$('.ddh-1').hide();
				$('.ddh-2').show();
			})
			/*$('a[href="#land"]').click(function(){
				$('.ddh-1').hide();
				$('.ddh-2').hide();
				$('.ddh-3').show();
			})*/
		})
	</script>


</body>
</html>