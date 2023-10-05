import path from "path";
import fs from "fs/promises"; //it is node.js module.We can't use it in client side code.
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData); //it is convert normal javascript object.
  //Have to return an object
  //The props down below represent the props in HomePade component.
  //First, the async function executes and prepares props for HomePage component.
  //The code inside this function never renders on the client side. That's why it is safe to use for credentials, validations, etc
  return {
    props: {
      products: data.products,
    },
  };
}
export default HomePage;
