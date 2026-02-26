import '../styles/navicon.scss'
import icon from '../../../assets/logo.png'
import { useNavigate } from 'react-router'
const NavIcon = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className='navicon'>
      <div onClick={()=>navigate('/')}>
        <span><img src={icon} alt="" srcset="" /></span>
        <span>Social</span>
      </div>
    </div>
    </>
  )
}

export default NavIcon