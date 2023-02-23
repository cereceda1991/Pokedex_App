import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import './PokemonDetails.css'
import BgColor from "../../data/BgColor"
import ColorName from "../../data/ColorName";


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
                <button><i className='bx bx-left-arrow-alt' /></button>
            </Link>
            <div className="pokemon__detail-data">
                <div className="pokemon__detail-header"  >
                    <img src={data.image} />
                </div>
                <div className="pokemon__detail-dates">
                    <div>
                        <h2>{data.height}</h2>
                        <h4>Height</h4>
                    </div><div>
                        <h2>{data.weight}</h2>
                        <h4>Weigth</h4>
                    </div>
                </div>
                <div className="pokemon__detail-name">
                    <span style={{ background: BgColor[type] }}></span >
                    <h1 style={{ color: ColorName(type) }}> {data.name}</h1>
                    <span style={{ background: BgColor[type] }}></span >
                </div>
                <div className="container__id" >
                    <h3 style={{ background: BgColor[type] }}>#{data.id}</h3></div>
            </div>
            <div className="pokemon__detail-container2">
                <div className="container__type">
                    <h1>Type</h1>
                    {
                        data.type?.map((res) => {
                            return (
                                <div
                                    style={{ background: BgColor[res.type.name] }} key={res.slot}>{res.type.name}</div>
                            )
                        })
                    }
                </div>
                <div className="container__ability">
                    <h1>Ability</h1>
                    {
                        data.ability?.map((res) => {
                            return (
                                <div

                                    key={res.slot}>{res.ability.name}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="pokemon__detail-column">
                <h1>Stats base</h1>
                <h4>HP</h4>
                <div className="progress">
                    {data.hp !== undefined && (
                        <div className="progress-bar" style={{ width: data.hp * 2.4 }}>
                            <span className="progress-text">{data.hp}pts</span>
                        </div>
                    )}
                </div>
                <h4>Speed</h4>
                <div className="progress">
                    {data.speed !== undefined && (
                        <div className="progress-bar" style={{ width: data.speed * 2.4 }}>
                            <span className="progress-text">{data.speed}pts</span>
                        </div>
                    )}
                </div>
                <h4>Attack</h4>
                <div className="progress">
                    {data.attack !== undefined && (
                        <div className="progress-bar" style={{ width: data.attack * 2.4 }}>
                            <span className="progress-text">{data.attack}pts</span>
                        </div>
                    )}
                </div>
                <h4>Defense</h4>
                <div className="progress">
                    {data.defense !== undefined && (
                        <div className="progress-bar" style={{ width: data.defense * 2.4 }}>
                            <span className="progress-text">{data.defense}pts</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="pokemon__detail-movements">
                <div className="pokemon__detail-movements-title">
                    <h1>Movements</h1>
                    <hr />
                </div>
                <div className="container__detail-movements">
                    {
                        data.movements?.map((res) => {
                            return (

                                <span className="detail__movements" key={res.move.url}>{res.move.name}</span>
                            )
                        })
                    }
                </div>
            </div>

        </div >
    )
}

export default PokemonDetails