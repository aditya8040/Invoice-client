import React from "react";


const Table = ({
  selectedProducts,
  productAmounts,
  productQuant
}) => {
  return (
      <table width="97%" style={{marginLeft:12}}>
      <thead>
        <tr className="Table-header">
          <td>Description</td>
          <td>Price</td>
          <td>Discount</td>
          <td>Qty</td>
          <td>Net Amount</td>
          <td>Tax Rate</td>
          <td>Tax Type</td>
          <td>Tax Amount</td>
          <td>Total Amount</td>
        </tr>
      </thead>
      <tbody>
        {selectedProducts.map((option) => (
          <tr key={option.value} className="Table-item">
            <td>{option.product.productName}</td>
            <td>{option.product.productCost}</td>
            <td>{option.product.productCost}</td>
            <td>{productQuant[option.product.productId]}</td>
            <td>{productQuant[option.product.productId]*option.product.productCost}</td>
            <td>{option.product.productTax}%</td>
            <td>{option.product.productTaxType}</td>
            <td>{((productQuant[option.product.productId]*option.product.productCost) * (option.product.productTax))/ 100}</td>
            <td>{((productQuant[option.product.productId]*option.product.productCost) * (option.product.productTax))/ 100 + option.product.productCost*productQuant[option.product.productId]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
