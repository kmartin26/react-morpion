import React from 'react'
import './App.css'

import Grille from './components/Grille'

class App extends React.Component {
  // Constructeur de la classe components Grille
  constructor(props) {
    super(props)
    this.state = {
      historique: [
        {
          cases: Array(9).fill(null)
        }
      ],
      nextPlayer: true,
      tour: 0
    }
  }
  
  modifValeur(i) {
    let historique = this.state.historique
    const currentHisto = historique[historique.length-1]
    const currentGrid = currentHisto.cases.slice()
    
    // Vérification de l'état de la grille à chaque clique
    let playerVictory = this.verifGagnant(currentGrid)
    
    // Si y a un vainqueur on arrête sinon on continue
    if (playerVictory || currentGrid[i]) { return }
    
    // Préparation des nouvelles données
    let newLetter = (this.state.nextPlayer) ? "X" : "O"
    currentGrid[i] = newLetter
    
    const newHisto = [{cases: currentGrid}]
    
    // Déclenchement du changement d'état
    this.setState({
      historique: this.state.historique.concat(newHisto),
      nextPlayer: !this.state.nextPlayer,
      tour: this.state.tour+1
    })
  }
  
  verifGagnant(grille) {
    // Liste de toutes les combinaisons gagnantes
    const combinaisons = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    
    // Vérification de chaque combinaison
    for (let i = 0; i < combinaisons.length; i++) {
      const [a, b, c] = combinaisons[i]
      
      if ((grille[a]) && (grille[a] === grille[b]) && (grille[a] === grille[c])) {
        return grille[a]
      }            
    }
    return null
  }
  
  affichTour(index) {
    let historique = this.state.historique.slice(0, index+1)
    
    // Déclenchement du changement d'état
    this.setState({
      historique: historique,
      nextPlayer: (historique.length%2 === 0) ? false : true,
      tour: index + 1
    })
  }
  
  render() {
    // Définition de la grille à afficher (la dernière)
    let historique = this.state.historique
    const currentHisto = historique[historique.length-1]
    const currentGrid = currentHisto.cases
    
    let status = ""
    let gagnant = this.verifGagnant(currentGrid) // Vérification de la victoire à chaque tour
    // Modifie le status en fonction de l'état de la grille
    if (gagnant) {
      status = "Vainqueur : " + gagnant
    } else {
      status = "Prochain joueur : " + ((this.state.nextPlayer) ? "X" : "O")
    }
    
    return(
      <div className="game">
        <div className="game-board">
          <Grille gridToDisplay={currentGrid} status={status} onClick={(i) => this.modifValeur(i)} />
        </div>
        <div className="game-select">
          <ul>
          {
            historique.map((histo, indice) =>
            <li>
            <button onClick={() => this.affichTour(indice)}>Tour {indice}</button>
            </li>
            )
          }
          </ul>
        
        </div>
      </div>
      
    )
  }
    
}
  
  export default App
  