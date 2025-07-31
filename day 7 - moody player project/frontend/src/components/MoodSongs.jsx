import React, { useState } from 'react';

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className='w-full mt-10'>
      <h2 className='text-lg font-semibold mb-6'>Recommended Tracks</h2>
      <div className='flex flex-col gap-6'>
        {Songs.map((song, index) => (
          <div
            key={index}
            className='flex items-center justify-between border-b pb-3'
          >
            <div>
              <p className='font-medium'>{song.title}</p>
              <p className='text-sm text-gray-500'>{song.artist}</p>
            </div>
            <div>
              {isPlaying === index && (
                <audio
                  autoPlay
                  controls={false}
                  src={song.url}
                  style={{ display: 'none' }}
                />
              )}
              <button onClick={() => handlePlayPause(index)}>
                {isPlaying === index ? (
                  <i className="ri-pause-line text-lg"></i>
                ) : (
                  <i className="ri-play-line text-lg"></i>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSongs;
