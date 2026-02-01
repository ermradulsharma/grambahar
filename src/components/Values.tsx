import styles from './Values.module.css';

const values = [
  {
    title: "Pure, Farm-Fresh Food",
    description: "Bringing you the finest, natural ingredients straight from the farm.",
    icon: "🌱"
  },
  {
    title: "Transparency You Can Trust",
    description: "No hidden processes—just honest, farm-direct food from our roots.",
    icon: "🤝"
  },
  {
    title: "Food with Meaning",
    description: "Supporting healthier choices and local farmers, one meal at a time.",
    icon: "❤️"
  },
  {
    title: "Rooted in Heritage",
    description: "Honoring timeless farming practices for quality you can trust.",
    icon: "🏡"
  }
];

export default function Values() {
  return (
    <section id="values" className={styles.values}>
      <div className="container">
        <div className="section-title">
          <p>The GramBahar Philosophy</p>
          <h2>We Believe In</h2>
        </div>
        
        <div className={styles.grid}>
          {values.map((val, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
