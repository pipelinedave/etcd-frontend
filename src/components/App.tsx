import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import SearchBar from './SearchBar.tsx';
import KeyValueTable, { KeyValue } from './KeyValueTable.tsx';
import KeyModal from './KeyModal.tsx';

const App: React.FC = () => {
  const [keyValues, setKeyValues] = useState<KeyValue[]>([]);
  const [filteredKeyValues, setFilteredKeyValues] = useState<KeyValue[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse = await axios.get('/v3/kv/range', {
        params: {
          range_end: '\0',
          limit: 1000
        }
      });
      const kvs = response.data.kvs.map((kv: any) => ({
        key: atob(kv.key),
        value: atob(kv.value)
      }));
      setKeyValues(kvs);
      setFilteredKeyValues(kvs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === '') {
      setFilteredKeyValues(keyValues);
    } else {
      const filtered = keyValues.filter(
        (kv) =>
          kv.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          kv.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredKeyValues(filtered);
    }
  };

  const handleCreate = async (key: string, value: string) => {
    try {
      await axios.post('/v3/kv/put', {
        key: btoa(key),
        value: btoa(value)
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await axios.post('/v3/kv/delete', {
        key: btoa(key)
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Etcd Frontend</h1>
      <SearchBar onSearch={handleSearch} />
      <KeyValueTable
        keyValues={filteredKeyValues}
        onDelete={handleDelete}
        onEdit={() => setShowModal(true)}
      />
      <KeyModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleCreate}
      />
    </div>
  );
};

export default App;
