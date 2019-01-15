/*http://api.openweathermap.org/data/2.5/forecast?ID=2172797&APPID=341e5a65bb0b94b49e144f80fe68892d.json
*/
function getWeather() {
	var api = '';
	var lat = 0;
	var long = 0;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			lat = position.coords.latitude;
			long = position.coords.longitude;
			api = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&APPID=341e5a65bb0b94b49e144f80fe68892d';

			var ourRequest = new XMLHttpRequest();
			ourRequest.open('GET',api);
			ourRequest.onload = function() {

				var data = JSON.parse(ourRequest.responseText);

				document.getElementById('location').innerHTML = data.city.name;


				var kelvin = Math.floor(data.list[0].main.temp - 273.15) ;
				document.getElementById('temp').innerHTML =  Math.floor(kelvin) + '°' 
				+ '<a onclick="change()" href="#"> C</a>' ;
				


				document.getElementById('state').innerHTML = data.list[1].weather[0].main;

				if (data.list[1].weather[0].main === 'Clouds') {
					document.getElementById('shape').innerHTML = 
					'<i style=" transform: translateX(26px); font-size: 60px;" class="fa fa-cloud" aria-hidden="true"></i> '
					+ '<i style="position: relative; transform: translateY(-20px);" class="fa fa-cloud animated infinite fadeOutLeft" aria-hidden="true"></i>';
				} else {
					document.getElementById('shape').innerHTML = '<i class="fa fa-sun-o animatede infinite rotateIn" aria-hidden="true"></i>';
				}
			}

			ourRequest.send();
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function change() {

	var num = parseInt(document.getElementById('temp').innerHTML[0] + document.getElementById('temp').innerHTML[1]);

	if (num < 40) {
		document.getElementById('temp').innerHTML =  Math.round((num *  9/5) + 32) + '°' + 
		'<a onclick="change()" href="#"> F</a>' ;		
	} if (num >= 40){
		document.getElementById('temp').innerHTML =  Math.round((num - 32 )*  5/9) + '°' + 
		'<a onclick="change()" href="#"> C</a>' ;
	}


}