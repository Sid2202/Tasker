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

  const handleDragStart = (e, card, column) => {
    const cardId = card.id
    const columnId = column.id
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('columnId', columnId);
    console.log(cardId);
};

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const sourceColumnId = e.dataTransfer.getData('columnId');
    console.log("this is drop: ", cardId);
    const newColumns = { ...columns };
    const sourceColumn = newColumns[sourceColumnId];
    console.log("this is sourceColumn: ", sourceColumn);
    const destColumn = newColumns[columnId];
    console.log("this is destColumn: ", destColumn);
    const card = sourceColumn.cards.find((c) => c.id === cardId);
    console.log("this is card: ", card);
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
          <div
          className="flex flex-col m-6 w-1/3"
          key={column.id}
          column={column}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, column.id)}
          cards={column.cards}
          >
          <h2>{column.title}</h2>
          {column.cards.map((card) => (
            <div
              className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1"
              key={card.id}
              card={card}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card, column)}
            >
              <h2>{card.content}</h2>
            </div>
          ))}
          </div>
      ))}

    </div>
  );
}

export default App;
