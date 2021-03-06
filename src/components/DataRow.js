import React from 'react';

function DataRow(props) {
    const { rowData } = props;
    const { headers } = props;

    // console.log("Inside DataRow");
    // console.log("rowData = " + rowData);
    // console.log("headers = " + headers);
    // headers.map((title) => {
    //     console.log("Title = " + title);
    //     console.log("rowData[title] = " + rowData[title]);
    // })

    // Loop through the rowData and enter data according to col key
    return (
        headers.map((title) => {
            return (
                <td>{rowData[title]}</td>
            )
        })
    )
}

export default DataRow;