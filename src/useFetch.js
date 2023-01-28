import { useEffect, useState } from "react";

export default function useFetch(url, param = "") {
  const [data, setData] = useState({
    data: [],
    error: "",
    isPending: true,
    filtered: [],
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
              filtered: json,
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
  }, [url, param]);
  return [data, setData];
}
