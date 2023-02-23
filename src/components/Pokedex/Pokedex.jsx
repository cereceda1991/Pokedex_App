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


    const [searchQuery, setSearchQuery] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);


    const totalPages = Math.ceil(pokemons.length / forPage)

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/type'
        axios
            .get(url)
            .then(res => setTypes(res.data.results))
            .catch(err => console.log(err)),

            axios
                .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279")
                .then(res => setPokemons(res?.data?.results))
                .catch(err => console.log(err))
    }, [])


    const selectedType = (e) => {
        const url = e.target.value

        if (url === 'all-types') {
            axios
                .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279")
                .then(res => {
                    setPokemons(res?.data?.results)
                    setPokemonData(null)
                    setPage(1)
                })
                .catch(err => console.log(err))
        } else {
            axios
                .get(url)
                .then(res => {
                    setPokemons(res.data.pokemon)
                    setPokemonData(null)
                    setPage(1)
                })
                .catch(err => console.log(err))
        }
    }


    useEffect(() => {
        if (searchQuery) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`)
                .then((response) => {
                    setPokemonData(response.data);
                    setError(null);
                    setPage(1)
                })
                .catch((error) => {
                    console.error(error);
                    setError("❌ No se ha encontrado el Pokemon. Intente de nuevo");
                    setPokemonData(null);
                });
        }
    }, [searchQuery]);


    const handleForPageChange = (e) => {
        setForPage(parseInt(e.target.value))
    }

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.search.value.toLowerCase());
    };

    return (
        <div className="pokedex__container">
            <div className="pokedex__container-titles">
                <h1>Pokedex App</h1>
                <h3>Welcome <b>{name}</b> , here you can find your favorite pokemon!</h3>
            </div>
            <div className="pokedex__container-selects">
                <div >
                    <form className="container__search" onSubmit={handleSearch}>

                        <input type="text" name="search" placeholder="Search for id or name" />

                        <button type="submit"><i className='bx bx-search-alt' /></button>
                    </form>
                </div>
                <span>Select a type: </span>
                <select onChange={selectedType}>
                    <option value="all-types">All types</option>
                    {types?.map(type => (
                        <option key={type.name} value={type.url}>{type.name}</option>
                    ))}
                </select>

                <span>Item's for page: </span>
                <select value={forPage} onChange={handleForPageChange}>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                </select>
            </div>
            {error && <div className="container__error">{error}</div>}
            <div className="container__pokemons-card">
                {pokemonData ? (
                    <PokemonCard url={`https://pokeapi.co/api/v2/pokemon/${searchQuery}`} />
                ) : (
                    pokemons.length > 0 &&
                    pokemons.slice((page - 1) * forPage, (page - 1) * forPage + forPage)
                        ?.map((item, index) => (
                            <PokemonCard
                                url={item.pokemon ? item.pokemon.url : item.url}
                                key={index}
                            />
                        ))
                )}

            </div>

            <Pagination
                page={page} setPage={setPage} totalPages={totalPages} />
        </div>

    )
}

export default Pokedex
