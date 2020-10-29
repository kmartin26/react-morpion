import React from "react"
import Case from "./Case"

class Grille extends React.Component {

    creerCase(i) {
        return (
            <Case indice={i} lettre={this.props.gridToDisplay[i]} onClick={() => this.props.onClick(i)} />
        )
    }

    render() {

        return(
            <>
                <div className="status">{this.props.status}</div>
                <div className="board-row">
                    {this.creerCase(0)}
                    {this.creerCase(1)}
                    {this.creerCase(2)}
                </div>
                <div  className="board-row">
                    {this.creerCase(3)}
                    {this.creerCase(4)}
                    {this.creerCase(5)}
                </div>
                <div  className="board-row">
                    {this.creerCase(6)}
                    {this.creerCase(7)}
                    {this.creerCase(8)}
                </div>
            </>
        )
    }

}

export default Grille