import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    let mostProableExpression = 0;
    let _expression = '';

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProableExpression) {
        mostProableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    console.log(_expression);

    axios.get(`http://localhost:3000/songs?mood=${_expression}`).then((response) => {
      console.log(response.data);
      setSongs(response.data.songs);
    });
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className='w-full flex flex-col items-center  lg:flex-row lg:items-start gap-6'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='w-[400px] h-[300px] object-cover rounded-xl'
      />
      <div className="flex flex-col gap-2 justify-center ">
        <h2 className='text-lg font-semibold'>Live Mood Detection</h2>
        <p className='text-sm text-gray-500 max-w-xs'>
          Your current mood is being analyzed in real-time. Enjoy music tailored to your feelings.
        </p>
        <button
          onClick={detectMood}
          className='mt-4 w-fit px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 active:scale-95 transition'
        >
          Start Listening
        </button>
      </div>
    </div>
  );
}
