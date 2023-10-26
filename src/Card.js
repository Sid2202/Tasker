import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Card = ({ card, onDragStart, column }) => {

        const handleDragStart = (e, card, column) => {
                onDragStart(e, card, column);
        };

    return (
        <div
            draggable="true"
            onDragStart={(e) => handleDragStart(e, card, column)}
        //   onClick={handleEditCard}
            className="ring-gray-300 ring-1 rounded p-2 shadow-md m-1 cursor-grab"
        >
                <Link to={`/edit/${column.id}/${card.id}`}
                    state= {{
                                state: card.content
                        }}
                >
                        <p className='text-sm font-semibold'>{card.content}</p>
                </Link>
                
        </div>
    );
};

export default Card;