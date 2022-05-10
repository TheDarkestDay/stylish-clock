import { getRandomQuote } from './../firebase/functions';
import { useState, useEffect } from 'react';

type Quote = {
  text: string;
  author: string;
}

type State = {
  quote: Quote | null;
  isLoading: boolean;
};

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
    if (quote == null) {
      setState((oldState) => ({...oldState, isLoading: true}));

      getRandomQuote()
        .then((result) => {
          const quote = result.data;

          setState((oldState) => ({...oldState, quote, isLoading: false, shouldReload: false,}));
        })
        .catch((error) => {
          console.log('An error occurred while fetching the quote: ', error);

          setState((oldState) => ({...oldState, quote: defaultQuote, isLoading: false, shouldReload: false}));
        });
    }
  }, [setState, quote]);

  const reload = () => {
    setState((oldState) => ({...oldState, quote: null}));
  };

  return { quote, isLoading, reload };
};