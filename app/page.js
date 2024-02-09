'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const sentences = [
  'No',
  'Are you absolutely certain?',
  'Are you completely sure?',
  'Are you truly confident?',
  'Really and truly sure?',
  'Think again carefully.',
  'Are you positively sure?',
  'Think again deeply.',
  'Have a heart.',
  "Don't be so cold.",
  'Let kindness guide you.',
  'Be kind.',
  "Don't be mean.",
];

export default function Home() {
  const [name, setName] = useState('');
  const [nerBut, setNerBut] = useState(false);
  const [yesFontSize, setYesFontSize] = useState(20);
  const [noClickCount, setNoClickCount] = useState(0);
  const [iseYesClicked, setIsYesClicked] = useState(false);
  const [gifUrl, setGifUrl] = useState(
    'https://media0.giphy.com/media/KZAMZlHBmqZ6Zu0HBO/200w.webp'
  );

  const sendEmail = () => {
    emailjs
      .send(
        'service_4whw1cf',
        'template_qq20nkt',
        {
          user_name: 'user_name',
          to_name: name,
          from_name: 'from_name',
          user_email: 'azure.gankhulug@gmail.com',
          message: 'darchihje',
        },
        {
          publicKey: 'pc3zGbgC1CQaez_eN',
        }
      )
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };
  const noFun = () => {
    setYesFontSize((prev) => (prev += 20));
    if (noClickCount < sentences.length - 1) {
      setNoClickCount((prev) => (prev += 1));
    } else {
      setNoClickCount(1);
    }
  };
  const yesFun = () => {
    sendEmail();
    setGifUrl('https://media4.giphy.com/media/QTCSUv7EL1rXyBx8Mc/200w.webp');
    setIsYesClicked(true);
  };

  return (
    <div className="h-screen w-full flex flex-col gap-[20px] justify-center  items-center">
      {name !== '' && nerBut ? (
        <>
          <div className="w-[350px] aspect-square ">
            <Image
              src={gifUrl}
              alt="img"
              width={5000}
              height={5000}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          {iseYesClicked === false ? (
            <p className="text-2xl">Will you be my Valentine?</p>
          ) : (
            <p className="text-2xl">You are mine now</p>
          )}

          {iseYesClicked === false ? (
            <>
              <div className="flex items-center gap-6">
                <button
                  className={`bg-green-400 rounded-md px-4 py-2 `}
                  style={{ fontSize: `${yesFontSize}px` }}
                  onClick={yesFun}
                >
                  Yes
                </button>
                <button
                  className="bg-red-500 h-fit w-fit rounded-md px-4 py-2 text-[20px]"
                  onClick={noFun}
                >
                  {sentences[noClickCount]}
                </button>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <div className="flex gap-2 text-[#565656]">
          <input
            className="p-2 rounded-lg w-[250px]"
            placeholder="Нэрээ бичээрэй хөөрхөнөө"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            className="bg-white p-2 rounded-lg"
            onClick={() => {
              setNerBut(true);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
