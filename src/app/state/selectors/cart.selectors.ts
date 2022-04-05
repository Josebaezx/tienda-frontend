import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductoID } from "app/home/producto/ProductoID";

export interface ProductGroup {
    product: ProductoID;
    count: number;
  }

export const selectCountProductos = createSelector(
    createFeatureSelector('cartEntries'),
    (state: ProductoID[]) => {
        return state.length;
    }
);

export const selectProductos = createSelector(
    createFeatureSelector('cartEntries'),
    (state: ProductoID[]) => {
        return state
    }
);

export const selectTotalPrice = createSelector(
    createFeatureSelector('cartEntries'),
    (state: ProductoID[]) => {
      var totalPrice = 0;
      state.forEach(p => totalPrice += p.precio);
      return totalPrice;
    }
  )

export const selectGroupedCartEntries = createSelector(
    createFeatureSelector('cartEntries'),
    (state: ProductoID[]) => {
      var map: Map<number, ProductGroup> = new Map;
  
      state.forEach(p => {
        if (map.get(p.id)) {
          (map.get(p.id) as ProductGroup).count++;
        } else {
          map.set(p.id, { product: p, count: 1 });
        }
      })
  
      const sortedMap = new Map([...map.entries()].sort());
      return Array.from(sortedMap.values());
    }
  )