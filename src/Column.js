import {useState, useContext} from 'react';
import Card from './Card';
import dots from './assets/dots.png'
import { ColContext } from './ColContext';

const Column = ({ columnId }) => {

    const [columns, dispatch] = useContext(ColContext)
    const [newCardTitle, setNewCardTitle] = useState('');
    const [newColumnTitle, setNewColumnTitle] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [showColInput, setShowColInput] = useState(false);


    const handleDragStart = (e, card) => {
        const cardId = card.id
        // const columnId = columnId
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

    const handleAddCard = () => {
        if(newCardTitle){
            const content = newCardTitle

            dispatch({
                type: 'addCard',
                payload: { columnId, content }
            });

            setShowInput(false);
            setNewCardTitle('');
        }
    };

    const handleAddColumn = () => {
        if(newColumnTitle){
            const title = newColumnTitle
            dispatch({
                type: 'addColumn',
                payload: { title }
            });

            setShowColInput(false);
            setNewColumnTitle('');
        }
    };


  return (
    <div className="flex flex-col m-6 w-1/3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, columnId)}
    >
        <div className='flex justify-between mx-1 text-sm mb-2'>
            <div className='flex'>
                <p className='bg-lime-400 rounded px-1'>{columns[columnId].title}</p>
                <p className='text-gray-500 px-2'>{columns[columnId].cards.length}</p>
            </div>
            <div className='flex'>
                <button className='px-1'><img width={20} height={20} className='' src = {dots} alt="." /></button>
                <button onClick={() => setShowColInput(true)} className='text-gray-500'>+</button>
                <div>
                {showColInput && (
                    <div className='flex'>
                        <input
                            type="text"
                            placeholder="Enter Column title"
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                        />
                        <button onClick={handleAddColumn}>Add</button>
                    </div>
                )}
            </div>
            </div>
        </div>
        
      
        <div className="card-list">
            {columns[columnId].cards.map((card) => (
                <Card 
                    key={card.id} 
                    card={card} 
                    onDragStart={(e, card) => handleDragStart(e, card)} 
                    column={columns[columnId]}
                />
            ))}
        </div>

        <div>
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
            </div>
            <button onClick={() => setShowInput(true)} className='text-gray-500'>+ New</button>
        </div>
    </div>
  );
};

export default Column;
