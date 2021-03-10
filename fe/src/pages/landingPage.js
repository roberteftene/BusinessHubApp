import { Component } from "react";


export default class Landing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
            <p>Hello Landing Page</p>
            <button>Login me</button>
            <button>Register</button>
            <button>Enter as guest</button>
            </>
        )
    }
}