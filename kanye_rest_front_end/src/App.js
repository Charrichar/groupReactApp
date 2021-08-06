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
            })
    }, []);


    //---------- Create ----------//
    const handleNewQuoteChange = (event) =>{
        setNewQuote(event.target.value);
    };

    const handleNewQuoteListChange = (event) =>{
        setNewQuoteList(event.target.value);
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

    //---------- Delete ----------//
    const handleDelete = (quote)=>{
        axios
            .delete(`http://localhost:3000/yequotes/${quote._id}`)
            .then(()=>{
                axios
                    .get('http://localhost:3000/yequotes')
                    .then((response)=>{
                        setNewQuoteList(response.data)
                    })
            })
    }


    //---------- Edit ----------//
    const handleEdit = (quote)=>{
        axios
            .put(
                `http://localhost:3000/yequotes/${quote._id}`,
                {
                    quote: newQuote
                }
            ).then(()=>{
                axios
                    .get('http://localhost:3000/yequotes')
                    .then((response)=>{
                        setNewQuoteList(response.data)
                    })
            })
    }

    return(
        <>
            <h1>Kanye Rest</h1>

            <form onSubmit={handleNewQuoteSubmit}>
                New Quote: <input type="text" onChange={handleNewQuoteChange}/><br/>
                <input type="submit" value="New Kanye Quote"/>
            </form>

            <br/>
            <br/>

            <h2>Quotes</h2>



            {newQuoteList.length > 0 ?
                <ul>
                    {
                        newQuoteList.map((quote) => {
                            return(
                                    <li>
                                        <p>{quote.quote}</p>
                                        <button onClick={(event)=>{handleDelete(quote)}}>delete
                                        </button>

                                        <details>
                                            <summary>
                                                Edit Quote
                                            </summary>
                                            <form onSubmit={()=>{handleEdit(quote)}}>
                                                Quote: <input type="text" onChange={handleNewQuoteChange}/>
                                                <input type="submit" value="Save Change"/>
                                            </form>
                                        </details>
                                    </li>
                            )
                        })
                    }
                </ul>
                : <h1>false</h1>}


        </>

    );
}

export default App;


// <ul>
//     {
//         newQuoteList.map((quote) => {
//             return(
//                 <>
//                     <li>
//                         {quote.quote}
//                     </li>
//                 </>
//             )
//         })
//     }
// </ul>

// <ul>
//     {
//
//         newQuoteList.length > 0 ?
//         newQuoteList.map((singleQuote) => {
//             return<li>
//                 <strike>{singleQuote.quote}</strike>
//             </li>
//         })
//         :
//         <h1>loading...</h1>
//
//
//     }
// </ul>


//random changes
