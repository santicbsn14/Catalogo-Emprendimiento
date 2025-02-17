import React from 'react';
import { useCart } from '../Contexts/CartContext';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    bulto:number;
    image: string;
  };
  onClick: () => void; // Función para manejar el clic en el modal
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  const { addToCart } = useCart();

  return (
    <div
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          ...styles.image,
          ...(hovered ? styles.imageHover : {}),
          objectFit: "cover" as React.CSSProperties["objectFit"], // 🔹 Solución aquí
        }}
      />
      <h3 style={styles.title}>{product.name}</h3>
      <p style={styles.price}>${product.price}</p>
      <p style={styles.description}></p>
      <div style={styles.buttonsContainer}>
        <button
          onClick={(event) => {
            event.stopPropagation(); // Detiene la propagación del clic
            addToCart(product);
          }}
          style={{
            padding: '8px 12px',
            backgroundColor: '#C80000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Agregar al carrito
        </button>
        <button
          onClick={onClick} // Abre el modal
          style={{
            padding: '8px 12px',
            backgroundColor: 'black',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '8px',
          }}
        >
          Ver imagen
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e63946', // Bordes en rojo vibrante
    borderRadius: '10px',
    padding: '16px',
    textAlign: 'center' as React.CSSProperties['textAlign'],
    width: '220px',
    boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)', // Sombra roja
    backgroundColor: '#111', // Fondo gris oscuro para armonizar con el negro
    color: '#fff', // Texto blanco
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHover: {
    transform: 'scale(1.08)', // Se agranda un poco más
    boxShadow: '0 6px 12px rgba(230, 57, 70, 0.5)', // Sombra más fuerte
  },
  image: {
    width: '100%',
    aspectRatio: '4/3', // Ajusta según el tipo de imágenes
    objectFit: 'cover',
    borderRadius: '8px',
  },
  
  imageHover: {
    transform: 'scale(1.1)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold' as React.CSSProperties['fontWeight'],
    color: '#e63946', // Título en rojo vibrante
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold' as React.CSSProperties['fontWeight'],
    color: '#fff',
    margin: '8px 0',
  },
  description: {
    fontSize: '14px',
    color: '#ccc', // Texto más tenue para la descripción
  },
  buttonsContainer: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
};

export default ProductCard;
