import path from "path";
import fs from "fs/promises"; //it is node.js module.We can't use it in client side code.
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData); //it is convert normal javascript object.
  //Have to return an object
  //The props down below represent the props in HomePade component.
  //First, the async function executes and prepares props for HomePage component.
  //The code inside this function never renders on the client side. That's why it is safe to use for credentials, validations, etc
  if (!data) {
    //if there is no data redirect no-data page.
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.products.length === 0) {
    return { notFound: ture }; //if there are no products return 404 page.
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    //it rebuilds page in every 10 seconds.have to use it carefully because too much revalidate puts a load on the server.
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
  };
}
export default HomePage;
