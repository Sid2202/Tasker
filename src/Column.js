import {useState, useEffect} from 'react';
import Card from './Card';
import dots from './assets/dots.png'

const Column = ({ column, cards, onDrop, onDragStart, addCard }) => {

    const [newCardTitle, setNewCardTitle] = useState('');
    const [showInput, setShowInput] = useState(false);


    const handleAddCard = () => {
        if (newCardTitle) {
          addCard(column.id, newCardTitle);
          setShowInput(false);
          setNewCardTitle(''); // Clear the input field
        }
      };


  return (
    <div className="flex flex-col m-6 w-1/3"
    //   class="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}

    >
        <div className='flex justify-between mx-1 text-sm mb-2'>
            <div className='flex'>
                <p className='bg-lime-400 rounded px-1'>{column.title}</p>
                <p className='text-gray-500 px-2'>{column.cards.length}</p>
            </div>
            <div className='flex'>
                {/* <div><image src = {dots} alt="." /></div> */}
                <button onClick={handleAddCard} className='text-gray-500'>+</button>
            </div>
        </div>
        
      
      <div className="card-list">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            onDragStart={onDragStart} 
            column={column}
        />
        ))}
      </div>

        <div>

        {showInput && (
        <div className='flex'>
          <input
            type="text"
            placeholder="Enter card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <button onClick={handleAddCard}>Add</button>
        </div>
      )}
        <button onClick={() => setShowInput(true)} className='text-gray-500'>+ New</button>

        </div>
      
    </div>
  );
};

export default Column;
