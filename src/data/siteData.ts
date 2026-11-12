export interface Product {
  id: string;
  name: string;
  weight: string;
  discount: string;
  price: number;
  originalPrice: number;
  bestPrice: number;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'combo-small',
    name: 'Patali Gur & Nolen Gur',
    weight: '700gm + 750gm',
    discount: '10.1 % Off',
    price: 899,
    originalPrice: 1000,
    bestPrice: 827,
    image: '/images/product-combo-small.webp',
    description: 'Special winter handcrafted combo of solid Patali Gur and liquid Nolen Gur from rural date palms of Nadia.'
  },
  {
    id: 'nolen-gur-750',
    name: 'Nolen Gur (liquid date palm jaggery)',
    weight: '750gm',
    discount: '9.3 % Off',
    price: 499,
    originalPrice: 550,
    bestPrice: 474,
    image: '/images/product-nolen-gur.webp',
    description: 'Pure liquid date palm jaggery (Jhola Nolen Gur) tapped fresh at dawn, packed with authentic aroma.'
  },
  {
    id: 'combo-family',
    name: 'Patali Gur & Nolen Gur',
    weight: '1.4kg + 1.5kg',
    discount: '14 % Off',
    price: 1720,
    originalPrice: 2000,
    bestPrice: 1582,
    image: '/images/product-bulk-family.jpg',
    description: 'Bulk family pack for the true jaggery lovers. Ideal for making traditional winter sweets and Pithe Puli.'
  }
];

export const HERO_BANNERS = [
  {
    image: '/images/banner-poster-4.webp',
    alt: 'GramBahar Winter Jaggery Collection',
    title: 'Authentic Taste of Nature',
    subtitle: 'Handcrafted Patali Gur & Nolen Gur straight from the pristine date palms of Bengal.'
  },
  {
    image: '/images/banner-poster-2.webp',
    alt: 'GramBahar Traditional Artisanal Gur',
    title: 'Pure, Farm-Fresh Patali Gur',
    subtitle: 'Preserving our childhood heritage through age-old natural tapping traditions.'
  },
  {
    image: '/images/banner-poster-3.webp',
    alt: 'GramBahar Winter Combos',
    title: 'Super Saver Combos',
    subtitle: 'Special discounts on traditional Patali & Nolen Gur duos. Free Pan-India Delivery.'
  }
];

export const VALUES = [
  {
    title: 'Pure, Farm-Fresh Food',
    description: 'Bringing you the finest, natural ingredients straight from the farm.',
    icon: '/images/authenticity.avif'
  },
  {
    title: 'Transparency You Can Trust',
    description: 'No hidden processes—just honest, farm-direct food.',
    icon: '/images/brutal-honesty.avif'
  },
  {
    title: 'Food with Meaning',
    description: 'Supporting healthier choices and local farmers, one meal at a time.',
    icon: '/images/purpose.avif'
  },
  {
    title: 'Rooted in Heritage',
    description: 'Honoring timeless farming practices for quality you can trust.',
    icon: '/images/tradition-culture.avif'
  }
];

export const STATS = [
  { value: '200+', label: 'Farmers are directly benefited' },
  { value: '20,000+', label: 'Orders placed pan India' },
  { value: '70', label: 'Years of traditional experience' }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sharmistha Sikdar',
    initial: 'S',
    rating: 5,
    text: 'Very nice and tasty. So I ordered again.',
    location: 'Kolkata, WB'
  },
  {
    id: 2,
    name: 'Sangita sarkar',
    initial: 'S',
    rating: 5,
    text: 'Khub bhalo taste.....akdom fresh ....khub taratari delivery o diye deachen ...',
    location: 'Bengaluru, KA'
  },
  {
    id: 3,
    name: 'Rohit Sen',
    initial: 'R',
    rating: 5,
    text: 'Pure & authentic product. The fragrance of authentic Nolen Gur took me back to village days.',
    location: 'Delhi NCR'
  },
  {
    id: 4,
    name: 'Ananya Chatterjee',
    initial: 'A',
    rating: 5,
    text: "I've tried many brands, but GramBahar's Patali Gur is exactly like what we used to get in our village.",
    location: 'Mumbai, MH'
  }
];

export const SOCIAL_POSTS = [
  {
    id: 1,
    title: 'Vapa Pitha Recipe | Bhapa Pitha with Gram Bahar Patali Gur',
    image: '/images/social-media/gram-bahar-social-media-review-and-post-6.webp',
    link: 'https://www.facebook.com/share/v/1DzuwbpNAn/'
  },
  {
    id: 2,
    title: 'Gram bahar er nolen gurer patali dea sahi tukda aha',
    image: '/images/social-media/gram-bahar-social-media-review-and-post-1.webp',
    link: 'https://www.facebook.com/share/p/174WrPEVpw/'
  },
  {
    id: 3,
    title: 'Gram bahar er nolen gur dea makha sandesh 🤗',
    image: '/images/social-media/gram-bahar-social-media-review-and-post-5.webp',
    link: 'https://www.instagram.com/reel/C1EYuP6rdk5/?igsh=Nmh3c3Q5bHM3amkw'
  },
  {
    id: 4,
    title: 'Gram bahar er nolen gurer patali dea sahi tukda aha | Gram Bahar',
    image: '/images/social-media/gram-bahar-social-media-review-and-post-2.webp',
    link: 'https://www.instagram.com/reel/C2aBigIywpE/?igsh=MXR3Mmhzc3BkbTZ1aQ=='
  },
  {
    id: 5,
    title: 'ক্ষীর পুলি বানানো তোমার relationship এর মতো প্যাঁচালো নয় 🔥 Kheerpuli recipe with Nolen Gur',
    image: '/images/social-media/gram-bahar-social-media-review-and-post-3.webp',
    link: 'https://www.facebook.com/share/p/18Av1aq3xV/'
  },
  {
    id: 6,
    title: 'অত্যন্ত যত্নের সাথে প্রতিদিন পৌঁছে যাচ্ছে আপনাদের পছন্দের প্রিমিয়াম পাটালি গুড় ঘরে ঘরে ✈️ Free Delivery',
    image: '/images/social-media/gram-bahar-social-media-review-and-post-4.webp',
    link: 'https://www.instagram.com/gram_bahar/'
  }
];

