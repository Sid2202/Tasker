import React, { createContext, useReducer} from 'react';

export const initialState = {
  column1: {
    id: 'column1',
    title: 'Not Started',
    color: 'bg-rose-200',
    cards: [
      { id: 'card1', content: 'Code merge' },
      { id: 'card2', content: 'coffee' },
    ],
  },
  column2: {
    id: 'column2',
    title: 'In progress',
    color: 'bg-yellow-200',
    cards: [
      { id: 'card3', content: 'Portfolio website' },
      { id: 'card4', content: 'UI/UX' },
    ],
  },
  column3: {
    id: 'column3',
    title: 'Completed',
    color: 'bg-green-200',
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

      return {
        ...state,
        [columnId]: {
          ...state[columnId],
          cards: [
            ...state[columnId].cards,
            { id: `${columnId}-${Date.now()}`, content },
          ],
        },
      };
    case 'addColumn':
      const {title} = action.payload;
      const newColumnId = `${title}-${Date.now()}`;
      const newColumn = {
        id: newColumnId,
        title,
        cards: [],
        color: 'bg-blue-200'
      }
      return{
        ...state,
          [newColumnId]: newColumn,
      };
    case 'changeColor':
      const {columnColorId, newColor} = action.payload;
      const newStateColor = { ...state };
      if (newStateColor[columnColorId]) {
        const column = newStateColor[columnColorId];
        if (column.color) {
          column.color = newColor;
        }
      }
      return newStateColor;
    case 'editCardContent':
      const { colId, carId, newContent } = action.payload;
      const newSt = { ...state };
      if (newSt[colId]) {
        const column = newSt[colId];
        if (column.cards) {
          const card = column.cards.find((c) => c.id === carId);
    
          if (card) {
            card.content = newContent;
          }
        }
      }
      return newSt;
    
    case 'deleteCard':
      const { col, car} = action.payload;
      const newSta = { ...state };
      if (newSta[col]) {
        const column = newSta[col];
        if (column.cards) {
          column.cards = column.cards.filter((c) => c.id !== car);
        }
      }
      return newSta;

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

