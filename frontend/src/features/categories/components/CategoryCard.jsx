import { useState, React } from "react";

function CategoryCard(props) {
    const { name } = props;
    const [isActive, setIsActive] = useState(false);

  return (
    <div className={`${isActive ? 'bg-[#DB4444]' : ''} p-[20px] h-[145px] text-center border-1 border-[rgba(0,0,0,0.3)] flex gap-[10px] flex-col justify-center items-center`} onClick={() => {
        setIsActive(!isActive)
    }}>
        <p className={`${isActive ? 'text-white' : 'text-black'}`}>{name}</p>
    </div>
  )
}

export default CategoryCard
