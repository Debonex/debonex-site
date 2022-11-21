import { useEffect, useState } from "react";

type UseFetchType = <T>(path: string, body: Serializable) => [T, boolean];

const usePost: UseFetchType = (path: string, body: Serializable) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();

  useEffect(() => {
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      })
      .finally(() => {
        setLoading(false);
      });
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [result, loading];
};

export default usePost;
