import {useState, useEffect} from 'react';
import axios from 'axios';


const App = () => {

    //---------- State vars ----------//
    const [newQuote, setNewQuote] = useState('');
    const [newQuoteList, setNewQuoteList] = useState([]);

    useEffect(()=>{
        axios
            .get('http://localhost:3000/yequotes')
            .then((response)=>{
                setNewQuoteList(response.data);
            });
    }, []);


    //---------- Create ----------//
    const handleNewQuoteChange = (event) =>{
        setNewQuote(event.target.value);
    };

    const handleNewQuoteSubmit = (event) =>{
        event.preventDefault();
        axios.post(
            'http://localhost:3000/yequotes',
            {
                quote: newQuote
            }
        ).then(()=>{
            axios
                .get('http://localhost:3000/yequotes')
                .then((response)=>{
                    setNewQuoteList(response.data);
                });
        });
    };

    return(
        <>
            <h1>Kanye Rest</h1>

            <form onSubmit={handleNewQuoteSubmit}>
                New Quote: <input type="text" onChange={handleNewQuoteChange}/><br/>
                <input type="submit" value="New Kanye Quote"/>
            </form>
        </>

    );
}

export default App;
