
import React, {useState, useContext} from 'react';
import { ColContext } from './ColContext';
import {useNavigate, useParams, useLocation } from 'react-router-dom'; 

const CardEdit = () => {

    const navigate = useNavigate();

    const { cardId, columnId } = useParams();
    const {state} = useLocation();
    const [columns, dispatch] = useContext(ColContext);
    const [editContent, setEditContent] = useState(state.state);

    

    const handleDeleteCard = () => {
        const col = columnId;
        const car = cardId;
        dispatch({
            type: 'deleteCard',
            payload: { col, car},
        });
        navigate('/');
    }
    const handleSaveChanges = () => {
        const colId = columnId;
        const carId = cardId;
        dispatch({
          type: 'editCardContent',
          payload: { colId, carId, newContent: editContent },
        });
        navigate('/');
        // console.log('Updated card content: ', columns[columnId])
      };
      
            
  return (
    <div className='flex flex-col p-10'>

      <div>
        <label>Edit Card Content:</label>
        <input
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          type="text"
          value={editContent}
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
        />
      </div>
    <button onClick={handleSaveChanges}>Save Changes</button>
    <button onClick={handleDeleteCard}>Delete Card</button>
  </div>
  );
};

export default CardEdit;
