import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [randomQuotes, setRandomQuotes] = useState({quote: 'Quote', author: 'Author'});
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(c => c + 1);
  }
  
  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
        
        if(!res.ok){
          throw new Error("Response isn't ok!");
        }
        
        const data = await res.json();
        let currentQuoteIndex = Math.floor(Math.random() * 101)
        setRandomQuotes({
          quote: data.quotes[currentQuoteIndex].quote,
          author: data.quotes[currentQuoteIndex].author
        });
        
      }
      catch(err){
        console.log("this is it", err);
      }
    }

    fetchData();
  }, [count])

  return (
    <>
      <div id='quote-box' className='container'>
        <h2 id='text'>{randomQuotes.quote}</h2>
        <p id='author'>{randomQuotes.author}</p>
        <button id='new-quote' onClick={addCount}>New Quote</button>
        <div id='footer'>
          <button className='btn-primary'>
            <a id='tweet-quote' href="twitter.com/intent/tweet"><i className='fa fa-twitter'></i></a>
          </button>
        </div>
      </div>
    </>
  )
}

export default App
