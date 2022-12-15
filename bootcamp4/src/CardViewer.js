import React from 'react';

import { Link, withRouter } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from 'react-redux';
import {compose } from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { current_card: 0, is_front: true }
    }

    prevCard = () => {
        this.setState({ current_card: this.state.current_card - 1 });
    } 
    nextCard = () => {
        this.setState({ current_card: this.state.current_card + 1 });
    }
    flipCard = () => this.setState({ is_front: !this.state.is_front });

    render() {
        if (!isLoaded(this.props.cards)) {
            return <div>Loading...</div>;
        }

        if (isEmpty(this.props.cards)) {
            return <div>Page not found!</div>;
        }

        const card_data = this.props.cards[this.state.current_card];
        var card_shown;
        if (this.state.is_front) {
            card_shown = card_data.front;
        } else {
            card_shown = card_data.back;
        }

        var prevButton = this.state.current_card === 0
                            ? <button disabled onClick={this.prevCard}>Previous</button> 
                            : <button onClick={this.prevCard}>Previous</button>;
        var nextButton = this.state.current_card === this.props.cards.length - 1
                            ? <button disabled onClick={this.nextCard}>Next</button> 
                            : <button onClick={this.nextCard}>Next</button>;

        return (
            <div>
                <h2>{ this.props.name }</h2>
                <button className="flashcard" onClick={this.flipCard}>{ card_shown }</button>
                <div>
                    { prevButton }
                    { nextButton }
                </div>
                <p>Card {this.state.current_card + 1}/{this.props.cards.length}</p>
                <hr />
                <Link to="/editor">Go to card editor</Link>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { cards: cards, name: name };
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        const deckId = props.match.params.deckId;
        return [{ path: `/flashcards/${deckId}}`, storeAs: deckId }];
    }),
    connect(mapStateToProps),
)(CardViewer);

