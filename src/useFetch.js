import { useEffect, useState } from "react";

export default function useFetch(url, triger, param = "") {
  const [data, setData] = useState({
    data: [],
    error: "",
    isPending: true,
  });

  useEffect(() => {
    fetch(`${url}/${param}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) =>
        setData(
          (prev) =>
            (prev = {
              ...prev,
              data: json,
              isPending: false,
            })
        )
      )
      .catch((error) =>
        setData(
          (prev) =>
            (prev = {
              ...prev,
              error: error,
            })
        )
      );
  }, [url, param, data.triger]);
  return [data, setData];
}
