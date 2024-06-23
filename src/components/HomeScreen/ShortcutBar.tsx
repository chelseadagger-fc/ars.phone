import React from 'react';
import { MdOutlineBackup, MdOutlinePhotoSizeSelectActual, MdOutlineSms } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";

interface ShortcutBarProps {
  navigateTo: (newScreen: string) => void;
}

const ShortcutBar: React.FC<ShortcutBarProps> = ({ navigateTo }) => {
  return (
    <div className="bg-zinc-900/90 h-1/6 w-full flex flex-row justify-around items-center p-1 font-titillium">
      <div className="h-20 w-20 rounded-xl bg-blue-500/20 text-white font-semibold text-sm flex flex-col justify-around py-1 items-center" onClick={() => navigateTo('Messages')}>
        <MdOutlineSms size={"3rem"} />
        <p>MESSAGES</p>
      </div>
      <div className="h-20 w-20 rounded-xl bg-emerald-600/20 text-white font-semibold text-sm flex flex-col justify-around py-1 items-center">
        <MdOutlinePhotoSizeSelectActual size={"3rem"} />
        <p>PHOTOS</p>
      </div>
      <div className="h-20 w-20 rounded-xl bg-rose-300/20 text-white font-semibold text-sm flex flex-col justify-around py-1 items-center">
      <RiContactsBookLine size={"3rem"} />
        <p>CONTACTS</p>
      </div>
      <div className="h-20 w-20 rounded-xl bg-yellow-300/20 text-white font-semibold text-sm flex flex-col justify-around py-1 items-center">
        <MdOutlineBackup size={"3rem"} />
        <p>DATA</p>
      </div>
    </div>
  );
};

export default ShortcutBar;