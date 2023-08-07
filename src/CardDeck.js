import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from './Card';
import './CardDeck.css'
// got the deck id ref working just need to work on the drawcard() when you click the button. check sol
const CardDeck = () => {

    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([])
    
    useEffect(function loadDeck(){
        async function fetchData() {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            setDeck(res.data)
            
        }
        fetchData(); 
    }, [])
    
        async function drawCard() {
            try{
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
            if(res.data.remaining === 0){
                alert('Error: no cards remaining!')
            }else {
            const card = res.data.cards[0]
            setDrawn(d => [
                ...d,
                {
                    id: card.code,
                    name: card.value + ' of ' + card.suit,
                    image: card.image
                },
            ]);
        }
        } catch (err){
            alert(err)
        }
        
        }
        
        async function shuffle() {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`)
            setDrawn([])
            
        }
        
        
    
    
    // console.log(data)
    

    return (
        <div className="main">
            <button className="buttons" onClick={drawCard}>Gimme A Card</button>
            <button className="buttons" onClick={shuffle}>Shuffle</button>
            <div className="Cards">
                {drawn.map((d) => (
                    <Card key={d.id} name={d.name} image={d.image} />
                ))}
            </div>

        </div>
    )
}

export default CardDeck;