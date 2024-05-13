import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [randomQuotes, setRandomQuotes] = useState({quote: 'Quote', author: 'Author'});
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(c => c + 1);
  }
  
  let styles = {
    backgroundColor: '#fff1a1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
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
    
    let randomColor = '#c' + Math.ceil(Math.random() * 99999);
    let colorStr = randomColor.toString()
    
    $(".container-fluid").css('background-color', colorStr);
    $(".container-fluid").css('color', colorStr);

  }, [count])

  return (
    <>
      <div className='container-fluid' style={styles}>
        <div id='quote-box' className='container'>
          <h2 id='text'>🙶{randomQuotes.quote}</h2>
          <p id='author'>-{randomQuotes.author}</p>
          <button id='new-quote' className="btn-block" onClick={addCount}>New Quote</button>
          <div id='footer'>
            <button className='btn-primary btn-block'>
              <a id='tweet-quote' href="https://twitter.com/intent/tweet" alt="Tweet this code" target="_blank"><i className='fa fa-twitter'></i></a>
            </button>
          </div>
        <p className='text-center doneBy'>by Abdulmelik <img src="./src/assets/Abdulmelik-Logo.jpg" width={50} /></p>
        </div>
      </div>
    </>
  )
}

export default App
