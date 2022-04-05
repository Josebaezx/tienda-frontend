import { createAction, props } from "@ngrx/store";
import { ProductoID } from "app/home/producto/ProductoID";

export const addProducto = createAction('add Cart', props<ProductoID>());
export const removeCart = createAction('remove Cart', props<ProductoID>());
export const clearCart = createAction('clear Cart');