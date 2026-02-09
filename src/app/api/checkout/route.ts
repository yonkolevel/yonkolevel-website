import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { getProductById } from '@/lib/shop/products';

const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  'GB', 'US',
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (!product.stripePriceId) {
      return NextResponse.json({ error: 'Product not available for purchase' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'https://yonkolevel.com';

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/shop?success=true&product=${product.id}`,
      cancel_url: `${origin}/shop?canceled=true`,
    };

    if (product.type === 'physical') {
      params.shipping_address_collection = {
        allowed_countries: SHIPPING_COUNTRIES,
      };
      params.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 399,
              currency: 'gbp',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ];
    }

    const session = await getStripe().checkout.sessions.create(params);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
