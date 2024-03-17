import React, { createContext, useContext, useState } from 'react';

import currentSound from '../../sounds/MYLEG.mp3';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('volume');
    return savedVolume !== null ? parseFloat(savedVolume) : 0.5;
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const sound = new Audio(currentSound);
  sound.volume = volume;

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const playSound = () => {
    if (soundEnabled) {
      sound
        .play()
        .catch((error) => console.error('Error playing sound:', error));
    }
  };

  const setSoundVolume = (newVolume) => {
    setVolume(newVolume);
    localStorage.setItem('volume', newVolume.toString());
    sound.volume = newVolume;
  };

  return (
    <SoundContext.Provider
      value={{ soundEnabled, toggleSound, playSound, setSoundVolume, volume }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
