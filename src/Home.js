import {useContext} from 'react';
import Column from './Column';
import { ColContext } from './ColContext';
import React from 'react';



function Home() {
 
  const [columns] = useContext(ColContext);

  return (
      <div className="h-screen w-full flex flex-col p-4 items-center">
        <div className='py-6 flex flex-col items-center'>
            <p className='font-mono text-4xl p-4 font-semibold'>Tasker🐔</p>
            <p>Organise, Create and finish your tasks and stay productive🌟</p>
        </div>
        <div className='flex flex-wrap justify-center w-full'>
          {Object.values(columns).map((column) => (
                <Column
                className='flex justify-start'
                key={column.id}
                columnId={column.id}
                />
          ))}
        </div>
      </div>
  );
}

export default Home;
