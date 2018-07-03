import React, { Component } from 'react'
import AddPokemonForm from './AddPokemonForm'
import Roster from './Roster'

import DATABASE_URL from '../../config/serverPort'

class LoggedInScreen extends Component {
  constructor () {
    super()

    this.state = {
      roster: []
    }

    this.fetchPokemons = this.fetchPokemons.bind(this)
  }
  // eslint-disable-next-line
  fetchPokemons () {
    // eslint-disable-next-line
    fetch(DATABASE_URL + '/pokedex/pokedex')
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        // console.log('data: ')
        // console.log(data.pokemonCollection)
        if (data.pokemonCollection.length > 0) { // in case database is empty
          this.setState({
            roster: data.pokemonCollection
          })
        }
      })
  }

  componentDidMount () {
    this.fetchPokemons()
  }

  render () {
    return (
      <div>
        <AddPokemonForm updateRosterFunc={this.fetchPokemons} />
        <h2>Pokemons:</h2>
        <hr />
        <Roster pokemons={this.state.roster} />
      </div>
    )
  }
}

export default LoggedInScreen
