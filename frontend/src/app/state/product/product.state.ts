import { Product } from '../../services/product/product.service';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null; 
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null
};