import React, { useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const request = await axios.get('http://localhost:5000/api/users')
      if (request.status === 200) {
        setData(request.data);
      }
    }
    getData();
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>
      {data.length > 0 ? data.map(element => {
        return (
          <span>{element.username}</span>
        )}): null}
    </div>
  );
}

export default App;
