const fetchAsync = async() => {
    const response = await fetch('https://andmed.stat.ee/api/v1/et/stat/KE20'),
        keyValues = await response.json()
    return keyValues
}

var response2 = null;
//var response3 = null;

$(document).ready(function() {

	response2 = null;

	$.ajax({
		type: "POST",
		async: false,
		url: "https://andmed.stat.ee/api/v1/et/stat/KE20",
		data: JSON.stringify({
			"query": [{
				"code": "Aasta",
				"selection": {
					"filter": 'item',
					"values": ["2020"]
				}
			},{       
				"code": "Näitaja",
				"selection": {
					"filter": "item",
					"values": ["1"]
				}
			},{       
				"code": "Energia liik",
				"selection": {
					"filter": "item",
					"values": ["1"]
				}
			}],
			"response": {
				"format": "json-stat2"
			}
		}),
		dataType: "json",
		success: function(response) {
			response2 = response;
		}
	});
	return response2;
});


fetchAsync().then(keyValues => {

	const data = {
		labels: keyValues.variables[1].valueTexts,
		datasets: [{
			borderColor: 'rgb(255, 99, 132)',
			data: response2.value,
			borderWidth: 5,
			label: '2020',
		}]
	};
	

	const plugin = {
		id: 'custom_canvas_background_color',
		beforeDraw: (chart) => {
		  const ctx = chart.canvas.getContext('2d');
		  ctx.save();
		  ctx.globalCompositeOperation = 'destination-over';
		  ctx.fillStyle = 'lightgray';
		  ctx.fillRect(0, 0, chart.width, chart.height);
		  ctx.restore();
		}
	  };


	const config = {
		type: 'line',
		data: data,
		plugins: [plugin],
		options: {
			scales: {
				y: {
					display: true,
        			title: {
          			display: true,
          			text: 'GWh',
          			font: {
            			size: 14,
            			style: 'normal',
            			lineHeight: 1.2
          				},
          		padding: {top: 30, left: 0, right: 0, bottom: 0}
        			}
				}
			},
			plugins: {
			  legend: {
				  position: 'bottom',
				  	align: 'center',
					  					  
					  labels: {
						  
						boxWidth: 20,
						usePointStyle: true,
						legendText: "2005",
					}
			  	},
						
				title: { 
				display: true,
				text: 'Elektrienergia tootmine',
				position: 'top',
				align: 'center',
				padding: {
					top: 20,
					bottom: 30,
				},
				font : {
					size: 20,
					
				}
			},
		}
	}
};
			
	
	const myChart = new Chart(
		document.getElementById('myChart'),
		config
	);
});