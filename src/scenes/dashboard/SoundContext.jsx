import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import sounds from '../../sounds/index';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('volume');
    return savedVolume !== null ? parseFloat(savedVolume) : 0.5;
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [currentSound, setCurrentSound] = useState(() => {
    const savedSound = localStorage.getItem('currentSound');
    return savedSound && sounds[savedSound] ? savedSound : 'defaultSound';
  });

  const audioRef = useRef(new Audio(sounds[currentSound]));

  const stopSound = () => {
    if(audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playSound = () => {
    if (soundEnabled) {
      let audio = audioRef.current;
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
      audio
        .play()
        .catch((error) => console.error('Error playing sound:', error));
    }
  };

  const setSoundVolume = (newVolume) => {
    setVolume(newVolume);
    localStorage.setItem('volume', newVolume.toString());
  };

  const handleSetCurrentSound = (soundKey) => {
    if (sounds[soundKey]) {
      localStorage.setItem('currentSound', soundKey);
      audioRef.current.pause();
      audioRef.current = new Audio(sounds[soundKey]);
      audioRef.current.volume = volume;
      setCurrentSound(soundKey);
    }
  };

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound: () => setSoundEnabled(!soundEnabled),
        playSound,
        stopSound,
        setSoundVolume,
        volume,
        setCurrentSound: handleSetCurrentSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
