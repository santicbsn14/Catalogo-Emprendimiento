import React from 'react';
import { useCart } from '../Contexts/CartContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, clearCart } = useCart(); // Usamos updateQuantity del contexto

  // Función para verificar si un valor es un número válido
  const toNumber = (value: unknown) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const generateWhatsAppLink = (): string => {
    const businessPhone = '5493364341408'; // Número del negocio
    const message = cart
      .map((product, index) => {
        const price = toNumber(product.price);
        const bulto = toNumber(product.bulto);
        const quantity = toNumber(product.quantity);
        console.log(`Producto ${index + 1}: ${product.name}, Price: ${price}, Bulto: ${bulto}, Quantity: ${quantity}`);
        return `${index + 1}. ${product.name} - ${quantity} bultos x ${bulto} unidades = $${price * bulto * quantity}`;
      })
      .join('\n');

    const url = `https://wa.me/${businessPhone}?text=${encodeURIComponent(
      `Hola, quiero hacer un pedido:\n\n${message}`
    )}`;
    return url;
  };

  // Calcular total sumando el precio total de cada producto
  const total = cart.reduce(
    (acc, product) => {
      const price = toNumber(product.price);
      const bulto = toNumber(product.bulto);
      const quantity = toNumber(product.quantity);
      console.log(`Producto: ${product.name}, Price: ${price}, Bulto: ${bulto}, Quantity: ${quantity}`);
      return acc + price * bulto * quantity;
    },
    0
  );

  if (cart.length === 0) {
    return <p>No tienes productos en el carrito.</p>;
  }

  return (
    <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Carrito</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((product, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              borderBottom: '1px solid #ddd',
              paddingBottom: '10px',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                marginRight: '10px',
                borderRadius: '5px',
              }}
            />
            <span style={{ flex: 1 }}>
              {product.name} - {product.quantity} bultos x {product.bulto} unidades = $
              {toNumber(product.price) * toNumber(product.bulto) * toNumber(product.quantity)}
            </span>
            {/* Aquí puedes permitir cambiar la cantidad */}
            <input
              type="number"
              value={product.quantity}
              min="1"
              onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
              style={{
                width: '50px',
                marginLeft: '10px',
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </li>
        ))}
      </ul>

      {/* Mostrar el total */}
      <h3>Total: ${total}</h3>

      <button
        onClick={() => window.open(generateWhatsAppLink(), '_blank')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#25D366',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Hacer Pedido
      </button>

      <button
        onClick={clearCart}
        style={{
          padding: '10px 20px',
          backgroundColor: '#C80000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
          marginLeft: '10px',
        }}
      >
        Vaciar Carrito
      </button>
    </div>
  );
};

export default Cart;

