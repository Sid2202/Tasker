import React, {useContext} from 'react';
// import { ColContext } from './ColContext';

const Card = ({ card, onDragStart, column }) => {

    const handleDragStart = (e, card, column) => {
        // e.dataTransfer.setData('cardId', card.id);
        onDragStart(e, card, column);
    };

  return (
    <div
      draggable="true"
      onDragStart={(e) => handleDragStart(e, card, column)}
      className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1"
    >
        <p className='text-sm font-semibold'>{card.content}</p>
    </div>
  );
};

export default Card;