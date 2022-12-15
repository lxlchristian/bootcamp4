import React from 'react';

import { Link } from "react-router-dom";

class Homepage extends React.Component {
    render() {
        return (
            <div>
                <h2>Flashcards Application</h2>
                <div>
                    <Link to="/viewer">Go to card viewer</Link>

                </div>
                <div>
                    <Link to="/editor">Go to card editor</Link>
                    
                </div>
            </div>   
        )
    }
}

export default Homepage