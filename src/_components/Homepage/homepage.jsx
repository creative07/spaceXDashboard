import React, { Component } from 'react';
import './style.css';

class homepage extends Component {
    render() {
        const mystyle = {
            color: "white",
            backgroundColor: "grey",
            padding: "359px",
            fontFamily: "Arial",
            background: 'url(public/image/homepage.jpg)no-repeat center',
            backgroundAttachment : "fixed"
          };

          const mybutton = {
            width: "220px",
            height: "50px",
            border: "none",
            outline: "none",
            color: "#fff",
            background: "#111",
            cursor: "pointer",
            position: "relative",
          }
        return (
            <div style={mystyle}>
                <a href="/dashboard"><button style={mybutton}>Go to Dashboard</button></a>  
            </div>
        );
    }
}

export default homepage;   