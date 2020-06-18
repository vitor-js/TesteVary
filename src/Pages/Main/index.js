import React , { Component } from 'react';
import Axios from 'axios';

import './style.css';

export default class Main extends Component {
    
    state = {
        arrayPokemons:[ ],
        pagesPokemonsNext :{ },
        pagesPokemonsPrevious:{ },
    }

    componentDidMount() {
        this.loadPokemon();
    }
   
    loadPokemon = async (url = null) => {
        try{
        const response = await Axios.get(url)
        const arrayPokemons = response.data.results;
        const pagesPokemonsNext = {
            next:response.data.next,
        }
        const pagesPokemonsPrevious = {
            previous:response.data.previous,
        }
        console.log( arrayPokemons , pagesPokemonsPrevious , pagesPokemonsNext );
        this.setState({arrayPokemons,pagesPokemonsPrevious, pagesPokemonsNext })
    } catch {
        const response = await Axios.get('https://pokeapi.co/api/v2/pokemon')
        const arrayPokemons = response.data.results;
        const pagesPokemonsNext = {
            next:response.data.next,
        }
        const pagesPokemonsPrevious = {
            previous:response.data.previous,
        }
        console.log( arrayPokemons , pagesPokemonsPrevious , pagesPokemonsNext );
        this.setState({arrayPokemons,pagesPokemonsPrevious, pagesPokemonsNext })
    }
    
    }
   
    nextPage = () => {
        const { pagesPokemonsNext } = this.state;
        if(pagesPokemonsNext.next === null) return
        const nextPage = pagesPokemonsNext.next;
        this.loadPokemon(nextPage);
    }

    
    prevPage = () => {
        const { pagesPokemonsPrevious } = this.state;
        if(pagesPokemonsPrevious.previous === null) return
        const prevPage = pagesPokemonsPrevious.previous;
        this.loadPokemon(prevPage);
    }


    render() {
        const { arrayPokemons } = this.state
        return (
            <div className='pokemon-list' >
                {arrayPokemons.map(pokemon => (
                    <article id={pokemon.name}>
                        <strong>
                            {pokemon.name}
                        </strong>
                    </article>
                ))}

            <div className='actions'>
                    <button onClick={this.prevPage} >Anterior</button>
                    <button onClick={this.nextPage} >Proximo</button>
            </div>

            </div>
        )
    }
}