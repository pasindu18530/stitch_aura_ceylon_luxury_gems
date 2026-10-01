export const MOCK_ORDERS = [
  {
    id: "ORD-1918-8421",
    date: "2026-09-28",
    clientName: "Lord Alistair Sterling",
    clientEmail: "a.sterling@kensington-trust.co.uk",
    itemTitle: "6.85 Carat The Royal Serendib Cushion Sapphire & Trilliant Ring",
    sku: "SER-SAP-9182",
    total: 64500,
    paymentMethod: "Bank Wire (2% Rebate applied: $63,210)",
    status: "In Transit — Brink's Armored",
    dispatchTracking: "BRK-ARM-99412-LON",
    destination: "Mayfair Salon (London, W1J)",
    estimatedDelivery: "2026-10-03",
    certificates: ["GIA #2215894102", "SSEF #118492"],
    vaultEscrowId: "ESC-7781-CH"
  },
  {
    id: "ORD-1918-8420",
    date: "2026-09-21",
    clientName: "Madame Hélène de Montmirail",
    clientEmail: "helene.montmirail@genevaprivate.ch",
    itemTitle: "Lotus Dawn Drop Earrings (Suite No. 02)",
    sku: "SUITE-LOT-02",
    total: 78000,
    paymentMethod: "Crypto (USDC Ethereum Escrow)",
    status: "Vault Custody Verified",
    dispatchTracking: "MAL-GVA-44810-CH",
    destination: "Rue du Rhône Salon (Geneva)",
    estimatedDelivery: "Collected",
    certificates: ["SSEF Matched Pair #11902-A/B"],
    vaultEscrowId: "ESC-7779-CH"
  },
  {
    id: "ORD-1918-8419",
    date: "2026-09-14",
    clientName: "Sheikh Tariq Al-Maktoum",
    clientEmail: "tariq.m@emirates-royal.ae",
    itemTitle: "11.05 Carat Cornflower Blue Round Brilliant",
    sku: "GIA-88203",
    total: 165000,
    paymentMethod: "Split 50/50 Deposit",
    status: "Setting Fabrication in Geneva",
    dispatchTracking: "MAL-DXB-33120-AE",
    destination: "DIFC Gate Precinct (Dubai)",
    estimatedDelivery: "2026-10-12",
    certificates: ["GIA #88203 Exceptional Grade"],
    vaultEscrowId: "ESC-7764-AE"
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: "APT-2026-091",
    name: "Dr. Evelyn Vance",
    email: "evelyn.vance@oxford-fellows.org",
    phone: "+44 7911 123456",
    type: "Virtual 4K Live Loupe Session",
    salon: "Virtual Live 4K Cam (Colombo Vault Direct)",
    gemstoneInterest: "Unheated Royal Blue Sapphire (5ct+)",
    date: "2026-10-04",
    time: "14:00 GMT",
    gemologist: "Dr. Gamini Senanayake (FGA, Senior Lapidary)",
    status: "Confirmed",
    notes: "Client inspecting 6.85ct Royal Serendib and 8.24ct Elahera cushion for 25th anniversary commission."
  },
  {
    id: "APT-2026-092",
    name: "Baroness Clara von Stauffen",
    email: "clara@stauffen-holdings.de",
    phone: "+49 89 204060",
    type: "Private Salon — Geneva, Switzerland",
    salon: "Rue du Rhône 42, 1204 Genève",
    gemstoneInterest: "Ethereal Padparadscha",
    date: "2026-10-06",
    time: "11:30 CET",
    gemologist: "Philippe Chappuis (SSEF Senior Gemologist)",
    status: "Confirmed",
    notes: "VIP Viewing of Lotus Dawn Drop Earrings and 5.42ct Sunrise Padparadscha."
  },
  {
    id: "APT-2026-093",
    name: "Rajiv Singhania",
    email: "rajiv@singhania-familyoffice.com",
    phone: "+971 50 882 1918",
    type: "Private Salon — DIFC, Dubai",
    salon: "DIFC Gate Precinct 4, Dubai",
    gemstoneInterest: "Ceylon Pigeon Blood Ruby",
    date: "2026-10-08",
    time: "16:00 GST",
    gemologist: "Dr. Senanayake & Tariq Al-Hashimi",
    status: "Pending Confirmation",
    notes: "Interested in 4.18ct emerald cut ruby and 4.80ct pear pigeon blood."
  }
];

export const MOCK_BESPOKE_REQUESTS = [
  {
    id: "BES-2026-004",
    client: "Viscount Charles Spencer",
    silhouette: "The Sovereign Halo",
    metal: "950 Pure Platinum",
    stone: "5.10ct Royal Blue Oval (GIA 6291)",
    accents: "Round Brilliant (F/VVS 0.45ct)",
    engraving: "IN PERPETUUM • 2026",
    totalEstimate: 33500,
    step: 4,
    stepLabel: "Architecture (Prongs & Gallery CAD)",
    assignedGoldsmith: "Master Artisan Jean-Luc Borel (Geneva)",
    status: "CAD Modeling & Wax Casting",
    dateSubmitted: "2026-09-24"
  },
  {
    id: "BES-2026-005",
    client: "Lady Genevieve Ward",
    silhouette: "Bespoke Art Deco Solitaire",
    metal: "18K Royal Gold",
    stone: "3.80ct Sunrise Padparadscha (SSEF 1120)",
    accents: "Tapered Diamond Baguettes",
    engraving: "AMOR VINCIT OMNIA",
    totalEstimate: 41200,
    step: 5,
    stepLabel: "Pavé Micro-Setting & Hand Finishing",
    assignedGoldsmith: "Ranil Wickremasinghe (Galle Fort)",
    status: "Master Bench Setting",
    dateSubmitted: "2026-09-18"
  }
];

export const MOCK_CUSTOMERS = [
  {
    id: "CUST-001",
    name: "Lord Alistair Sterling",
    tier: "Connoisseur Sovereign Tier",
    location: "London, UK",
    totalAcquisitions: "$242,500 USD",
    piecesInVault: 3,
    kycStatus: "Swiss Bank Verified (Level 3)",
    lastActive: "2 hours ago"
  },
  {
    id: "CUST-002",
    name: "Madame Hélène de Montmirail",
    tier: "High Jewellery Patron",
    location: "Geneva, Switzerland",
    totalAcquisitions: "$195,000 USD",
    piecesInVault: 2,
    kycStatus: "Verified",
    lastActive: "1 day ago"
  },
  {
    id: "CUST-003",
    name: "Sheikh Tariq Al-Maktoum",
    tier: "Imperial Custodian",
    location: "Dubai, UAE",
    totalAcquisitions: "$480,000 USD",
    piecesInVault: 5,
    kycStatus: "Diplomatic Pass Verified",
    lastActive: "3 days ago"
  }
];
