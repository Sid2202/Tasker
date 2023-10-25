import React from 'react';
import Card from './Card';

const Column = ({ column, cards, onDrop }) => {


  return (
    <div className="flex flex-col m-6 w-1/3"
      class="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h2>{column.title}</h2>
      <div className="card-list">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
        />
        ))}
      </div>
    </div>
  );
};

export default Column;
