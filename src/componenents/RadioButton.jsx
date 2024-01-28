import React, { useState } from 'react';

const RadioButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = document.getElementById('myText').innerText;

    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;

    // Append the input element to the document
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Set the copied state to true
    setCopied(true);

    // Reset the copied state after a short delay
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <h3 id="myText" style={{ 
        width: "80%",
        height: "50px",
        borderRadius: "10px",
        border: "none",
        boxShadow: "0 0 25px 0 rgba(0,0,0,.15)",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {copied ? 'Text Copied!' : 'this is copied text'}
      </h3>
      <button onClick={handleCopy}>Copy Text</button>
    </div>
  );
};

export default RadioButton;
