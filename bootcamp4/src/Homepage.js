import React from 'react';

import { Link, withRouter } from "react-router-dom";
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class Homepage extends React.Component {
    render() {
        if (!isLoaded(this.props.decks)) {
            return <div>Loading...</div>;
        }

        const decks = this.props.decks;

        const links = Object.keys(decks).map((id) => {
            const deck_name = decks[id].name;
            return (
                <div>
                    <Link to={`viewer/${id}`}> {deck_name} </Link>
                </div>
            )
        });

        return (
            <div>
                <h2>Homepage</h2>
                <br />
                <div>
                    <Link to="/editor">Create a new card deck</Link>
                </div>
                <h3>Flashcards</h3>
                <div>
                    { links }
                </div>
            </div>   
        )
    }
}

const mapStateToProps = state => {
    const decks = state.firebase.data.homepage;
    return { decks: decks };
}

export default compose(
    firebaseConnect(["/homepage"]),
    withRouter, 
    connect(mapStateToProps)
)(Homepage);