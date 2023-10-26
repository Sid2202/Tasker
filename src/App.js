import {useReducer, useContext} from 'react';
import Column from './Column';
import { ColContext } from './ColContext';


function App() {
 
  const [columns, dispatch] = useContext(ColContext);

  const handleDragStart = (e, card, column) => {
    const cardId = card.id
    const columnId = column.id
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('columnId', columnId);
};

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const sourceColumnId = e.dataTransfer.getData('columnId');
    console.log("this is card: ", cardId);
    console.log("this is sourceColumnId: ", sourceColumnId);
    console.log("this is destcolumnId: ", columnId);

    dispatch({
      type: 'moveCard',
      payload: { sourceCardId: cardId, sourceColumnId, destColumnId: columnId },
    });
  };

  const addCard = (columnId, content) => {
    dispatch({
      type: 'addCard',
      payload: { columnId, content },
    });
  };


  return (
    <div className="h-screen w-full flex flex-col p-4 items-center">
      <div className='py-6 flex flex-col items-center'>
        <p className='font-mono text-4xl p-4 font-semibold'>Tasker🐔</p>
        <p>Organise, Create and finish your tasks and stay productive🌟</p>
      </div>
      <div className='flex p-4 w-full'>
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
