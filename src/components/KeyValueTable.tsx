import React from 'react';

export interface KeyValue {
    key: string;
    value: string;
}

type KeyValueTableProps = {
    keyValues: KeyValue[];
    onDelete: (key: string) => Promise<void>;
    onEdit: () => void;
};


const KeyValueTable: React.FC<KeyValueTableProps> = ({ keyValues }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {keyValues.map(({ key, value }) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    );
};

export default KeyValueTable;
