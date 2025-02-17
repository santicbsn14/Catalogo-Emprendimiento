
import './App.css'
import ItemListProducts from './Components/ItemListProducts';
import logo from './Components/Imagenes/logo-emprendimiento.jpg'
import { useState } from 'react';
import Modal from './Components/Modal';
import { CartProvider, Product } from './Contexts/CartContext';
import CartModal from './Components/CartModal';
import { ToastContainer } from 'react-toastify';

function App() {
  const products = [
    // Marca Cristar - Vasos cerveceros
    { id: 1, name: "Vaso Turín x665cc", price: 2984, category: "Vasos cerveceros", bulto: 24, image: "https://i.postimg.cc/0N92w1Qg/vaso-turin.webp" },
    { id: 2, name: "Vaso Berlín x547cc", price: 2138.50, category: "Vasos cerveceros", bulto: 24, image: "https://i.postimg.cc/yYFDgPPZ/Berlin-0393webp.webp" },
    { id: 3, name: "Vaso Múnich x437cc", price: 2537, category: "Vasos cerveceros", bulto: 12, image: "https://i.postimg.cc/GtvmDLkC/munich.webp" },
    { id: 4, name: "Vaso Kassel x398cc", price: 2189, category: "Vasos cerveceros", bulto: 48, image: "https://i.postimg.cc/GmXhGSsH/Kassel-05512-1.webp" },
    { id: 5, name: "Vaso 'Pub' x590cc", price: 1692, category: "Vasos cerveceros", bulto: 12, image: "https://i.postimg.cc/wBtHJxpG/Vaso-cervecero-Pub-1.webp" },
    { id: 6, name: "Vaso Milán x391cc", price: 2636, category: "Vasos cerveceros", bulto: 36, image: "https://i.postimg.cc/BvFk4js4/Mil-n-0424-03-1.webp" },
    { id: 7, name: "Vaso Pilsener x296cc", price: 1840, category: "Vasos cerveceros", bulto: 48, image: "https://i.postimg.cc/bJ8CPL39/Rostock-0122-04-1.webp" },
    { id: 8, name: "Jarra Cervecera x410cc", price: 4470, category: "Vasos cerveceros", bulto: 12, image: "https://i.postimg.cc/13hDbXWp/Jarro-Lisboa-07-1.webp" },
    { id: 9, name: "Copa Praga x442cc", price: 1939, category: "Vasos cerveceros", bulto: 12, image: "https://i.postimg.cc/Th8W8NcR/Copa-Praga-04-1.webp" },
    { id: 10, name: "Vaso pinta x590cc", price: 2238, category: "Vasos cerveceros", bulto: 12, image: "https://i.postimg.cc/FFkZ6MrX/cristar-pinta-590cc-1.webp" },
  
    // Marca Cristar - Cocktail and Bar
    { id: 11, name: "Copa Martini x264cc", price: 2485, category: "Cocktail and Bar", bulto: 12, image: "https://i.postimg.cc/HnwGpVCf/Copa-martini.webp" },
    { id: 12, name: "Copa Margarita x266cc", price: 2984, category: "Cocktail and Bar", bulto: 12, image: "https://i.postimg.cc/NFSt0WyH/Margarita-IA-1.webp" },
    { id: 13, name: "Copón Gran Vino Premier x620cc", price: 2735, category: "Cocktail and Bar", bulto: 24, image: "https://i.postimg.cc/FHK66P7t/Premier-Copa-4740-13-1.webp" },
    { id: 14, name: "Copa Ginebra x653cc", price: 2735, category: "Cocktail and Bar", bulto: 12, image: "https://i.postimg.cc/P5BMMKDQ/GINEBRA.webp" },
  
    // Marca Luminarc - Platos
    { id: 15, name: "Plato playo Milano 27cm", price: 2670, category: "Platos", bulto: 24, image: "https://i.postimg.cc/2SWJtB9d/Milano-4-1.webp" },
    { id: 16, name: "Plato hondo 22cm", price: 2402, category: "Platos", bulto: 24, image: "https://i.postimg.cc/dVS2GWj4/hondo-1.webp" },
    { id: 17, name: "Plato playo 23cm", price: 1100, category: "Platos", bulto: 24, image: "https://i.postimg.cc/y8wTwQ3W/labrado.webp" },
    { id: 18, name: "Plato postre 19cm", price: 925, category: "Platos", bulto: 24, image: "https://i.postimg.cc/t4SgTwNC/plato-postre-19cm.webp" },
  
    // Marca Luminarc - Copas y Vasos
    { id: 19, name: "Copa vino x550cc", price: 7150, category: "Copas y Vasos", bulto: 24, image: "https://i.postimg.cc/HWh3wkWQ/serena-copa-1.webp" },
    { id: 20, name: "Copa vino x470cc", price: 6630, category: "Copas y Vasos", bulto: 24, image: "https://i.postimg.cc/x1rgHtGv/serena-copa-470cc-1.webp" },
    { id: 21, name: "Copa vino x350cc", price: 6335, category: "Copas y Vasos", bulto: 24, image: "https://i.postimg.cc/fTMYhpvg/serena-350-1.webp" },
    { id: 22, name: "Vaso alto x400cc", price: 5850, category: "Copas y Vasos", bulto: 24, image: "https://i.postimg.cc/BvwGJrD5/vinetis-alto-1.webp" },
    { id: 23, name: "Vaso alto x360cc", price: 5850, category: "Copas y Vasos", bulto: 24, image: "https://i.postimg.cc/kMKLH6jv/Vinetis-bajo-x360cc.webp" },

      // Marca Arcoroc
    { id: 24, name: "Vaso bajo templado x350cc", price: 3700, bulto: 12, category: "Vasos Arcoroc", image: "https://i.postimg.cc/90cMvC29/vasos-360.webp" },
    { id: 25, name: "Vaso alto templado x350cc", price: 3700, bulto: 12, category: "Vasos Arcoroc", image: "https://i.postimg.cc/90cMvC29/vasos-360.webp" },
    { id: 26, name: "Vaso superior alto templado x650cc", price: 6629, bulto: 12, category: "Vasos Arcoroc", image: "https://i.postimg.cc/HjGSpZSb/superaltotemplado.webp" },
    { id: 27, name: "Vaso sodero templado x160cc", price: 2635, bulto: 12, category: "Vasos Arcoroc", image: "https://i.postimg.cc/htv0kq4N/sodita.webp" },
    { id: 28, name: "Vaso whisky x380cc", price: 4256, bulto: 12, category: "Vasos Arcoroc", image: "https://i.postimg.cc/qM5KC60Z/whisky.webp" },
    { id: 29, name: "Vaso alto x360cc", price: 2531, bulto: 12, category: "Vasos Arcoroc", image: "https://i.postimg.cc/43hjTcNC/vaso-alto.webp" },
    { id: 30, name: "Copa agua x420cc", price: 5800, bulto: 24, category: "Copas Arcoroc", image: "https://i.postimg.cc/1343wvMp/copa-agus.webp" },
    { id: 31, name: "Copa agua x310cc", price: 5418, bulto: 24, category: "Copas Arcoroc", image: "https://i.postimg.cc/1343wvMp/copa-agus.webp" },
    { id: 32, name: "Copa degustación x215cc", price: 8225, bulto: 24, category: "Copas Arcoroc", image: "https://i.postimg.cc/vZnCJ9ZJ/copa-degus.webp" },
    { id: 33, name: "Vaso alto x220cc", price: 2530, bulto: 12, category: "Vasos Arcoroc", image: "https://i.postimg.cc/26gK9Sfk/vasoalto.webp" },

    { id: 34, name: "Vaso Cervecero Tulip templado x580cc", price: 4725, category: "Vasos cerveceros Arcoroc", bulto: 24, image: "https://i.postimg.cc/Hs6rhtVp/tulip.webp" },
    { id: 35, name: "Vaso Cervecero Cervoice x500cc", price: 9997, category: "Vasos cerveceros Arcoroc", bulto: 24, image: "https://i.postimg.cc/NMy0Zh2Y/cervoice.webp" },
    { id: 36, name: "Vaso Cervecero Conique x570cc", price: 5049, category: "Vasos cerveceros Arcoroc", bulto: 48, image: "https://i.postimg.cc/Z5VKRYr4/Conique.webp" },
    { id: 37, name: "Vaso Cervecero Noniq x560cc", price: 4721, category: "Vasos cerveceros Arcoroc", bulto: 48, image: "https://i.postimg.cc/j5JsZzBS/Nonic.webp" },
    { id: 38, name: "Vaso Cervecero Ultimate x560cc", price: 5330, category: "Vasos cerveceros Arcoroc", bulto: 24, image: "https://i.postimg.cc/SN4yfYdm/ultimate.webp" },
    { id: 39, name: "Vaso Cervecero Pilsener x390cc", price: 5941, category: "Vasos cerveceros Arcoroc", bulto: 24, image: "https://i.postimg.cc/MGnxp76m/pilsner.webp" },
      // Nuevos productos de Chef Sommelier
    { id: 40, name: "Copa x580cc", price: 8025, category: "Copas Chef Sommelier", bulto: 12, image: "https://i.postimg.cc/vmxFsGhP/copacabernet.webp" },
    { id: 41, name: "Copa x470cc", price: 7486, category: "Copas Chef Sommelier", bulto: 12, image: "https://i.postimg.cc/vmxFsGhP/copacabernet.webp" },
    { id: 42, name: "Copa x350cc", price: 5529, category: "Copas Chef Sommelier", bulto: 12, image: "https://i.postimg.cc/vmxFsGhP/copacabernet.webp" },
    { id: 43, name: "Vaso Alto x440cc", price: 7110, category: "Vasos Chef Sommelier", bulto: 24, image: "https://i.postimg.cc/MZmkxP08/vasoaltox440c.webp" }
  ];
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Estado para el producto seleccionado
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Estado para el modal del carrito

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true); // Abre el modal del producto
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false); // Cierra el modal del producto
    setSelectedProduct(null); // Limpia el producto seleccionado
  };

  const handleOpenCartModal = () => {
    setIsCartModalOpen(true); // Abre el modal del carrito
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false); // Cierra el modal del carrito
  };

  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '300px', height: 'auto', display: 'block' }}
          />
          <button
            onClick={handleOpenCartModal}
            style={{
              padding: '10px 20px',
              backgroundColor: '#C80000',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Ver Carrito
          </button>
        </div>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Catálogo de Productos</h1>
        <ItemListProducts products={products} onCardClick={handleCardClick} />
        {isProductModalOpen && (
          <Modal product={selectedProduct} onClose={handleCloseProductModal} />
        )}
        {isCartModalOpen && <CartModal onClose={handleCloseCartModal} />}
      </div>
    </CartProvider>
  );
}

export default App;