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
        MetaData.append('p').text(`${key} : ${value}`)
      });
      })
}

function PIE_Chart(data) {
	
    console.log(data);
	
    var labels = data.otu_ids.slice(0,10);
    var values = data.sample_values.slice(0,10);
    var hovertext = data.otu_labels.slice(0,10);

    var trace = [{
      values : values,
      labels : labels,
      type : "pie",
	  marker: {line: {width: 1.5}},
      textposition: "inside",
      hovertext : hovertext,
	  hoverlabel: {
		bordercolor: 'black',
		font: {
		  family: 'Lato',
		  size: 17
		}
	  },
	 textfont: {
		family: 'Lato',
		color: 'white',
		size: 17
	  }
    }];

    var layout = {
        title: '<b> Belly Button Biodiversity ~ Pie Chart </b>',
		height: 500,
		width: 500
    };

    Plotly.newPlot('pie', trace , layout, {responsive: true});
}


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
      color: markercolors,
    },
    text: textvalues
  }];

  var layout ={
    title:"<b> Belly Button Biodiversity ~ Bubble Chart </b>",
    xaxis: {
      title: 'OTU ID',
    },
    yaxis: {
      title: 'Sample Value'
    },
	height: 500,
    width:1000
  };

  Plotly.newPlot('bubble', trace, layout, {responsive: true});
}



function Build_Charts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
	
    d3.json(`/samples/${sample}`).then( data =>{
      // ## Pie Chart ##
      PIE_Chart(data);
      // ## Bubble Chart ##
      Bubble_Chart(data);
    });
	

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
