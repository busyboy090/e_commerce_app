import { useState, React } from "react";

function CategoryCard(props) {
    const {image, name, status} = props;
    const [isActive, setIsActive] = useState(status);

  return (
    <div className={`${isActive ? 'bg-[#DB4444]' : ''} w-[170px] h-[145px] border-1 border-[rgba(0,0,0,0.3)] flex gap-[10px] flex-col justify-center items-center`} onClick={() => {
        setIsActive(!isActive)
    }}>
        <img src={image} alt={name} />
        <p>{name}</p>
    </div>
  )
}

export default CategoryCard