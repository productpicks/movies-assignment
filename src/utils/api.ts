
export const fetcher = (url: string) => fetch(url)
  .then(r => r.json())
  .catch(err => {
    if (typeof err === 'string') {
      return err;
    }

    return 'Error while processing your request';
  });
