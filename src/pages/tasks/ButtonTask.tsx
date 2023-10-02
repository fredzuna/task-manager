import AddIcon from '../../assets/AddIcon.svg';
import { useNavigate } from "react-router-dom";
interface IProps {
  text: string,
  pathRedirect: string
}

export function ButtonTask( { text, pathRedirect } : IProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(pathRedirect);
    }

    return (
      <div className='flex' onClick={handleClick}>
        <img src={AddIcon} />
        <span className='text-[#2B87E3] text-base pl-4 font-medium'>{text}</span>
      </div>
    )  
}