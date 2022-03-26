import React, { useState } from "react";
import Alert from './Alert';
import List from './List';

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'Enter an Item!', 'danger')
    }
    else if (name && editing) {
      setList(list.map((item) => {
        if (item.id === editID)
          return { ...item, title: name }

        return item;
      })
      )
      setEditID(null);
      setEditing(false);
      setName('');
      showAlert(true, 'Item updated', 'success');
    }
    else {
      const newItem = { id: new Date().getTime().toString(), title: name, quanty: quantity }
      setList([...list, newItem]);
      showAlert(true, 'Item added to the list', 'success')
      setName('');
    }
  }

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  }

  const clearList = () => {
    showAlert(true, 'Empty List', 'danger');
    setList([]);
  }

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, 'Item removed', 'danger')
  }

  const editItem = (id) => {
    const x = list.find((item) => item.id === id);
    setEditing(true);
    setEditID(id);
    setName(x.title);
  }

  const quant = (id) => {
    let x = list.find((item) => item.id === id);
    setEditing(true);
    setEditID(id);
    setQuantity(x.quanty += 1);
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>My Grocery List</h3>
        <div className="form-control">
          <input
            type='text'
            value={name}
            className='grocery'
            placeholder="eg: eggs"
            onChange={(e) => setName(e.target.value)}>
          </input>

          <button className="submit-btn" type="submit">{editing ? 'edit' : 'submit'}</button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} quant={quant} />
          <button className="clear-btn" onClick={clearList} >Clear Items</button>
        </div>
      )}

    </section>
  );
}

export default App;
