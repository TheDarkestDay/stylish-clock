import { useState, useEffect } from 'react';

type Quote = {
  text: string;
  author: string;
}

type State = {
  quote: Quote | null;
  isLoading: boolean;
};

type ZenQuotesQuote = {
  a: string;
  q: string;
};

type ZenQuotesResponse = ZenQuotesQuote[];

const RANDOM_QUOTE_URL = 'https://zenquotes.io/api/random';

const ZENQUOTES_API_LINK = 'https://zenquotes.io/';

const defaultQuote = {
  author: 'Ada Lovelace',
  text: 'The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.'
};

export const useRemoteQuote = () => {
  const [state, setState] = useState<State>({
    quote: null,
    isLoading: false,
  });

  const { quote, isLoading } = state;

  useEffect(() => {
    setState((oldState) => ({...oldState, isLoading: true}));

    fetch(RANDOM_QUOTE_URL)
      .then((response) => response.json())
      .then((data: ZenQuotesResponse) => {
        const [{q: text, a: author}] = data;

        setState((oldState) => ({...oldState, quote: {author, text}, isLoading: false}));
      })
      .catch((error) => {
        console.log('An error occurred while fetching the quote: ', error);

        setState((oldState) => ({...oldState, quote: defaultQuote, isLoading: false}));
      });
  }, [setState]);

  return { quote, isLoading, attributionLink: ZENQUOTES_API_LINK };
};