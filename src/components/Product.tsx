import { Product as IProduct } from "@/type"
import Container from "./Container"
import { getBedsheet, getChickenKari, getCotton, getEmbroided, getKhaddar, getLawn, getLinen } from "@/helpers"
import ProductsData from "./ProductsData"

export default async function Product() {
    const lawn: IProduct[] = await getLawn()
    const cotton: IProduct[] = await getCotton()
    const khaddar: IProduct[] = await getKhaddar()
    const embroided: IProduct[] = await getEmbroided()
    const chickenKari: IProduct[] = await getChickenKari()
    const linen: IProduct[] = await getLinen()
    const bedsheet: IProduct[] = await getBedsheet()

    return (
        <div id="products">
            <Container>
                <h2 className="md:text-6xl text-4xl text-darkText my-4 text-center font-semibold font-logo">
                Season&apos;s Best Picks
                </h2>
                <ProductsData
                    lawn={lawn}
                    cotton={cotton}
                    khaddar={khaddar}
                    embroided={embroided}
                    chickenKari={chickenKari}
                    linen={linen}
                    bedsheet={bedsheet}
                />
            </Container>
        </div>
    )
}
