import { Component } from 'react';



class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.bhColor = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: "2px",
            borderStyle: "solid",
            fontWeight: "bolder",
            borderRadius: "7px",
            borderColor: this.color,
            textAlign: "center",
            fontSize: "12px",
            margin: "10px 0",
            padding: "10px"
        };
    }

    render() {
        return (
            <div className="Alert">
                < p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(0,0,225)'; //blue
        this.bgColor = 'rgb(220,220,225)'; //light blue
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(255,165,0)'; //Orange
        this.bgColor = 'rgb(220,217,139)'; //light Orange
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(225,0,0)'; //red
        this.bgColor = 'rgb(225,202,202)'; //pink
    }
}

class WaitAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(225,0,0)'; //red
        this.bgColor = 'rgb(225,202,202)'; //pink
    }
}
export {InfoAlert,WarningAlert, ErrorAlert, WaitAlert};