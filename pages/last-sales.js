import { useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-course-39eca-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!sales) {
    return <p>No data yet</p>;
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
