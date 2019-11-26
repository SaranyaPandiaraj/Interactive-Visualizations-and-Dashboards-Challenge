// Belly Button Biodiversity


// Metadata Selector Function 

function Build_Metadata(sample) {

    // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
	var MetaData = d3.select('#sample-metadata');

	d3.json(`/metadata/${sample}`).then( data =>{
      MetaData.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

      console.log(Object.entries(data));
      Object.entries(data).forEach(([key,value]) =>{
        MetaData.append('b').text(`${key} : `)
		MetaData.append('i').text(` ${value}`)
		MetaData.append('p')
      });
      })
}

// Building Pie Chart Function

function PIE_Chart(data) {
		
    var labels = data.otu_ids.slice(0,10);
    var values = data.sample_values.slice(0,10);
    var hovertext = data.otu_labels.slice(0,10);

    var trace = [{
      values : values,
      labels : labels,
      type : "pie",
	  marker: {line: {width: 1, color:'#006668'}, 
        colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
        },
		
	
      textposition: "inside",
      hovertext : hovertext,
	  hoverlabel: {
		bordercolor: 'black',
		font: {
		  family: 'Comic Sans MS',
		  size: 17
		}
	  },
	 textfont: {
		family: 'Comic Sans MS',
		color: 'black',
		size: 15,
	  },
	  textinfo: "percent"
	 
    }];

    var layout = {
        title: '<b> Belly Button ~ Pie Chart </b>',
		height: 450,
		width: 450,
		showlegend: true,
		font: {
			family: 'Comic Sans MS',
			size: 16,
			color: '#006668'
		  },
		paper_bgcolor : '#dbe9e9',
		plot_bgcolor: '#dbe9e9',
		position:'center'
    };

    Plotly.newPlot('pie', trace , layout, {responsive: true});
}

// Building Bubble Chart Function

function Bubble_Chart(data) {
	
  var x = data.otu_ids;
  var y = data.sample_values;
  var markersize = data.sample_values;
  var markercolors = data.otu_ids;
  var textvalues = data.otu_labels;

  var trace =[{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: markersize,
      color: markercolors
    },
    text: textvalues,
  }];

  var layout ={
    title:"<b> Belly Button ~ Bubble Chart </b>",
    xaxis: {
      title: '<b> OTU ID </b>',
    },
    yaxis: {
      title: '<b> Sample Value </b>'
    },
	height: 500,
    width:945,
	font: {
			family: 'Comic Sans MS',
			size: 16,
			color: '#006668'
		  },
	paper_bgcolor : '#dbe9e9',
    plot_bgcolor: '#dbe9e9',
	position:'center'
  };

  Plotly.newPlot('bubble', trace, layout, {responsive: true});
}

// Bonus Part ~ Building Gauge Chart Function
// Reference : https://code.tutsplus.com/tutorials/create-interactive-charts-using-plotlyjs-pie-and-gauge-charts--cms-29216
// https://community.plot.ly/t/plotly-js-gauge-pie-chart-data-order/8686

function Guage_Chart(data) {
	
  console.log(data);
  
  var degree = parseInt(data.WFREQ) * (180/10);

  var level = degree;

  var degrees = 180 - level,
       radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

 
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
       pathX = String(x),
       space = ' ',
       pathY = String(y),
       pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var trace = [{ type: 'scatter',
     x: [0], y:[0],
      marker: {size: 27, color:'870000'},
      showlegend: false,
      name: 'WASH FREQ',
      text: data.WFREQ,
      hoverinfo: 'text+name'},
    { values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
    textinfo: 'text',
    textposition:'inside',
    textfont:{
      size : 16,
      },
    marker: {colors:['rgba(6, 51, 0, .5)', 'rgba(9, 77, 0, .5)', 
                           'rgba(12, 102, 0 ,.5)', 'rgba(14, 127, 0, .5)',
                           'rgba(110, 154, 22, .5)','rgba(170, 202, 42, .5)', 
                           'rgba(202, 209, 95, .5)','rgba(210, 206, 145, .5)', 
                           'rgba(232, 226, 202, .5)','rgba(255, 255, 255, 0)'
                    ]},
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],
    hoverinfo: 'text',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '870000',
        line: {
          color: '870000'
        }
      }],

    title: '<b> Belly Button Washing Frequency</b> <br>Scrub Per Week ',
    xaxis: {zeroline:false, showticklabels:false,showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,showgrid: false, range: [-1, 1]},
	font: {
			family: 'Comic Sans MS',
			size: 16,
			color: '#006668'
		  },
    paper_bgcolor : '#dbe9e9',
    plot_bgcolor: '#dbe9e9',
	height: 450,
	width: 450,	
  };

  Plotly.newPlot('gauge', trace, layout, {responsive: true});
}

// Function to Build Charts which calls the Pie, Bubble & Guage Chart Function

function Build_Charts(sample) {

	
    d3.json(`/samples/${sample}`).then( data =>{
      // ## Pie Chart ##
      PIE_Chart(data);
      // ## Bubble Chart ##
      Bubble_Chart(data);
    });
	
	d3.json(`/wfreq/${sample}`).then ( wreq_data =>
      // ## Gauge Chart ##
      Guage_Chart(wreq_data)
    );
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    Build_Charts(firstSample);
    Build_Metadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  Build_Charts(newSample);
  Build_Metadata(newSample);
}

// Initialize the dashboard
init();
