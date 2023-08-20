import { useEffect } from 'react';

export const useAsync = (
  asyncFn,
  successFunction,
  errorFunction,
  returnFunction,
  dependencies
) => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((result) => {
      if (isActive) successFunction(result.data);
    }).catch((err) => {
      if (isActive) errorFunction(err);
    });
    return () => {
      returnFunction && returnFunction();
      isActive = false;
    };
  }, dependencies);
};