import React from 'react'

const Select = ({ selected, setSelected, values }) => {
    return (
        <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
        >
            <option value="">-- Select State --</option>
            {values.map((data, index) => (
                <option key={index} value={data}>
                    {data}
                </option>
            ))}
        </select>
    )
}

export default Select