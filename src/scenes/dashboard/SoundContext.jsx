import React, { createContext, useContext, useState, useEffect } from 'react';
import sounds from '../../sounds/index';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('volume');
    return savedVolume !== null ? parseFloat(savedVolume) : 0.5;
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentSound, setCurrentSound] = useState('defaultSound');
  const [audio, setAudio] = useState(new Audio(sounds[currentSound]));

  useEffect(() => {
    setAudio(new Audio(sounds[currentSound]));
  }, [currentSound]);

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const playSound = () => {
    if (soundEnabled) {
      audio.currentTime = 0;
      audio
        .play()
        .catch((error) => console.error('Error playing sound:', error));
    }
  };

  const setSoundVolume = (newVolume) => {
    setVolume(newVolume);
    localStorage.setItem('volume', newVolume.toString());
    audio.volume = newVolume;
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playSound,
        setSoundVolume,
        volume,
        setCurrentSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
