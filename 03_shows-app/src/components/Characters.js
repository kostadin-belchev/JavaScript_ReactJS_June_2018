import React, { Component } from 'react'
import Roster from './Roster'
import Details from './Details'
import fetcher from '../utilities/fetcher'

const ROSTER_ENDPOINT = '/roster'
const CHARACTER_DETAILS_ENDPOINT = '/character/'

export default class Characters extends Component {
  constructor() {
    super()
    this.state = {
      images: [],
      details: {
        name: null,
        id: null,
        url: null,
        bio: null
      }
    }
  }

  fetchRoster = () => {
    fetcher.get(ROSTER_ENDPOINT, (fetchedData) => {
      // console.log(fetchedData)
      this.setState({images: fetchedData})
    })
  }

  fetchCharacter = (charId) => {
    fetcher.get(CHARACTER_DETAILS_ENDPOINT + charId, (fetchedCharacter) => {
      // console.log(fetchedCharacter)
      this.setState({details: fetchedCharacter})
    })
  }

  componentDidMount() {
    this.fetchRoster()
  }

  selectCharacterById = (id) => {
    this.fetchCharacter(id)
  }

  render() {
    return (
    <div>
      <Roster images={this.state.images} showDetailsFunc={this.selectCharacterById} />
      <Details {...this.state.details} />
    </div>)
  }
}
