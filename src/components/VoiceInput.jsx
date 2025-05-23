import React, { useState } from 'react';
import recognition from '../utils/speechRecognition';
import { MdKeyboardVoice } from "react-icons/md";
import { RiVoiceprintFill } from "react-icons/ri";
const VoiceInput = ({ inputRef }) => {
  const [listening, setListening] = useState(false);

  const handleVoiceInput = () => {
    if (!inputRef?.current) return;
    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Recognized:', transcript);
    
      inputRef.current.value = transcript;

      // Optional: Move focus to the input field
      inputRef.current.focus();

      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <button className='bg-white rounded-full p-1 flex items-center mr-2 h-6 cursor-pointer' onClick={handleVoiceInput} disabled={listening}>
        
      {listening ? <RiVoiceprintFill className='w-5 h-5' /> : <MdKeyboardVoice className='w-5 h-5' />}
    </button>
  );
};

export default VoiceInput;
