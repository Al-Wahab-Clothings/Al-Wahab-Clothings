import { Product as IProduct } from "@/type"
import Container from "./Container"
import { getChickenKari, getEmbroided, getKhaddar, getLawn } from "@/helpers"
import ProductsData from "./ProductsData"

export default async function Product() {
    const lawn: IProduct[] = await getLawn()
    const embroided: IProduct[] = await getEmbroided()
    const chickenKari: IProduct[] = await getChickenKari()
    const khaddar: IProduct[] = await getKhaddar()

    return (
        <div id="products">
            <Container>
                <ProductsData
                    lawn={lawn}
                    embroided={embroided}
                    chickenKari={chickenKari}
                    khaddar={khaddar}
                />
            </Container>
        </div>
    )
}
