import Image from 'next/image';
import styles from './Products.module.css';

const products = [
  {
    id: 1,
    name: "Super Saver Combo (Small)",
    weight: "700gm + 750gm",
    price: 899,
    originalPrice: 1000,
    discount: "10.1% Off",
    image: "/assets/product.png"
  },
  {
    id: 2,
    name: "Premium Patali Gur",
    weight: "750gm",
    price: 499,
    originalPrice: 550,
    discount: "9.3% Off",
    image: "/assets/product.png"
  },
  {
    id: 3,
    name: "Bulk Family Pack",
    weight: "1.4kg + 1.5kg",
    price: 1720,
    originalPrice: 2000,
    discount: "14% Off",
    image: "/assets/product.png"
  }
];

export default function Products() {
  return (
    <section id="products" className={styles.products}>
      <div className="container">
        <div className="section-title">
          <p>Our Winter Specials</p>
          <h2>Super Saver Combos</h2>
        </div>
        
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.badge}>{product.discount}</div>
              <div className={styles.imageWrapper}>
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.weight}>{product.weight}</span>
                <h3>{product.name}</h3>
                <div className={styles.pricing}>
                  <span className={styles.price}>₹ {product.price}.00</span>
                  <span className={styles.originalPrice}>₹ {product.originalPrice}.00</span>
                </div>
                <button className={`btn btn-primary ${styles.buyBtn}`}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
