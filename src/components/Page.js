import React from 'react';
import Papa from 'papaparse';

class Page extends React.Component {
    constructor(props) {
        super(props);

        // Initialize mutable states
        this.state = {
            csvfile: undefined,
            allCourses: undefined,
            currFilterType: "Choose a filter",
            currFilterValue: "",
            hasSubmitted: false,
        }

        // Bind functions that use/change state variables
        this.handleUpload = this.handleUpload.bind(this);
        this.importCSV = this.importCSV.bind(this);
        this.updateData = this.updateData.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    }

    // Handle uploaded CSV file
    handleUpload(event) {
        event.preventDefault();
        console.log("What's the file?");
        console.log(event.target.files[0]);
        this.setState({
            csvfile: event.target.files[0]
        });
    } 

    // Save submitted CSV file and parses it
    importCSV() {
        console.log("Pressed button:");
        console.log(this.state.csvfile);
        const {csvfile} = this.state;
        Papa.parse(csvfile, {
          complete: this.updateData,
          header: true,
        });
        document.getElementById("uploadstatus").innerHTML = "Uploaded and Processed!";
        document.getElementById("courses").innerHTML = "";
    }

    // Cleans parsed data and saves to state
    updateData(parsedFile) {
        console.log("Inside updateData:");
        var data = parsedFile.data;

        // In each course, the last item had an empty string key and no value 
        // Deleting it
        for (let i = 0; i < data.length; i += 1) { 
            delete data[i][""];
        }

        this.setState({
            allCourses: data,
        })
        console.log(data);
        console.log(data[0]);
      }

    // Updates state with correct filter values
    handleFilterChange(event) {
        const target = event.target;
        if (target.name === 'filtertype') {
            this.setState({currFilterType: target.value});
        } else {
            this.setState({currFilterValue: target.value});
        }
    }

    // Displays the current courses on the webpage
    handleFilterSubmit(event) {
        event.preventDefault();
        console.log("In handleFilterSubmit");
        console.log(this.state);
        this.setState({hasSubmitted: true});
        var items = [];
        const { allCourses } = this.state;
        const { currFilterType } = this.state;
        const { currFilterValue } = this.state;

        // If a file has been uploaded
        if (allCourses !== undefined) {
            // Display ONLY if there's a value given
            if (currFilterValue !== "") {
                const regex = new RegExp(currFilterValue, "gi");
                // If there's a filter chosen, just iterate thru those
                if (currFilterType !== "Choose a filter") {
                    // Find all the courses with that regex
                    for (let i = 0; i < allCourses.length; i += 1) {
                        // Only check entries with defined values
                        if (allCourses[i][currFilterType] !== "") {
                            let val = allCourses[i][currFilterType].match(regex);
                            if (val != null) {
                                items.push(allCourses[i]);
                            }
                        }
                    }
                }
                // No filter chosen, iterate thru all courses and filters
                else {
                    for (let i = 0; i < allCourses.length; i += 1) {
                        for (let filter in allCourses[i]) {
                            // Only check entries with defined values
                            if (allCourses[i][filter] !== "") {
                                let val = allCourses[i][filter].match(regex);
                                if (val != null) {
                                    items.push(allCourses[i]);
                                }
                            }
                        }
                    }
                }
                // Output w/ better formatting and punctuation
                var output = "";
                for (let i = 0; i < items.length; i += 1) {
                    for (let key in items[i]) {
                        output += key;
                        output += ": ";
                        output += items[i][key];
                        output += ", ";
                    }
                    output += "\n";
                }
                // Writes result to the document
                document.getElementById("courses").innerHTML = output;
                console.log(items);
            }
        }
        // No file uploaded
        else {
            document.getElementById("courses").innerHTML = "No file uploaded";
        }
    }

    render() {
        console.log("Rendering:");
        console.log(this.state.csvfile);
        // const hasSubmitted = this.state.hasSubmitted;

        return (
            <div className="app">
                <h3>Import CSV File</h3>
                <input
                className="csv-input"
                type="file"
                name="file"
                onChange={this.handleUpload}
                accept=".csv"
                />
                <button onClick={this.importCSV}> Upload now!</button>
                <pre id="uploadstatus"></pre>
                <p />
                <h3>Enter filter</h3>
                <form onSubmit={this.handleFilterSubmit}>
                    <label>
                        Filter by: 
                        <select name="filtertype" value={this.state.currFilterType} onChange={this.handleFilterChange}>
                            <option defaultValue="Default">Choose a filter</option>
                            <option value="Subject">Subject</option>
                            <option value="Class Nbr">Class Number</option>
                            <option value="Course Title">Course Title</option>
                            <option value="Units">Credits</option>
                            <option value="Location">Location</option>
                            <option value="Keywords">Keywords</option>
                        </select>
                    </label>
                    <input type="text" name="filtervalue" value={this.state.currFilterValue} onChange={this.handleFilterChange}/>
                    <input type="submit" value="Submit" />
                </form>
                <br></br>
                <pre id="courses"></pre>
            </div>
        );
    }
}

export default Page;