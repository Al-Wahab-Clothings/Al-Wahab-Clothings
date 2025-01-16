import { Product as IProduct } from "@/type"
import ProductsData from "./ProductData"
import Container from "./Container"
import { getProductData } from "@/helpers"

export default async function Product() {
    const data: IProduct[] = await getProductData()

    return (
        <div id="products" >
        <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((item) => (
                <ProductsData item={item} key={item.id} />
            ))}
        </Container>
        </div>
    )
}