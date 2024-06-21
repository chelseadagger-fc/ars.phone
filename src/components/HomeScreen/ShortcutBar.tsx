import React from 'react';

interface ShortcutBarProps {
  navigateTo: (newScreen: string) => void;
}

const ShortcutBar: React.FC<ShortcutBarProps> = ({ navigateTo }) => {
  return (
    <div className="bg-neutral-600 h-1/6 w-full flex flex-row justify-around items-center">
      <div className="h-24 w-20 bg-red-200 flex flex-col justify-between items-center" onClick={() => navigateTo('Messages')}>
        <div></div>
        <p>MESSAGES</p>
      </div>
      <div className="h-24 w-20 bg-green-200 flex flex-col justify-between items-center">
        <div></div>
        <p>PHOTOS</p>
      </div>
      <div className="h-24 w-20 bg-blue-200 flex flex-col justify-between items-center">
        <div></div>
        <p>CONTACTS</p>
      </div>
      <div className="h-24 w-20 bg-yellow-200 flex flex-col justify-between items-center">
        <div></div>
        <p>LOGOUT</p>
      </div>
    </div>
  );
};

export default ShortcutBar;