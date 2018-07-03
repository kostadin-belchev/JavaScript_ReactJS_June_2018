import React, { Component } from 'react'

export default class Roster extends Component {
  render () {
    const pokemons = this.props.pokemons.map((pokemon, index) => (
      <div key={index} className='column'>
        <h2>{pokemon.pokemonName}</h2>
        <h2>#{('00' + Number(index + 1)).slice(-3)}</h2>
        <img src={pokemon.pokemonImg} alt='pokemon' />
      </div>
    ))
    return (
      <div className='row'>
        {pokemons}
      </div>)
  }
}
