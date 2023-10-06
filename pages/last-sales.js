import { useEffect, useState } from "react";
import useSWR from "swr";
function LastSalesPage() {
  const [sales, setSales] = useState();
  //   const [isLoading, setIsLoading] = useState(false);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-39eca-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-39eca-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);
  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <lu>
      {sales.map((sale) => (
        <li key={sales.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </lu>
  );
}

export default LastSalesPage;
