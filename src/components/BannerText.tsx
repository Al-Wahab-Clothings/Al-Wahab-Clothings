import Link from "next/link";
import Container from "./Container";
import { motion } from "framer-motion";
import { FaBox } from 'react-icons/fa';

interface Props {
  title: string;
}

const BannerText = ({ title }: Props) => {
  return (
    <div className="hidden md:inline-block absolute top-0 left-0 w-full h-full pl-16">
      <Container className="flex h-full flex-col gap-y-6 justify-center">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:text-7xl font-bold text-darkText md:text-5xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-darkText"
        >
          Stock up on Eid Wear and limited edition collections on our <br />
          awesome mid-season sale.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex gap-x-4 mt-2"
        >
          <button className="py-4 px-8 rounded-full text-[#D6CFB4] hover:text-darkText bg-darkText hover:bg-[#D6CFB4] duration-200 text-sm uppercase font-semibold hover:shadow-lg flex gap-2 items-center justify-center">
            <Link href="https://wa.me/c/923242886759" target="blank" className="flex gap-2 items-center" aria-label="View Catalogs" >
              <FaBox size={15} />
              Visit Cataloge
            </Link>
          </button>
          <button
            className="py-4 px-8 rounded-full text-[#D6CFB4] hover:text-darkText bg-darkText hover:bg-[#D6CFB4] duration-200 text-sm uppercase font-semibold hover:shadow-lg flex gap-2 items-center justify-center" >
            <Link href="#products" aria-label="Shop Now">
              Shop Now
            </Link>
          </button>
        </motion.div>
      </Container>
    </div>
  );
};

export default BannerText;