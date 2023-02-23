import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeName } from '../../store/slices/username.slice'
import { RiSendPlaneFill } from "react-icons/ri";
import portada from "../../assets/portada.png";
import './Home.css'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(changeName(e.target[0].value))


        navigate('/pokedex')
    }

    return (
        <div className='home__card'>
            <div className='home__card-container'>
                <h1>Hello Trainer!</h1>
                <img className='home__card-img' src={portada} />
            </div>
            <h2>Give me you name to start!</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" />
                <button><RiSendPlaneFill className='icon' />
                </button>
            </form>
        </div>
    )
}

export default Home