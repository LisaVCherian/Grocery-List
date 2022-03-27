import React, { useState, useEffect } from "react";
import Alert from './Alert';
import List from './List';

// const getLocalStorage = () => {
//   let list = localStorage.getItem('list');
//   if (list) {
//     return (list = JSON.parse(localStorage.getItem('list')));
//   } else {
//     return [];
//   }
// };

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
          return { ...item, title: name, quanty: quantity }

        return item;
      })
      )
      setEditID(null);
      setEditing(false);
      setName('');
      setQuantity(1);
      showAlert(true, 'Item updated', 'success');

    }
    else {
      const newItem = { id: new Date().getTime().toString(), title: name, quanty: 1 }
      console.log(newItem);
      setList([...list, newItem]);
      showAlert(true, 'Item added to the list', 'success')
      setName('');
      setQuantity(1);
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

  const quantInc = (id) => {
    let x = list.find((item) => item.id === id);
    setQuantity(x.quanty += 1);
  }

  const quantDec = (id) => {
    let x = list.find((item) => item.id === id);
    if (x.quanty > 0)
      x.quanty -= 1;
    setQuantity(x.quanty);
  }

  // useEffect(() => {
  //   localStorage.setItem('list', JSON.stringify(list));
  // }, [list]);

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
          <List items={list} removeItem={removeItem} editItem={editItem} quantInc={quantInc} quantDec={quantDec} />
          <button className="clear-btn" onClick={clearList} >Clear Items</button>
        </div>
      )}

    </section>
  );
}

export default App;
