import { render } from '@testing-library/react';
import { CartProductsDetails } from './CartProductsDetails';
import { IProducts } from '@/interfaces/carts.interfaces';

describe('CartProductsDetails', () => {
  const products: IProducts = {
    id: 1,
    title: 'Test Product',
    price: 10.99,
    quantity: 2,
    total: 21.98,
    discountPercentage: 10,
    discountedTotal: 19.78,
    thumbnail: 'https://example.com/image.jpg',
  };

  const renderComponent = (products: IProducts) => render(<CartProductsDetails products={products} />);

  it('renders table with correct headers and data', () => {
    const { getByText } = renderComponent(products);
    expect(getByText('A list of products')).toBeInTheDocument();
    expect(getByText('id')).toBeInTheDocument();
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Price')).toBeInTheDocument();
    expect(getByText('Quantity')).toBeInTheDocument();
    expect(getByText('Total')).toBeInTheDocument();
    expect(getByText('Disc')).toBeInTheDocument();
    expect(getByText('DiscTotal')).toBeInTheDocument();
    expect(getByText('Thumbnail')).toBeInTheDocument();
    expect(getByText(products.id.toString())).toBeInTheDocument();
    expect(getByText(products.title)).toBeInTheDocument();
    expect(getByText(products.price.toString())).toBeInTheDocument();
    expect(getByText(products.quantity.toString())).toBeInTheDocument();
    expect(getByText(products.total.toFixed(2))).toBeInTheDocument();
    expect(getByText(products.discountPercentage.toString())).toBeInTheDocument();
    expect(getByText(products.discountedTotal.toFixed(2))).toBeInTheDocument();
  });


  it('formats total and discounted total correctly', () => {
    const { getByText } = renderComponent(products);
    expect(getByText(products.total.toFixed(2))).toBeInTheDocument();
    expect(getByText(products.discountedTotal.toFixed(2))).toBeInTheDocument();
  });

  it('renders thumbnail image correctly', () => {
    const { getByAltText } = renderComponent(products);
    expect(getByAltText(products.title)).toBeInTheDocument();
  });
});