import {useState} from 'react';
import Column from './Column';

function App() {

  const [columns, setColumns] = useState({
    column1: {
      id: 'column1',
      title: 'Not Started',
      cards: [
        { id: 'card1', content: 'Code merge' },
        { id: 'card2', content: 'coffee' },
      ],
    },
    column2: {
      id: 'column2',
      title: 'In progress',
      cards: [
        { id: 'card3', content: 'Portfolio website' },
        { id: 'card4', content: 'UI/UX' },
      ],
    },
    column3: {
      id: 'column3',
      title: 'Completed',
      cards: [
        { id: 'card5', content: 'wakeup' },
        { id: 'card6', content: 'Drink water' },
      ],
    },
  });

  const addCard = (columnId, content) => {
    const newColumns = { ...columns };
    const cardId = `${columnId}-${Date.now()}`;
    newColumns[columnId].cards.push({ id: cardId, content });
    setColumns(newColumns);
  };
  

  const handleDragStart = (e, card, column) => {
    const cardId = card.id
    const columnId = column.id
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('columnId', columnId);
    console.log(cardId);
    console.log(columnId);
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
    <div className="h-screen w-full flex flex-col p-4 items-center">
      <div>
        <p className='font-mono text-4xl p-4 font-semibold'>✔︎Tasker</p>
      </div>
      <div className='flex w-full'>
        {Object.values(columns).map((column) => (
            <Column
              key={column.id}
              column={column}
              onDrop={(e) => handleDrop(e, column.id)}
              cards={column.cards}
              onDragStart={(e, card) => handleDragStart(e, card, column)}
              addCard={addCard}
            />
        ))}
      </div>

    </div>
  );
}

export default App;
