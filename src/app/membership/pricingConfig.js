// Shared pricing configuration for membership

export const MEMBERSHIP_PRICES = {
  full: {
    single: 1200,
    family: 1476,
  },
  junior: {
    single: 444,
    family: 444,
  },
};

export const OUT_OF_TOWN_DISCOUNT = 50;
export const INTRODUCTORY_DISCOUNT = 0.5; // 50% off
export const NON_RESIDENT_DISCOUNT = 0.5; // 50% off for those living 35+ miles away

export const CART_OPTIONS = {
  storage: { label: 'Cart Storage', price: 180, description: 'Secure your cart in our locked storage shed year-round' },
  trailFee: { label: 'Trail Fee', price: 120, description: 'Store at home and use your cart on our course' },
  unlimitedRental: { label: 'Unlimited Rental', price: 324, description: 'Unlimited access to rental carts for the entire season' },
};

export function calculatePriceBreakdown(options) {
  const {
    membershipType,
    householdType,
    outOfTown,
    introductoryDiscount,
    nonResidentDiscount,
    cartStorage,
    cartTrailFee,
    cartUnlimitedRental,
  } = options;

  if (!membershipType || !householdType) {
    return null;
  }

  const basePrice = MEMBERSHIP_PRICES[membershipType]?.[householdType] || 0;
  const outOfTownDiscount = outOfTown ? OUT_OF_TOWN_DISCOUNT : 0;
  const membershipAfterOutOfTown = basePrice - outOfTownDiscount;

  // Calculate cart options total
  let cartTotal = 0;
  const selectedCarts = [];
  if (cartStorage) {
    cartTotal += CART_OPTIONS.storage.price;
    selectedCarts.push({ ...CART_OPTIONS.storage, key: 'storage' });
  }
  if (cartTrailFee) {
    cartTotal += CART_OPTIONS.trailFee.price;
    selectedCarts.push({ ...CART_OPTIONS.trailFee, key: 'trailFee' });
  }
  if (cartUnlimitedRental) {
    cartTotal += CART_OPTIONS.unlimitedRental.price;
    selectedCarts.push({ ...CART_OPTIONS.unlimitedRental, key: 'unlimitedRental' });
  }

  const subtotal = membershipAfterOutOfTown + cartTotal;

  // Apply either introductory or non-resident discount (mutually exclusive, both 50%)
  // Introductory applies to membership + cart options
  // Non-Resident only applies to membership (not cart options)
  const introDiscount = introductoryDiscount ? subtotal * INTRODUCTORY_DISCOUNT : 0;
  const nonResDiscount = nonResidentDiscount ? membershipAfterOutOfTown * NON_RESIDENT_DISCOUNT : 0;
  const annualTotal = subtotal - introDiscount - nonResDiscount;

  return {
    basePrice,
    outOfTownDiscount,
    membershipAfterOutOfTown,
    cartTotal,
    selectedCarts,
    subtotal,
    introDiscount,
    introductoryDiscount,
    nonResDiscount,
    nonResidentDiscount,
    annualTotal,
    membershipLabel: membershipType === 'full' ? 'Full' : 'Junior',
    householdLabel: householdType === 'single' ? 'Individual' : 'Family',
  };
}
