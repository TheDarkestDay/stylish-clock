import { getFunctions, httpsCallable } from 'firebase/functions';

import { firebaseApp } from './app';

const functions = getFunctions(firebaseApp);

type GetAddressRequestData = {
  lat: number;
  long: number;
};

type GetAddressResponseData = {
  city: string;
  country: string;
};

export const getAddress = httpsCallable<GetAddressRequestData, GetAddressResponseData>(functions, 'getAddress');


type GetRandomQuoteResponseDate = {
  text: string;
  author: string;
};

export const getRandomQuote = httpsCallable<void, GetRandomQuoteResponseDate>(functions, 'getRandomQuote');