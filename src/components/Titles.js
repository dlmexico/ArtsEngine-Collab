import React from 'react';

function Titles(props) {
    const { headers } = props;

    return (
        headers.map((title) => {
            return (
                <th className={title}>
                    <td>{title}</td>
                </th>
            )
        })
    )
}

export default Titles;