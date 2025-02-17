import { Product } from '../Contexts/CartContext';
import logo from './Imagenes/logo-emprendimiento.jpg'

interface ModalProps {
  product: Product | null;
  onClose: () => void;
}

function Modal({ product, onClose }: ModalProps) {
  if (!product) return null; // Si no hay producto, no renderiza nada

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '20px',
          maxWidth: '90%',
          textAlign: 'center',
          position: 'relative',
          border: '10px solid rgba(200, 0, 0, 0.8)', // Marco rojo semitransparente
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Logo decorativo en la esquina superior */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '80px',
            backgroundColor: '#C80000', // Fondo rojo intenso
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <img
            src={logo} // Cambia esto a la ruta de tu logo
            alt="Logo"
            style={{
              maxWidth: '80%',
              maxHeight: '90%',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Contenido del modal */}
        <h2 style={{ marginTop: '50px', color: '#333' }}>{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: '100%',
            maxHeight: '50vh',
            borderRadius: '10px',
            border: '5px solid #C80000', // Borde rojo en la imagen
          }}
        />
        <p style={{ margin: '10px 0', color: '#555' }}>Precio: ${product.price}</p>
        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#000', // Botón negro
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
