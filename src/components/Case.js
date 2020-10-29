import React from "react"

class Case extends React.Component {
    
    render() {
        return(
            <button className="square" 
                id={this.props.indice} 
                onClick={() => this.props.onClick()}>
                    {this.props.lettre}
            </button>
        )
    }

}

export default Case