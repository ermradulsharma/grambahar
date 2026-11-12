export interface PolicyContent {
  slug: string;
  title: string;
  lastUpdated?: string;
  sections: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export const POLICIES_DATA: Record<string, PolicyContent> = {
  'about-us': {
    slug: 'about-us',
    title: 'About Gram Bahar',
    sections: [
      {
        heading: 'Gram Bahar: A Symphony of Tradition, Health, and Sweetness',
        paragraphs: [
          'In the heart of Nadia, West Bengal, where the gentle breeze carries the whispers of agricultural heritage, Gram Bahar stands out as a harmonious blend of tradition, health, and sweetness. Nestled amidst the lush greenery, we are a family-run enterprise dedicated to bringing you the purest and most authentic Date Palm Jaggery (neera), a traditional sweetener deeply rooted in the soul of Indian cuisine.'
        ]
      },
      {
        heading: 'A Legacy of Tradition',
        paragraphs: [
          'Our story is an ode to the land and its people, a testament to the time-honored methods of production that have been passed down through generations. We source our jaggery from local farmers in Ranaghat and surrounding areas, who have mastered the art of extracting and processing the sap from date palm trees.',
          'This artisanal approach, a legacy inherited from their ancestors, ensures that our jaggery is free from any additives or preservatives, making it a truly natural and wholesome product.'
        ]
      },
      {
        heading: 'Honoring Time-Honored Methods',
        paragraphs: [
          'Date palm jaggery is not just a sweetener; it is a nutritional symphony, a chorus of essential minerals and vitamins that harmonize with your body’s well-being. It is rich in iron, the conductor of energy, which helps boost your energy levels and improve digestion, keeping you active and vibrant.',
          'It also contains calcium, potassium, and magnesium, the instrumentalists of bone health and muscle function, ensuring that your body remains strong and resilient. Additionally, jaggery is a natural source of antioxidants, the guardians of your cells, which help protect your body from damage, keeping you healthy and protected.'
        ]
      },
      {
        heading: 'A Commitment to Purity',
        paragraphs: [
          'At Gram Bahar, we are committed to providing our customers with the highest quality Date Palm Jaggery, ensuring that every note of flavor and every touch of goodness resonates with your taste buds and nourishes your well-being.',
          'We believe that everyone should have access to pure, natural, and wholesome food, and our jaggery is a testament to this commitment.'
        ]
      },
      {
        heading: 'Embark on a Journey of Sweetness',
        paragraphs: [
          'Join us on our journey to rediscover the goodness of nature’s finest sweeteners. Let the rich flavor and wholesome goodness of Gram Bahar Date Palm Jaggery elevate your culinary creations and nourish your body with the blessings of nature. Experience the symphony of tradition, health, and sweetness that Gram Bahar has to offer.'
        ]
      }
    ]
  },
  'contact-us': {
    slug: 'contact-us',
    title: 'Contact Us',
    sections: [
      {
        heading: 'Get in Touch with Gram Bahar',
        paragraphs: [
          'Have questions about our artisanal Patali Gur or wish to place a customized bulk or corporate order? We are always here to help you experience the true flavors of Bengal.'
        ]
      },
      {
        heading: 'Reach Us Directly',
        paragraphs: [
          '📍 Address: Ranaghat, Nadia, West Bengal, India - 741201',
          '📞 Phone: +91 9531536706 / +91 9883214823',
          '✉️ Email: grambahar.com@gmail.com',
          '💬 WhatsApp Support: +91 9531536706 (Available 24/7 for customer queries and orders)'
        ]
      }
    ]
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from grambahar.com (the "Site").'
        ]
      },
      {
        heading: 'Personal Information We Collect',
        paragraphs: [
          'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.',
          'Additionally, when you make a purchase or attempt to purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number. We refer to this information as "Order Information".'
        ]
      },
      {
        heading: 'How Do We Use Your Personal Information?',
        paragraphs: [
          'We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and order confirmations). Additionally, we use this information to communicate with you and screen our orders for potential risk or fraud.'
        ]
      },
      {
        heading: 'Sharing Your Personal Information',
        paragraphs: [
          'We share your Personal Information with third parties to help us use your Personal Information, as described above (for example, trusted delivery courier partners). We may also share your Personal Information to comply with applicable laws and regulations.'
        ]
      }
    ]
  },
  'return-policy': {
    slug: 'return-policy',
    title: 'Return Policy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Our Return Guidelines',
        paragraphs: [
          'At Gram Bahar, we take pride in offering fresh, artisanal agricultural products crafted with utmost care. Because our Patali Gur and Nolen Gur are perishable food items, returns are accepted under specific conditions.',
          'If you receive a package that is visibly damaged, leaked, or tempered with during transit, please report it to us within 48 hours of delivery along with photographic or unboxing video evidence.',
          'Once verified by our customer support team, we will promptly dispatch a fresh replacement or process a full refund as per your preference.'
        ]
      }
    ]
  },
  'refund-cancellation-policy': {
    slug: 'refund-cancellation-policy',
    title: 'Refund & Cancellation Policy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Cancellation Policy',
        paragraphs: [
          'Orders can be cancelled before they have been dispatched from our fulfillment center in Ranaghat, Nadia. Once the package has been handed over to our courier partner and a tracking ID is generated, cancellations can no longer be processed.'
        ]
      },
      {
        heading: 'Refund Process',
        paragraphs: [
          'In case of approved cancellations or defective/damaged items upon arrival, refunds will be initiated within 2 business days. The refunded amount will be credited back to your original source of payment (bank account, UPI, or card) within 5-7 business days depending on your bank.'
        ]
      }
    ]
  },
  'shipping-policy': {
    slug: 'shipping-policy',
    title: 'Shipping Policy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Pan-India Delivery',
        paragraphs: [
          'We collaborate with trusted courier partners to provide safe and efficient delivery of our handcrafted date palm jaggery across all pin codes in India. We pack all products in food-grade, airtight, secure containers to preserve freshness and aroma during transit.'
        ]
      },
      {
        heading: 'Shipping Timelines',
        paragraphs: [
          'Metro Cities: 2 - 5 business days',
          'Non-Metro Cities & Towns: 5 - 9 business days',
          'Remote / North-East / Island Areas: Up to 10 - 12 business days',
          'Orders are generally dispatched within 24-48 hours from our farm kitchen in West Bengal. You will receive a tracking link via SMS or WhatsApp upon dispatch.'
        ]
      }
    ]
  },
  'cookie-policy': {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'What Are Cookies?',
        paragraphs: [
          'Cookies are small files placed on your computer or mobile device that help us remember your preferences, keep items in your cart, and understand how you interact with our website to give you a smoother browsing experience.'
        ]
      },
      {
        heading: 'How We Use Cookies',
        paragraphs: [
          'We use essential cookies to maintain shopping cart items, remember dark/light theme choices, and ensure website security. We may also use analytics cookies to monitor site performance and popular seasonal products.'
        ]
      }
    ]
  },
  'terms-of-services': {
    slug: 'terms-of-services',
    title: 'Terms of Service',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Overview & General Conditions',
        paragraphs: [
          'This website is operated by Gram Bahar. Throughout the site, the terms "we", "us" and "our" refer to Gram Bahar. Gram Bahar offers this website, including all information, tools, and services available from this site to you, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.',
          'By visiting our site or purchasing from us, you agree to be bound by these Terms of Service. Please read them carefully before accessing or using our services.'
        ]
      },
      {
        heading: 'Products and Pricing',
        paragraphs: [
          'Prices for our products are subject to seasonal harvest variations and change without prior notice. As an artisanal farm product, color, texture, and aroma of natural date palm jaggery may naturally vary between batches.'
        ]
      },
      {
        heading: 'Governing Law',
        paragraphs: [
          'These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India, under the jurisdiction of courts in Nadia, West Bengal.'
        ]
      }
    ]
  }
};

