import React, { useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const request = await axios.get('http://localhost:5000/api/users')
      if (request.status === 200) {
        setUsers(request.data);
      }
    }
    const getWeights = async () => {
      const request = await axios.get('http://localhost:5000/api/weights')
      if (request.status === 200) {
        setWeights(request.data);
      }
    }
    getUsers();
    getWeights();
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>
      {users.length > 0 ? users.map(element => {
        return (
          <span>{element.username}</span>
        )}): null}
      {weights.length > 0 ? weights.map(element => {
        return(
          <span>{element.username}</span>
        )}): null}
    </div>
  );
}

export default App;
