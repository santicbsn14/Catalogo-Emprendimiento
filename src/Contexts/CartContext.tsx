import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

// Tipo para un producto
export interface Product {
  id: number; // Puedes cambiar esto según tu estructura de datos
  name: string;
  price: number;
  image: string;
  bulto: number; // Propiedad para el número de bulto
  quantity?: number; // Nueva propiedad para la cantidad
}

// Tipo para el contexto del carrito
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  updateQuantity: (id:  number, quantity: number) => void; // Para actualizar la cantidad de un producto
  clearCart: () => void;
}

// Creamos el contexto con un valor inicial de null
const CartContext = createContext<CartContextType | null>(null);

// Props del CartProvider
interface CartProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // Agregar un producto al carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, solo incrementamos la cantidad
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 0) + 1 } // Si quantity es undefined, usa 0
            : item
        );
      }

      // Si el producto no está en el carrito, lo agregamos con una cantidad de 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} agregado al carrito 🛒`);
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === Number(id) ? { ...item, quantity: Math.max(quantity, 1) } : item // Para evitar que la cantidad sea menor a 1
      )
    );
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
