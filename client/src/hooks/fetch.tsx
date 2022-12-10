import React from "react";

export const useFetch = <T,>(fetchFunc: () => Promise<T>, dep: any[] = []) => {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<any>(null);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function makeRequest() {
      try {
        setLoading(true);
        const data = await fetchFunc();
        setData(data);
        if (error) {
          setError(null);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    makeRequest();
  }, dep);

  return {
    data,
    isLoading,
    error,
  };
};
