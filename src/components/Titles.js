import React from 'react';

function Titles(props) {
    const { headers } = props;

    // Displays the headers
    return (
        headers.map((title) => {
            return (
                <th className={title}>{title}</th>
            )
        })
    )
}

export default Titles;