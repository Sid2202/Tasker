import React from 'react';

const Card = ({ card, onDragStart }) => {

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData('cardId', card.id);
    };

  return (
    <div
      class="card"
      draggable="true"
      onDragStart={(e) => handleDragStart(e, card)}
    //   onDragEnd={onDragEnd}

      className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1"
    >

        {card.content}

    </div>
  );
};

export default Card;