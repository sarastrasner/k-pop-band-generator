import { useState, useEffect } from 'react';

function Loading() {
  const [showMeme, setShowMeme] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMeme(true);
    }, 5000);
  }, [showMeme]);

  return !showMeme ? (
    <div id="loading">
      <div className="loading-ellipsis">Loading</div>
    </div>
  ) : (
    <div id="loading">
      <div className="loading-ellipsis">Loading fresh K-Pop goodness</div>
      <p>In the meantime, enjoy this meme!</p>
      <div id="wiki-link">
        <img src="https://i.imgur.com/kEhWfPK.gif" alt="Blackpink Waving" />
      </div>
    </div>
  );
}

export default Loading;
