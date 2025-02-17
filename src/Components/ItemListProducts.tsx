import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "./ItemListProducts.css"; // Importar el CSS externo

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

const ItemListProducts: React.FC<ItemListProductsProps> = ({
  products,
  onCardClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <div className="button-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="button"
            style={{ backgroundColor: selectedCategory === category ? "#444" : "#000" }}
          >
            {category}
          </button>
        ))}
        <button onClick={() => setSelectedCategory(null)} className="button">
          Reestablecer filtros
        </button>
      </div>

      <div className="container">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onCardClick(product)} />
        ))}
      </div>
    </>
  );
};

export default ItemListProducts;
