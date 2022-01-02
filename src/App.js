import React, { Component } from 'react'
import {Gif} from './components/Gif'
import TopBar from './components/TopBar';
import './App.css';


export default class App extends Component {

  constructor(){
    super();
    this.state = {
      gifs: [] 
    }
    this.addGif = this.addGif.bind(this)
  }
  componentDidMount(){
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=fYAY5UhrPTtE6c1OYJsgzzYNFQwyPRae&limit=4&rating=g')
    .then(response => response.json())
    .then(info => {
      this.setState({
        gifs: info.data
      })
    })
    .catch(error => console.log(error))
  }

  componentDidUpdate(){

  }

  addGif(){
    fetch('https://api.giphy.com/v1/gifs/random?api_key=fYAY5UhrPTtE6c1OYJsgzzYNFQwyPRae&tag=Lionel+Messi&rating=g')
    .then(response=> response.json())
    .then(info => this.setState({
      gifs: [
        ...this.state.gifs,
        info.data
      ]
    }))
    .catch(error => console.log(error))
  }
  

  render() {
    return (
      <div className="container">
      <TopBar addGif={this.addGif}/>

      <div className="row text-center">

      {
        this.state.gifs.length === 0 
        ?
        <p>Cargando...</p>
        :
        this.state.gifs.map(gif => <Gif key={gif.id} image = {gif.images.original.url} titulo = {gif.title} />)
        
      }



    </div>    
    </div>
    )
  }
}

