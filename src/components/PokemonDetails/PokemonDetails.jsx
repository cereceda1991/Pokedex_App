import axios from "axios"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import './PokemonDetails.css'
import BgColor from "../../data/BgColor"


const PokemonDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [type, setType] = useState('');

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => {
                setData({
                    name: res.data.name,
                    image: res.data?.sprites.other['official-artwork']?.front_default,
                    type: res.data.types,
                    height: res.data.height,
                    weight: res.data.weight,
                    id: res.data.id,
                    ability: res.data.abilities,
                    movements: res.data.moves,
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    speed: res.data.stats[5].base_stat
                })
                setType(res.data.types[0].type.name)
            })
    }, [id])

    document.body.style = `background: ${BgColor[type]}`


    return (
        <div className="pokemon__detail-container">
            <Link to='/pokedex'>
                <button><i className='bx bx-left-arrow-alt'></i></button>
            </Link>
            <div className="pokemon__detail-data">
                <h1 className="id">#{data.id}</h1>
                <img src={data.image} />
                <hr></hr>
                <h1 className="name">{data.name}</h1>

                <div className="data">
                    <div>{data.height} <br /><span>Height</span></div>
                    <div>{data.weight} <br /><span>Weigth</span></div>
                </div>
                <h1>{data.type1}</h1>
            </div>
            <div className="pokemon__detail-container2">
                <div className="container__type">
                    <h1>Type</h1>
                    {
                        data.type?.map((res) => {
                            return (
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    style={{ background: BgColor[res.type.name] }} key={res.slot}>{res.type.name}</motion.div>
                            )
                        })
                    }
                </div>
                <div className="container__ability">
                    <h1>Ability</h1>
                    {
                        data.ability?.map((res) => {
                            return (
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    key={res.slot}>{res.ability.name}</motion.div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="pokemon__detail-column">
                <h1>Stats base</h1>
                <h4>HP</h4>
                <div className="progress">
                    <div className="progress-bar" style={{ width: data.hp * 2.4 }}>
                        <span className="progress-text">{data.hp}pts</span>
                    </div>
                </div>
                <h4>Speed</h4>
                <div className="progress">
                    <div className="progress-bar" style={{ width: data.speed * 2.4 }}>
                        <span className="progress-text">{data.speed}pts</span>
                    </div>
                </div>
                <h4>Attack</h4>
                <div className="progress">
                    <div className="progress-bar" style={{ width: data.attack * 2.4 }}>
                        <span className="progress-text">{data.attack}pts</span>
                    </div>
                </div>
                <h4>Defense</h4>
                <div className="progress">
                    <div className="progress-bar" style={{ width: data.defense * 2.4 }}>
                        <span className="progress-text">{data.defense}pts</span>
                    </div>
                </div>
            </div>
            <div className="pokemon__detail-movements">
                <h1>Movements</h1>
                {
                    data.movements?.map((res) => {
                        return (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                key={res.slot}>{res.move.name}</motion.div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PokemonDetails