"use client";

import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { Order, Product, StateProps } from "../type";
import FormattedPrice from "./FormattedPrice";
import { useEffect, useState } from "react";;
import { useSession } from "next-auth/react";
import { resetCart, saveOrder } from "@/redux/shoppingSlice";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa";

const PaymentForm = () => {
  const { productData } = useSelector((state: StateProps) => state?.shopping);
  const orderData = useSelector((state: StateProps) => state.shopping.orderData);
  const dispatch = useDispatch();

  const { userInfo }: any = useSelector(
    (state: StateProps) => state.shopping
  );

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [formErrors, setFormErrors] = useState({ name: "", phone: "", address: "" });

  const [totalAmt, setTotalAmt] = useState(0);
  useEffect(() => {
    let amt = 0;
    productData.map((item: Product) => {
      if (item.price) {
        amt += (item.price || 0) * (item.quantity || 0);
      }
    });
    setTotalAmt(amt);
  }, [productData]);

  const { data: session } = useSession();

  const validateForm = () => {
    const errors: any = {};

    // Name validation: Must contain only letters
    if (!formData.name || !/^[a-zA-Z ]+$/.test(formData.name)) {
      errors.name = "Name must contain only letters and spaces.";
    }

    // Phone validation: Must contain only digits and have at least 10 digits
    if (!formData.phone || !/^\d{10,}$/.test(formData.phone)) {
      errors.phone = "Phone number must be at least 10 digits long and contain only numbers.";
    }

    // Address validation: Must not be empty and not just a number
    if (!formData.address || !isNaN(Number(formData.address))) {
      errors.address = "Address must be a valid string.";
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error)
  };

  useEffect(() => {
    emailjs.init(`${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`);
  }, []);

  const handleResetCart = async () => {
    try {
      const res = await fetch("/api/postgres", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userInfo ? userInfo.unique_id : "Anonymous",
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error response from server:", error);
        throw new Error(error.message || "Failed to reset cart.");
      }

      const result = await res.json();
      console.log("Reset cart response:", result);

      dispatch(resetCart());
      toast.success("Cart reset successfully!");
    } catch (error) {
      console.error("Error resetting cart:", error);
      toast.error(`An error occurred: ${(error as Error).message}`);
    }
  };

  const handleAddOrders = async (
    productData: Product[],
    userInfo: any,
    session: any,
    payment: string
  ) => {
    try {
      // Construct the order data
      const orderItems = productData.map((item) => {
        // Make sure item.id exists and is valid
        if (!item.id) {
          throw new Error(`Product ID is missing for product: ${item.title}`);
        }
        console.log("Product Data:", productData);  // Check if product_id exists for each item

        return {
          product_id: item.id, // Make sure product_id is correctly populated
          quantity: item.quantity || 1,
          price: item.price,
          title: item.title,
        };
      });

      // Send POST request to create or update the order
      const createOrderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems, // Includes product_id for each item
          user_id: userInfo ? userInfo.unique_id : "Anonymous",
          username: session?.user?.name || userInfo?.username || "Anonymous",
          payment: payment, // "COD" or "paid"
        }),
      });

      const orderData = await createOrderResponse.json();

      console.log("Order Data Response:", orderData);

      if (!createOrderResponse.ok || !orderData.res) {
        // toast.error("Failed to create order");
        console.error("Error response from /api/orders:", orderData);
        return;
      }

      // Assuming orderData contains the order ID after successful creation
      const { id: orderId } = orderData.res;

      // Dispatch the saveOrder action to Redux
      dispatch(saveOrder({ order: productData, id: orderId }));

      // Optionally, notify the user
      toast.success("Order placed successfully!");
      console.log("Order placed successfully:", orderData);

      return orderData.res; // Return the orderData (e.g., for further processing)

    } catch (error) {
      console.error("Error during order creation:", error);
      toast.error("An error occurred while adding the order.");
    }
  };

  const handleSendEmail = async () => {
    try {

      // Check if productData is available for the current order
      const orderItems = productData?.length
        ? productData.map(
          (item: Product) =>
            `${item.title} (x${item.quantity})\n SKU: ${item.id || "N/A"}\n https://www.alwahabclothings.com/product/${item.id}\n\n`
        ).join(", ")
        : "No items found.";

      const customerEmailParams = {
        to_email: session?.user?.email,
        customer_name: session?.user?.name || "Customer",
        order_items: orderItems,
        total_price: totalAmt + 200,
      };

      const storeEmailParams = {
        ...customerEmailParams,
        customer_phone: formData.phone,
        customer_address: formData.address,
        to_email: "alwahabclothing2@gmail.com",
      };

      await emailjs.send(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CUSTOMER}`,
        customerEmailParams
      );

      await emailjs.send(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN}`,
        storeEmailParams
      );

      toast.success("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred while sending the email.");
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const orderPayment = "COD";
      try {
        await handleAddOrders(productData, userInfo, session, orderPayment);
        await handleResetCart();

        await handleSendEmail();
        // Redirects to the order page
        window.location.href = `/success`;

      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("An error occurred while placing your order.");
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="w-full bg-[#D6CFB4] p-4 font-medium">
      <h2 className="font-bold mb-4">Cart Totals</h2>
      <div className="border-b-[1px] border-b-orange-600 py-2">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p>
            <FormattedPrice amount={totalAmt} />
          </p>
        </div>
      </div>
      <div className="border-b-[1px] border-b-orange-600 py-2">
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p>
            <FormattedPrice amount={200} />
          </p>
        </div>
      </div>
      <div className="border-b-[1px] border-b-orange-600 py-2">
        <div className="flex items-center justify-between">
          <p>Total Price</p>
          <p>
            <FormattedPrice amount={totalAmt + 200} />
          </p>
        </div>
      </div>
      {userInfo ? (
        showForm ? (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-2">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
            </div>
            <div className="flex justify-between items-center">
              <Button type="submit" className="font-bold bg-darkText text-[#D6CFB4] mt-4 py-3 px-6">
                Submit Order
              </Button>
              <Button onClick={() => setShowForm(false)} className="font-bold text-darkText mt-4 -mr-3">
                <FaArrowUp size={15} />
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <p className="mt-2 font-sans font-normal opacity-70 animate-bounce">Fill in your details below:</p>
            <Button
              onClick={() => setShowForm(true)}
              className="font-bold bg-darkText text-[#D6CFB4] py-3 px-6 mt-4"
            >
              Proceed to Checkout
            </Button>
          </div>
        )
      ) : (
        <div>
          <Button variant="destructive" className="bg-darkText text-slate-100 mt-4 py-3 px-6 hover:bg-red-700 cursor-not-allowed duration-200 font-bold">
            Proceed to checkout
          </Button>
          <p className="text-base mt-1 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default PaymentForm;
