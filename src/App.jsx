import { useState, useEffect } from 'react';
import './App.css';


function CookiesComponent() {
  const [cookies, setCookies] = useState([]);
  const [error, setError] = useState(null);
  const [singleCookie, setSingleCookie] = useState(null);

  useEffect(() => {
    async function getCookies() {
      try {
      
        const response = await fetch({host: "localhost", database: "e_commerce_database", port: 5432, ssl: false, user: "postgres"}); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        if (json) {
          setCookies(json);
        } else {
          throw new Error('Cookies data is not available');
        }
      } catch (error) {
        setError(error.message);
      }
    }

    getCookies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (singleCookie) {
    return (
      <>
        <h1 id="title">Whip'd Cookies!</h1>
        <div className="cookie-detail">
          <h2>{singleCookie.name}</h2>
          <p>{singleCookie.price}</p>
          <img src={singleCookie.img_url} alt={singleCookie.name} />
          <button onClick={() => setSingleCookie(null)}>Back to list</button>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 id="title">Whip'd Cookies!</h1>
      {cookies.length === 0 ? (
        <div>No cookies available</div>
      ) : (
        cookies.map((cookie) => (
          <div className="cookie" key={cookie.id}>
            <h2>{cookie.name}</h2>
            <p>{cookie.price}</p>
            <img src={cookie.img_url} alt={cookie.name} />
            <button onClick={() => setSingleCookie(cookie)}>See Details</button>
          </div>
        ))
      )}
    </>
  );
}

export default CookiesComponent;


