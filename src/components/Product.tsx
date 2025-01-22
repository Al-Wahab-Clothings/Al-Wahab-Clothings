import { Product as IProduct } from "@/type"
import Container from "./Container"
import { getChickenKari, getEmbroided, getKhaddar, getLawn, getLinen } from "@/helpers"
import ProductsData from "./ProductsData"

export default async function Product() {
    const lawn: IProduct[] = await getLawn()
    const embroided: IProduct[] = await getEmbroided()
    const linen: IProduct[] = await getLinen()
    const chickenKari: IProduct[] = await getChickenKari()
    const khaddar: IProduct[] = await getKhaddar()

    return (
        <div id="products">
            <Container>
                <h2 className="md:text-6xl text-4xl text-darkText my-4 text-center font-semibold font-logo">
                Season&apos;s Best Picks
                </h2>
                <ProductsData
                    lawn={lawn}
                    embroided={embroided}
                    linen={linen}
                    chickenKari={chickenKari}
                    khaddar={khaddar}
                />
            </Container>
        </div>
    )
}
