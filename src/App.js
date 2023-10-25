import {useState} from 'react';
import Card from './Card';
import Column from './Column';

function App() {

  const [columns, setColumns] = useState({
    column1: {
      id: 'column1',
      title: 'Column 1',
      cards: [
        { id: 'card1', content: 'Card 1' },
        { id: 'card2', content: 'Card 2' },
      ],
    },
    column2: {
      id: 'column2',
      title: 'Column 2',
      cards: [
        { id: 'card3', content: 'Card 3' },
        { id: 'card4', content: 'Card 4' },
      ],
    },
  });

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('cardId', card.id);
};

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const newColumns = { ...columns };
    const sourceColumn = newColumns[columnId];
    const card = columns[cardId];
    sourceColumn.cards = sourceColumn.cards.filter((c) => c.id !== cardId);
    newColumns[columnId].cards = [...newColumns[columnId].cards, card];
    setColumns(newColumns);
  };


  return (
    <div className="flex p-4">
      {/* <h1>Tasker</h1>

      <div>
        <h2>Tasks</h2>

        <div className="flex">
          <div class="stack" className="flex flex-col m-4 w-1/3">
            <div className="flex justify-between">
              <h2>Not started</h2>
              <button className="text-gray-500">+</button>
            </div>

            <div class="card" draggable className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1">
              <h2>task1</h2>
            </div>
            <div class="card" draggable className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1">
              <h2>task2</h2>
            </div>

            <div>
              <button className="p-2 text-gray-500">+ New</button>
            </div>

          </div>


          <div class="stack" className="flex flex-col m-4 w-1/3">
            <div className="flex justify-between">
              <h2>Not started</h2>
              <button className="text-gray-500">+</button>
            </div>

            <div class="card" className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1">
              <h2>task1</h2>
            </div>
            <div class="card" className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1">
              <h2>task2</h2>
            </div>

            <div>
              <button className="p-2 text-gray-500">+ New</button>
            </div>
            
          </div>


          <div class="stack" className="flex flex-col m-4 w-1/3">
            <div className="flex justify-between">
              <h2>Not started</h2>
              <button className="text-gray-500">+</button>
            </div>

            <div class="card" className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1">
              <h2>task1</h2>
            </div>
            <div class="card" className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1">
              <h2>task2</h2>
            </div>

            <div>
              <button className="p-2 text-gray-500">+ New</button>
            </div>
            
          </div>
        </div>


      </div> */}

      {Object.values(columns).map((column) => (
          <Column
          key={column.id}
          column={column}
          onDrop={(e) => handleDrop(e, column.id)}
          cards={column.cards}
          >
          {column.cards.map((card) => (
            <div
              className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1"
              key={card.id}
              card={card}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card)}
            >
              {card.content}
            </div>
          ))}
          </Column>
      ))}

    </div>
  );
}

export default App;
