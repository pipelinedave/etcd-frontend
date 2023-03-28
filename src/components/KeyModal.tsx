import React from 'react';

type KeyModalProps = {
    show: boolean;
    onHide: () => void;
    onSave: (key: string, value: string) => Promise<void>;
};

const KeyModal: React.FC<KeyModalProps> = ({ show, onHide, onSave }) => {
    const [key, setKey] = React.useState('');
    const [value, setValue] = React.useState('');

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        onSave(key, value);
    };

    return show ? (
        <div>
            <h2>Create a new key-value pair</h2>
            <form onSubmit={handleSave}>
                <div>
                    <label htmlFor="key">Key:</label>
                    <input
                        type="text"
                        id="key"
                        value={key}
                        onChange={(event) => setKey(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="value">Value:</label>
                    <input
                        type="text"
                        id="value"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onHide}>
                    Cancel
                </button>
            </form>
        </div>
    ) : null;
};

export default KeyModal;
