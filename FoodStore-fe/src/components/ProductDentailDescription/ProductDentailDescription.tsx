import React from 'react'

interface IsDescription {
  description: string;
}
const ProductDentailDescription = ({ description }: IsDescription) => {
  return (
    <div>{description}</div>
  )
}

export default ProductDentailDescription