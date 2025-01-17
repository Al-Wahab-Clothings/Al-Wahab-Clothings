interface Amount {
    amount: number;
  }
  
  const FormattedPrice = ({ amount }: Amount) => {
    const formattedAmount = new Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    });
    return <span>{formattedAmount}</span>;
  };
  
  export default FormattedPrice;