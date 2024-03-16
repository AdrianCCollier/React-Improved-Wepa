import React, { createContext, useContext, useState } from 'react';

import currentSound from '../../sounds/MYLEG.mp3';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const sound = new Audio(currentSound);

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const playSound = () => {
    if (soundEnabled) {
      sound
        .play()
        .catch((error) => console.error('Error playing sound:', error));
    }
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
