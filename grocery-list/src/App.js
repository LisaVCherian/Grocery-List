import React, { useState } from "react";
import Alert from 'Alert';
import List from 'List';

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState();
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: true, msg: '', type: '' });

  const handleChange = (e) => {
    e.preventDefault();
  }

  return (
    <section>
      <div>
        <form onSubmit={handleChange(e)}>
          {alert.show && <Alert />}
          <input placeholder="eg: eggs"></input>
          <List />
        </form>
      </div>
    </section>
  );
}

export default App;
