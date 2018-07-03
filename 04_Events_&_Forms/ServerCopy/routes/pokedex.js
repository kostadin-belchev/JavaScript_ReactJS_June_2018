const express = require('express')

const router = new express.Router()

const pokemons = require('./../data/pokemons')

router.post('/create', (req, res, next) => {
  console.log('adding pokemon to pokedex')
  pokemons.addPokem((req.body))
  console.log('added pokemon to pokedex')
  return res.status(200).json({pokemons: pokemons.retrivePokemons()})
})

router.get('/pokedex', (req, res, next) => {
  console.log('getting')
  console.log(pokemons.retrivePokemons())
  let pokemonCollection = (pokemons.retrivePokemons())
  return res.status(200).json({
    pokemonCollection
  })
})

module.exports = router
