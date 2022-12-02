import React from 'react'
import AuthProvider from './authContext'
import CartProvider from './cartContext'
import CategoriesProvider from './categoriesContext'
import PropertyProvider from './propertyContext'

export interface ProviderContextProps {
  children: React.ReactChild
}

const ProviderContext = ({ children }: ProviderContextProps) => {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <PropertyProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </PropertyProvider>
      </CategoriesProvider>
    </AuthProvider>
  )
}

export default ProviderContext