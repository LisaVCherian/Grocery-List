import React from 'react';
import { FaEdit, FaTrash, FaAngleUp } from 'react-icons/fa';

const List = ({ items, removeItem, editItem, quant }) => {
    return (
        <div className='grocery-list'>
            {items.map((item) => {
                const { id, title, quanty } = item;
                return (
                    <article className='grocery-item' key={id}>
                        <p className='title'>{title}</p>
                        <p className='title'>{quanty}</p>

                        <div className='btn-container'>
                            <button type='button' className='inc-btn' onClick={() => quant(id)}><FaAngleUp /></button>
                            <button type='button' className='edit-btn' onClick={() => editItem(id)}><FaEdit /></button>
                            <button type='button' className='delete-btn' onClick={() => removeItem(id)}><FaTrash /></button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default List
