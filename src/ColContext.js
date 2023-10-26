import React, { createContext, useReducer} from 'react';

export const initialState = {
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
  }
}

export const columnsReducer = (state, action) => {
  switch (action.type) {
    case 'addCard':
      const { columnId, content } = action.payload;
      const newColumns = { ...state };
      const cardId = `${columnId}-${Date.now()}`;
      newColumns[columnId].cards.push({ id: cardId, content });
      return newColumns;
    case 'moveCard':
      const { sourceCardId, sourceColumnId, destColumnId } = action.payload;
      const newState = { ...state };
      
      if (newState[sourceColumnId] && newState[destColumnId]) {
        const sourceColumn = newState[sourceColumnId];
        const destColumn = newState[destColumnId];
        const card = sourceColumn.cards.find((c) => c.id === sourceCardId);

        if (sourceColumn && card) {
          sourceColumn.cards = sourceColumn.cards.filter((c) => c.id !== sourceCardId);
          destColumn.cards = [...destColumn.cards, card];
        }
      }

      return newState;
    default:
      return state;
  }
};


export const ColContext = createContext();

export const ColProvider = ({ reducer, initialState, children }) => (
  <ColContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ColContext.Provider>
);

