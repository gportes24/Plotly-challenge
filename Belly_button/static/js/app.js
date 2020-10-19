function drops(menus) {
    d3.json('./data/samples.json').then(function (data) {
        console.log(data);

        let sample = Object.values(data.samples);
        console.log(sample);

        let sample_filter = data.samples.filter(s => s.id.toString() === s.id)[0];
        console.log(sample_filter)

        let samplevalues = sample_filter.sample_values.slice(0, 10).reverse();
        console.log(samplevalues)
        let topOtu = sample_filter.otu_ids.slice(0, 10).reverse();
        console.log(topOtu)

        let otu_vals = topOtu.map(o => "OTU " + o)
        console.log(`OTU IDS: ${topOtu}`)
        let labels = sample_filter.otu_labels.slice(0, 10).reverse();
        console.log(labels)

        let trace = {
            x: samplevalues,
            y: otu_vals,
            type: 'bar',
            orientation: 'h',
            text: labels

        };
        var data = [trace];
        var layout = {
            title: "Top 10 OTU"
        }
        Plotly.newPlot("bar", data, layout);

        let trace1 = {
            x: sample_filter.otu_ids,
            y: sample_filter.sample_values,
            text: sample_filter.otu_labels,
            mode: 'markers',

            marker: {
                color: sample_filter.otu_ids,
                size: sample_filter.sample_values
            },
        }
        let data1 = [trace1];
        var layout = {
            title: "OTU Sample"
        }
        Plotly.newPlot("bubble", data1, layout)
    })

    d3.json('./data/samples.json').then(function (data) {
        console.log(data)
        let meta = Object.values(data.metadata);
        console.log(meta)
        //let metadata =sample_data.otu_ids


        let meta_filter = meta.filter(s =>parseInt(menus) === s.id)[0];
        console.log(meta_filter)

        let demographic = d3.select("#sample-metadata");
        console.log(demographic)

        //clear demographic data before gettin new data
        demographic.html("");

        Object.entries(meta_filter).forEach(([key, value]) => {
            demographic.append('h5').text(`${key}: ${value}`);
        })
    })

}

function init() {

    //d3.selectAll("#selDataset").on("change", optionChanged);
    //function optionChanged(){
    let dropdown = d3.select("#selDataset");

    d3.json("./data/samples.json").then((data) => {
        console.log(data);
        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value")
            console.log(name)
        })
        
    })
    


}

init();
drops(940);
optionChanged = drops