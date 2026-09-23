import { Product } from '../types/ecommerce';

// Import generated local images
import headphoneImg from '../assets/images/product_wireless_headphones_1790177070591.jpg';
import smartwatchImg from '../assets/images/product_smartwatch_ultra_1790177090394.jpg';
import runningShoesImg from '../assets/images/product_running_shoes_1790177104779.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    title: 'Sony WH-1000XM5 Active Noise Cancelling Wireless Headphones',
    brand: 'Sony',
    category: 'audio',
    price: 24999,
    originalPrice: 34990,
    discountPercentage: 29,
    rating: 4.8,
    ratingCount: 14280,
    image: headphoneImg,
    gallery: [headphoneImg],
    inStock: true,
    stockCount: 18,
    isAssured: true,
    fastDeliveryDate: 'Tomorrow by 11 AM',
    description: 'Industry leading noise cancellation with two processors and 8 microphones. Magnificent Sound, engineered to perfection with the Integrated Processor V1. Ultra-comfortable lightweight design with soft fit leather.',
    highlights: [
      'Auto NC Optimizer dynamically adjusts noise cancellation',
      'Up to 30-hour battery life with quick charging (3 min for 3 hours playback)',
      'Multipoint connection allows switching between two devices instantly',
      'Intuitive touch sensor controls for pause, play, volume, and voice assistant'
    ],
    specs: {
      'Driver Size': '30mm',
      'Battery Life': '30 Hours (ANC ON)',
      'Connectivity': 'Bluetooth 5.2, 3.5mm Aux',
      'Microphone': '4 Beamforming Mics',
      'Weight': '250g',
      'Warranty': '1 Year Domestic Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Arjun Verma',
        rating: 5,
        date: '12 Sep 2026',
        title: 'Best ANC headphones on the market!',
        comment: 'The noise cancellation is miraculous for flights and busy coffee shops. The comfort level is top tier, lightweight without pinching.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        author: 'Neha Roy',
        rating: 5,
        date: '28 Aug 2026',
        title: 'Crystal clear calls and insane battery',
        comment: 'Office calls are so clear, nobody hears background construction. Soundstage is punchy and warm.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-002',
    title: 'Titanium Ultra Smartwatch GPS + Cellular with Sapphire Crystal',
    brand: 'ApexTech',
    category: 'electronics',
    price: 45999,
    originalPrice: 59999,
    discountPercentage: 23,
    rating: 4.7,
    ratingCount: 8940,
    image: smartwatchImg,
    gallery: [smartwatchImg],
    inStock: true,
    stockCount: 12,
    isAssured: true,
    fastDeliveryDate: 'Tomorrow by 2 PM',
    description: 'Rugged aerospace-grade titanium case crafted for endurance and outdoor exploration. Precision dual-frequency GPS, up to 60-hour battery life on low power, 100m water resistance, and ECG cardiac sensor.',
    highlights: [
      '49mm Aerospace Titanium Case with Flat Sapphire Front Crystal',
      'Precision Dual-Frequency GPS (L1 and L5) for pinpoint trail tracking',
      'Advanced Health Sensors: ECG, Blood Oxygen, Temperature sensing, Heart Rate Zones',
      'Customizable Action Button for instant workout control and compass waypoints'
    ],
    specs: {
      'Display': '1.92-inch Always-On Retina OLED (2000 nits)',
      'Case Material': 'Titanium Grade 5',
      'Water Resistance': '100m / Dive certified to 40m',
      'Battery': 'Up to 36 hours regular / 60 hours low power',
      'Sensors': 'ECG, SpO2, Skin Temp, Depth Gauge',
      'Warranty': '2 Years Manufacturer Warranty'
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Karan Mehra',
        rating: 5,
        date: '04 Sep 2026',
        title: 'Built like a tank with extreme screen clarity',
        comment: 'Even under direct bright noon sunlight, the 2000 nits screen is effortlessly readable. Battery easily lasts 2.5 full days.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-003',
    title: 'AeroPulse Pro Responsive Nitrogen-Infused Running Sneakers',
    brand: 'Velocity',
    category: 'sports',
    price: 6499,
    originalPrice: 10999,
    discountPercentage: 41,
    rating: 4.6,
    ratingCount: 5320,
    image: runningShoesImg,
    gallery: [runningShoesImg],
    inStock: true,
    stockCount: 25,
    isAssured: true,
    fastDeliveryDate: '2 Days Delivery',
    description: 'Engineered with ultra-lightweight breathable jacquard mesh and supercritical nitrogen-infused foam midsole for maximum energy return on road and marathon courses.',
    highlights: [
      'Nitrogen-infused foam delivers 82% energy return on stride impact',
      'Seamless engineered upper prevents chafing during ultra-distance runs',
      'High-traction rubberized outsole grips wet asphalt and trail surfaces',
      'Reinforced heel counter locks foot securely in neutral alignment'
    ],
    specs: {
      'Shoe Type': 'Neutral Road Running',
      'Drop': '8mm Heel-to-Toe Drop',
      'Upper Material': 'Engineered Monomesh',
      'Midsole': 'Supercritical Nitrogen Polyether',
      'Weight': '210g (UK Size 8)',
      'Warranty': '6 Months Warranty against manufacturing defects'
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'Rohan Deshmukh',
        rating: 5,
        date: '15 Aug 2026',
        title: 'Ran my half marathon PB with these!',
        comment: 'Super bouncy and doesn’t bottom out after 15km. Extremely breathable and fits true to size.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-004',
    title: 'Apple iPhone 16 Pro 256GB - Natural Titanium',
    brand: 'Apple',
    category: 'mobiles',
    price: 119900,
    originalPrice: 129900,
    discountPercentage: 8,
    rating: 4.9,
    ratingCount: 31200,
    image: smartwatchImg, // high-end tech aesthetic
    gallery: [smartwatchImg],
    inStock: true,
    stockCount: 7,
    isAssured: true,
    fastDeliveryDate: 'Tomorrow by 10 AM',
    description: 'Forged in titanium with an innovative 48MP Fusion camera system, Camera Control button, and the revolutionary A18 Pro chip for unprecedented mobile performance.',
    highlights: [
      'A18 Pro chip with 6-core GPU powering ray tracing and Apple Intelligence',
      'Grade 5 titanium design with micro-blasted matte glass back',
      '48MP Fusion Camera with 5x Telephoto optical zoom',
      'All-day battery life with up to 27 hours video playback'
    ],
    specs: {
      'Storage': '256 GB',
      'Display': '6.3-inch Super Retina XDR OLED (120Hz ProMotion)',
      'Processor': 'A18 Pro Bionic',
      'Camera': '48MP + 48MP Ultra Wide + 12MP 5x Telephoto',
      'Security': 'Face ID with TrueDepth camera',
      'Warranty': '1 Year Apple International Warranty'
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Siddharth Nair',
        rating: 5,
        date: '20 Sep 2026',
        title: 'Camera control is unbelievable',
        comment: 'Photos look like they came from a dedicated mirrorless camera. Battery life easily lasts 1.5 days.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-005',
    title: 'MacBook Pro 14-inch M3 Pro (18GB Unified RAM, 512GB SSD) - Space Black',
    brand: 'Apple',
    category: 'electronics',
    price: 189900,
    originalPrice: 199900,
    discountPercentage: 5,
    rating: 4.9,
    ratingCount: 4180,
    image: headphoneImg,
    gallery: [headphoneImg],
    inStock: true,
    stockCount: 9,
    isAssured: true,
    fastDeliveryDate: 'Tomorrow by 1 PM',
    description: 'The M3 Pro chip powers demanding workflows like rendering 3D scenes or compiling millions of lines of code with extreme efficiency and up to 22 hours of battery life.',
    highlights: [
      'M3 Pro with 11-core CPU and 14-core GPU with hardware-accelerated ray tracing',
      'Liquid Retina XDR display with 1600 nits peak HDR brightness and ProMotion 120Hz',
      'Space Black finish with breakthrough anodization seal to reduce fingerprints',
      'Six-speaker sound system with force-cancelling woofers'
    ],
    specs: {
      'Processor': 'Apple M3 Pro',
      'Memory': '18 GB Unified RAM',
      'Storage': '512 GB NVMe SSD',
      'Display': '14.2-inch Liquid Retina XDR (3024 x 1964)',
      'Battery': 'Up to 22 hours',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3'
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'Vikram Joshi',
        rating: 5,
        date: '02 Sep 2026',
        title: 'Absolute powerhouse for software engineering',
        comment: 'Docker builds that took 4 minutes on my old laptop finish in 28 seconds. The display is pure perfection.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-006',
    title: 'Dyson V15 Detect Cordless Vacuum Cleaner with Laser Dust Revealer',
    brand: 'Dyson',
    category: 'home',
    price: 52900,
    originalPrice: 65900,
    discountPercentage: 20,
    rating: 4.7,
    ratingCount: 6810,
    image: headphoneImg,
    gallery: [headphoneImg],
    inStock: true,
    stockCount: 15,
    isAssured: true,
    fastDeliveryDate: 'Tomorrow by 3 PM',
    description: 'Dyson’s most powerful intelligent cordless vacuum. Accurately reveals invisible micro-dust with angled green laser illumination and auto-adjusts suction power based on floor debris.',
    highlights: [
      'A precisely-angled green beam reveals invisible dust on hard floors',
      'Piezo sensor counts and measures the size of particles 15,000 times/sec',
      'Up to 60 minutes of fade-free run time with click-in battery',
      'High Torque cleaner head with anti-tangle comb technology'
    ],
    specs: {
      'Suction Power': '240 Air Watts',
      'Bin Volume': '0.77 Litres',
      'Run Time': '60 Minutes',
      'Filtration': 'Whole-machine HEPA filtration (99.99% down to 0.3 microns)',
      'Weight': '3.0 kg',
      'Warranty': '2 Years Dyson Comprehensive Warranty'
    },
    reviews: [
      {
        id: 'rev-7',
        author: 'Sunita Rao',
        rating: 5,
        date: '18 Aug 2026',
        title: 'Terrifying to see how much dust was in my carpet!',
        comment: 'The laser headlight reveals every single speck. Cleaning the house takes half the time now.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-007',
    title: 'Organic Pima Cotton Relaxed Oversized Heavyweight Tee',
    brand: 'NordicThread',
    category: 'fashion',
    price: 1499,
    originalPrice: 2499,
    discountPercentage: 40,
    rating: 4.5,
    ratingCount: 3890,
    image: runningShoesImg,
    gallery: [runningShoesImg],
    inStock: true,
    stockCount: 40,
    isAssured: true,
    fastDeliveryDate: '2 Days Delivery',
    description: 'Crafted from 280 GSM combed Peruvian Pima cotton with double-needle ribbed collar and drop-shoulder tailoring for the ideal drape and all-day breathability.',
    highlights: [
      '280 GSM 100% Certified Organic Pima Cotton',
      'Pre-shrunk fabric retains fit wash after wash',
      'Zero synthetic plastic fibers or toxic formaldehyde dyes',
      'Relaxed architectural silhouette with drop shoulders'
    ],
    specs: {
      'Fit': 'Oversized Boxy Fit',
      'Fabric': '100% Pima Cotton (280 GSM)',
      'Pattern': 'Solid Chalk White',
      'Care': 'Machine wash cold, lay flat to dry',
      'Origin': 'Ethically spun and sewn in Lima, Peru'
    },
    reviews: [
      {
        id: 'rev-8',
        author: 'Amit Kapoor',
        rating: 5,
        date: '10 Sep 2026',
        title: 'Premium weight and exceptional collar retention',
        comment: 'Doesn’t bacon at the neck even after 10 washes. Fits with just the right amount of drape.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-008',
    title: 'De’Longhi Magnifica S Fully Automatic Bean-to-Cup Espresso Machine',
    brand: 'DeLonghi',
    category: 'home',
    price: 38990,
    originalPrice: 49990,
    discountPercentage: 22,
    rating: 4.8,
    ratingCount: 4720,
    image: headphoneImg,
    gallery: [headphoneImg],
    inStock: true,
    stockCount: 8,
    isAssured: true,
    fastDeliveryDate: 'Tomorrow by 4 PM',
    description: 'Grinds fresh coffee beans right before brewing for true Italian café-grade espresso, cappuccino, and latte with a manual stainless milk frothing wand.',
    highlights: [
      'Silent integrated conical burr grinder with 13 grind fineness settings',
      'Traditional stainless steel milk frother creates velvety microfoam',
      'Simple rotary dial to tailor coffee aroma strength and cup volume',
      'Removable compact brewing unit for effortless hygiene and rinse'
    ],
    specs: {
      'Pump Pressure': '15 Bar Italian Pump',
      'Water Tank': '1.8 Litres Removable',
      'Bean Container': '250g with aroma-lock seal',
      'Power': '1450 Watts Thermoblock',
      'Dimensions': '23.8 x 43.0 x 35.1 cm',
      'Warranty': '2 Years On-Site Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-9',
        author: 'Geeta Menon',
        rating: 5,
        date: '08 Sep 2026',
        title: 'Starbucks at home every morning',
        comment: 'The aroma when it grinds beans in the morning is heavenly. Pays for itself in 4 months.',
        verifiedPurchase: true
      }
    ]
  }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'WELCOME10',
    description: '10% instant discount on your first order up to ₹1,500',
    discountPercentage: 10,
    minOrderValue: 2000
  },
  {
    code: 'SUPERFESTIVE',
    description: 'Flat ₹1,000 off on premium orders over ₹15,000',
    discountAmount: 1000,
    minOrderValue: 15000
  },
  {
    code: 'FREESHIP',
    description: 'Free Express Delivery across all pincodes',
    discountAmount: 99,
    minOrderValue: 999
  }
];

export const INITIAL_USER = {
  id: 'usr-101',
  name: 'Angad Sahani',
  email: 'angadsahani0090@gmail.com',
  phone: '9876543210',
  joinedDate: 'Joined March 2025'
};

export const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Angad Sahani',
    phone: '9876543210',
    pincode: '560001',
    locality: 'MG Road, Ashok Nagar',
    addressLine: 'Flat 402, Prestige Tower, Residency Cross Rd',
    city: 'Bengaluru',
    state: 'Karnataka',
    landmark: 'Near Trinity Metro Station',
    type: 'HOME' as const,
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Angad Sahani (Office)',
    phone: '9876543210',
    pincode: '560103',
    locality: 'Outer Ring Road, Bellandur',
    addressLine: 'Building 12B, Tech Park 4th Floor',
    city: 'Bengaluru',
    state: 'Karnataka',
    landmark: 'Opposite Central Mall',
    type: 'WORK' as const,
    isDefault: false
  }
];

export const DEMO_PRELOADED_ORDER = {
  id: 'ord-901',
  orderNumber: 'NC-984210',
  date: '20 Sep 2026, 14:32',
  userId: 'usr-101',
  customerName: 'Angad Sahani',
  customerEmail: 'angadsahani0090@gmail.com',
  customerPhone: '9876543210',
  items: [
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1
    }
  ],
  shippingAddress: INITIAL_ADDRESSES[0],
  deliverySpeed: 'EXPRESS' as const,
  deliveryFee: 99,
  discountAmount: 1500,
  appliedCoupon: 'WELCOME10',
  subtotal: 24999,
  totalAmount: 23598,
  paymentMethod: 'UPI' as const,
  paymentStatus: 'PAID' as const,
  status: 'SHIPPED' as const,
  trackingNumber: 'NX-94281729BLR',
  courierName: 'NovaExpress Logistics',
  estimatedDelivery: 'Tomorrow, by 11:00 AM',
  trackingHistory: [
    {
      status: 'ORDERED' as const,
      label: 'Order Placed',
      date: '20 Sep 2026, 14:32',
      location: 'Online Store, Bengaluru Hub',
      completed: true
    },
    {
      status: 'CONFIRMED' as const,
      label: 'Order Verified & Approved',
      date: '20 Sep 2026, 15:10',
      location: 'Seller Warehouse (Electronic City)',
      completed: true
    },
    {
      status: 'PACKED' as const,
      label: 'Item Packed & Sealed',
      date: '21 Sep 2026, 09:15',
      location: 'Fulfillment Center FC-4, Bengaluru',
      completed: true
    },
    {
      status: 'SHIPPED' as const,
      label: 'Dispatched in Transit',
      date: '22 Sep 2026, 04:30',
      location: 'Central Sorting Facility, Yeshwanthpur',
      completed: true
    },
    {
      status: 'OUT_FOR_DELIVERY' as const,
      label: 'Out for Delivery',
      date: 'Expected Today by 11 AM',
      location: 'Ashok Nagar Delivery Hub',
      completed: false
    },
    {
      status: 'DELIVERED' as const,
      label: 'Delivered',
      date: 'Estimated 23 Sep',
      location: 'Delivery Address',
      completed: false
    }
  ]
};
