import React, { useState } from "react";
import Alert from './Alert';
import List from './List';

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: true, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // alert('Enter an item!')
    }
    else if (name && editing) {
      //bs
    }
    else {
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem]);
      setName('');
    }
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert />}
        <h3>My Grocery List</h3>
        <div className="form-control">
          <input type='text'
            value={name}
            placeholder="eg: eggs"
            onChange={(e) => setName(e.target.value)}>
          </input>

          <button className="submit-btn" type="submit">{editing ? 'edit' : 'submit'}</button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} />
          <button className="clear-btn">Clear Items</button>
        </div>
      )}

    </section>
  );
}

export default App;
