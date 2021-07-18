import React, { useState, useEffect } from 'react';

function Label({label, onChange}) {
    const [input, setInput] = useState(label);

    useEffect(() => onChange({label: input}), [input, onChange])

    return (
        <form className="Label">
            <input 
                type="text"
                value={input}
                className="AlarmLabel"
                onChange={(e) => setInput(e.target.value)}
            />
        </form>
    )
}

export default Label