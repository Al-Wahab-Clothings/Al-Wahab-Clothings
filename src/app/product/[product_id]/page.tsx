import Container from "@/components/Container";
import { getSingleProduct, getTrendingProduct } from "@/helpers";
import { Product } from "../../../type";
import ProductsData from "@/components/ProductsCard";
import SingleProduct from "@/components/SingleProduct";

const ProductsPage = async (props: any) => {
  const _id = props.params.product_id;
  const product = await getSingleProduct(_id);
  const data = await getTrendingProduct();

  return (
    <div>
      <Container>
        <SingleProduct product={product} />
        <div>
          {/* Conditionally display trending products header */}
          {data?.length > 0 && (
            <p className="text-4xl py-5 text-darkText my-4 font-semibold font-logo">
              Trending Products
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {data?.map((item: Product) => (
              <ProductsData key={item.id} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;