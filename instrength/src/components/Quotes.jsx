import React, { useState, useEffect } from "react";
import QuoteData from "../data/quote.json";

function Quotes() {
  const [quote, setQuote] = useState({ quote: "", author: "" });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * QuoteData.length);
    const randomQuote = QuoteData[randomIndex];
    setQuote(randomQuote);
  }, []);

  return (
    <div
      id="quote-container"
      className="border-customBlue custom-glass mx-auto mt-10 px-4 py-2 w-2/3 font-semibold text-customBlue"
    >
      <h3 id="quote" className="text-2xl text-start">
        {quote.quote}
      </h3>
      <p id="author" className="mt-4 text-end">
        — {quote.author}
      </p>
    </div>
  );
}

export default Quotes;
