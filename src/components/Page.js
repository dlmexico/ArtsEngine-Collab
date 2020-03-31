import React from 'react';
import Papa from 'papaparse';

class Page extends React.Component {
    constructor(props) {
        super(props);

        // Initialize mutable states
        this.state = {
            csvfile: undefined,
            allCourses: undefined,
            isFetching: false,
            currFilterType: "",
            currFilterValue: "",
        }

        this.filesInput = React.createRef();
        this.handleUpload = this.handleUpload.bind(this);
        this.importCSV = this.importCSV.bind(this);
        this.updateData = this.updateData.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.filter2 = this.filter2.bind(this);
    }

    // handle uploaded csv file
    handleUpload(event) {
        event.preventDefault();
        console.log("What's the file?")
        console.log(event.target.files[0])
        this.setState({
            csvfile: event.target.files[0]
        });
    } 

    importCSV() {
        console.log("Pressed button:")
        console.log(this.state.csvfile)
        const {csvfile} = this.state;
        Papa.parse(csvfile, {
          complete: this.updateData,
          header: true,
        });
        document.getElementById("uploadstatus").innerHTML = "Uploaded and Processed!";
    }

    updateData(parsedFile) {
        console.log("Inside updateData:")
        var data = parsedFile.data;
        this.setState({
            allCourses: data,
        })
        console.log(data);
        console.log(data[0]);
        // var unparsed = Papa.unparse(data);
        // console.log(unparsed)
      }

    // Displays the courses on webpage
    // filter = () => {
    //     console.log("In filter:")
    //     var items = [];
    //     const { allCourses } = this.state;
    //     for (let i = 0; i < allCourses.length; i += 1) {
    //         // console.log(allCourses[i]["Units"])
    //         if (allCourses[i]["Subject"] === "Architecture (ARCH)") {
    //             items.push(allCourses[i]);
    //         }
    //     }
    //     var output = ""
    //     for (let i = 0; i < items.length; i += 1) {
    //         for (let key in items[i]) {
    //             console.log(key)
    //             output += key
    //             output += ": "
    //             output += (key, items[i][key]);
    //             output += " "
    //         }
    //         output += "\n"
    //     }
    //     console.log(items[0]);
    //     document.getElementById("courses").innerHTML = output;
    //     console.log(items)
    // }

    handleFilterChange(event) {
        const target = event.target;
        if (target.name === 'filtertype') {
            this.setState({currFilterType: target.value})
        } else {
            this.setState({currFilterValue: target.value});
        }
    }

    // Displays the current courses on the webpage
    filter2(event) {
        event.preventDefault();
        console.log("In filter2")
        console.log(this.state)
        var items = [];
        const { allCourses } = this.state;
        const { currFilterType } = this.state;
        const { currFilterValue } = this.state;

        // Display ONLY if there's a value
        if (currFilterValue !== "") {
            for (let i = 0; i < allCourses.length; i += 1) {
                if (allCourses[i][currFilterType] === currFilterValue) {
                    items.push(allCourses[i]);
                }
            }
            var output = ""
            for (let i = 0; i < items.length; i += 1) {
                for (let key in items[i]) {
                    output += key
                    output += ": "
                    output += items[i][key];
                    output += ", "
                }
                output += "\n"
            }
            console.log(items[0]);
            document.getElementById("courses").innerHTML = output;
            console.log(items)
        }
    }

    render() {
        console.log("Rendering:");
        console.log(this.state.csvfile);

        return (
            <div className="app">
                <h3>Import CSV File</h3>
                <input
                className="csv-input"
                type="file"
                ref={input => {
                    this.filesInput = input;
                }}
                name="file"
                placeholder={null}
                onChange={this.handleUpload}
                />
                <button onClick={this.importCSV}> Upload now!</button>
                <pre id="uploadstatus"></pre>
                <p />
                <h3>Enter filter</h3>
                <form onSubmit={this.filter2}>
                    <label>
                        Filter by: 
                        <select name="filtertype" value={this.state.currFilterType} onChange={this.handleFilterChange}>
                            <option defaultValue="Default" disabled>Choose a filter</option>
                            <option value="Subject">Subject</option>
                            <option value="Class Nbr">Class Number</option>
                            <option value="Course Title">Course Title</option>
                            <option value="Units">Credits</option>
                            <option value="Location">Location</option>
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