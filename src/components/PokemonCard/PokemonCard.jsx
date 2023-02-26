import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import './PokemonCard.css'
import ColorName from "../../data/ColorName";
import BgColor from "../../data/BgColor";
import { RiSwordLine } from "react-icons/ri";
import { RiSwordFill } from "react-icons/ri";
import { RiShieldFlashFill } from "react-icons/ri";
import loadingimg from '../../assets/pokeball.gif'


const PokemonCard = ({ url }) => {

    const [pokemon, setPokemon] = useState({ type: [] });
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // establecer loading en true antes de la solicitud
            setTimeout(() => { // establecer temporizador
                axios(url)
                    .then(res => {
                        setPokemon({
                            name: res.data?.name,
                            id: res.data?.id,
                            image: res.data?.sprites?.other['official-artwork']?.front_default,
                            type: res.data?.types,
                            stats: res.data?.stats,
                        })
                        setType(res.data?.types[0].type.name)
                    })
                    .finally(() => {
                        setLoading(false); // establecer loading en false después de la solicitud
                    });
            }, 1000); // tiempo de espera de 1 segundo
        };
        fetchData();
    }, [url]);

    document.body.style = "background: #fff"


    return (
        <Link to={`/pokedex/${pokemon?.id}`}>
            <div className="pokemon__card-container"
                style={{ background: ColorName(type) }}>
                {loading ? (
                    <div className="pokemon__loading">
                        <img src={loadingimg} />
                    </div>
                ) : (
                    <div className="pokemon__card">
                        <div className="pokemon__card-header" style={{ background: BgColor[type] }}>
                            <img className="pokemon__card-img" src={pokemon.image} alt={pokemon.image} />
                        </div>
                        <div className="pokemon__card-info">
                            <h2 style={{ color: ColorName(type) }}>
                                #{pokemon.id} {pokemon.name}
                            </h2>
                            <div>
                                <div className="pokemon__types-container">
                                    {pokemon?.type?.map((value) => {
                                        const typeColor = BgColor[value.type.name];
                                        return (
                                            <div className="pokemon__types" key={value.slot} style={{ background: typeColor }}>
                                                {value.type.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="pokemon__stats">
                                {pokemon?.stats?.map((stat) => (
                                    <div className="pokemon__stats-icons" key={stat.stat.name}>
                                        {stat.stat.name === "speed" && <i className='bx bx-run' />}
                                        {stat.stat.name === "defense" && <i className='bx bx-shield' />}
                                        {stat.stat.name === "attack" && <RiSwordLine />}
                                        {stat.stat.name === "hp" && <i className='bx bx-bolt-circle' />}
                                        {stat.stat.name === "special-attack" && <RiSwordFill />}
                                        {stat.stat.name === "special-defense" && <RiShieldFlashFill />}
                                        <span>{stat.base_stat ? stat.base_stat : "N/A"}</span>
                                        {/* <span className="stat-name">{stat.stat.name}</span> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    )
}

export default PokemonCard
