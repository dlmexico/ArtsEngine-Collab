import React from 'react';
import DataRow from './DataRow';

function Data(props) {
    const { results } = props;

    // console.log("Inside Data");
    // console.log("Results length = " + results.length);

    let returnData = results.map((obj, index) => {
        let key = Object.keys(obj);
        console.log("Key = " + key);
        console.log("value = " + obj[key[7]]);
        return (
            <tr>
                <DataRow rowData={obj} headers={key} />
            </tr>
        );
    });

    return returnData;
}

export default Data;