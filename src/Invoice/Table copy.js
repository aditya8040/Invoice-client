import React from "react";

const Tablecopy = ({ constantProp}) => {

  return (
    <>
   
      <table width="90%" className="mb-10">
        <thead>
          <tr className="Table-header">
            <td >Description</td>
            <td >Quantity</td>
            <td >Price</td>
            <td >Amount</td>
          </tr>
          
        </thead>

       
         {constantProp.map((option) => (
          <React.Fragment key={option.value}>
            <tbody>
              <tr className="Table-item">
                <td>{option.product.productName}</td>
                <td>{option.product.productQuantity}</td>
                <td> {option.product.productCost}</td>
              </tr>
            </tbody>
          </React.Fragment>
   ))}
      </table>

      <div>
    
      </div>
    </>
  );
}

export default Tablecopy;
