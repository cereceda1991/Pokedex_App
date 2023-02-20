import axios from "axios"
import { useState, useEffect } from "react"
import PokemonCard from "../PokemonCard/PokemonCard"
import Pagination from '../Pagination/Pagination'
import { useSelector } from "react-redux"
import './Pokedex.css'


const Pokedex = () => {

    const name = useSelector(state => state.username)

    const [types, setTypes] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [page, setPage] = useState(1)
    const [forPage, setForPage] = useState(16)

    const totalPages = Math.ceil(pokemons.length / forPage)

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/type'
        axios
            .get(url)
            .then(res => setTypes(res.data.results))
            .catch(error => console.error(error))

        axios
            .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279")
            .then(res => setPokemons(res?.data?.results))
            .catch(error => console.error(error))
    }, [])

    const selectedType = (e) => {
        const url = e.target.value

        axios
            .get(url)
            .then(res => setPokemons(res.data.pokemon))
            .catch(error => console.error(error))
    }

    const handleForPageChange = (e) => {
        setForPage(parseInt(e.target.value))
    }

    return (
        <div className="pokedex__container">
            <div className="pokedex__container-titles">
                <h1>Pokedex App</h1>
                <h3>Welcome <b>{name}</b> , here you can find your favorite pokemon!</h3>
            </div>
            <div className="pokedex__container-selects">
                <span>Select a type: </span>
                <select onChange={selectedType}>
                    {
                        types?.map(type => (
                            <option key={type.name} value={type.url}>{type.name}</option>
                        ))
                    }
                </select>
                <span>Item's for page: </span>
                <select value={forPage} onChange={handleForPageChange}>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="48">48</option>
                </select>
            </div>
            <ul>
                {pokemons.length > 0 &&
                    pokemons.slice((page - 1) * forPage,
                        (page - 1) * forPage + forPage)
                        .map((item, index) => (
                            <PokemonCard
                                url={item.pokemon ? item.pokemon.url : item.url}
                                key={index}
                            />
                        ))
                }
            </ul>
            <Pagination
                page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    )
}

export default Pokedex
