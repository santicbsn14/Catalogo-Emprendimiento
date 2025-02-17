import React, { useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  bulto: number;
  category: string;
}

interface ItemListProductsProps {
  products: Product[];
  onCardClick: (product: Product) => void;
}

const ItemListProducts: React.FC<ItemListProductsProps> = ({ products, onCardClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Obtener las categorías únicas
  const categories = Array.from(new Set(products.map((product) => product.category)));

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <style>{animationStyles}</style>

      {/* Botones de filtrado */}
      <div style={styles.buttonContainer}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              ...styles.button,
              backgroundColor: selectedCategory === category ? '#444' : '#000', // Indicar selección
            }}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)}
          style={{ ...styles.button, backgroundColor: '#000' }}
        >
          Reestablecer filtros
        </button>
      </div>

      {/* Lista de productos */}
      <div style={styles.container}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onCardClick(product)} />
        ))}
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap:  "wrap" as React.CSSProperties["flexWrap"],
    gap: '20px',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#000',
    color: '#fff',
    animation: 'fadeInUp 0.8s ease-out',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    border: ' 1px solid red',
    borderRadius: '5px',
    backgroundColor: '#000',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

const animationStyles = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default ItemListProducts;
