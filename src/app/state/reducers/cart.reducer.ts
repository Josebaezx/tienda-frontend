import { ActionReducer, createReducer, INIT, on, UPDATE } from "@ngrx/store";
import { ProductoID } from "app/home/producto/ProductoID";
import { reduce } from "rxjs";
import { addProducto, clearCart, removeCart } from '../actions/cart.actions';

export const inicialCartEntries: ProductoID[]=[];
export const cartReducer = createReducer(
    inicialCartEntries,
    on(clearCart, _ =>[]),

    on(addProducto, (entries, producto)=>{
        const entriesClone: ProductoID[]= JSON.parse(JSON.stringify(entries));
        entriesClone.push(producto);
        return entriesClone;
    }),

    on(removeCart,(entries, producto)=>{
        const entriesClone: ProductoID[] = JSON.parse(JSON.stringify(entries));
        const found = entriesClone.find(e => e.id == producto.id);
        if(found){
            entriesClone.splice(entriesClone.indexOf(found),1)
        }
        return entriesClone;
    })
)

export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
        if(action.type === INIT || action.type == UPDATE){
            const storageValue = localStorage.getItem('state')
            if(storageValue){
                try {
                    return JSON.parse(storageValue);
                } catch (error) {
                    localStorage.removeItem('state')
                }
            }
        }
        const nextState = reducer(state, action);
        localStorage.setItem('state', JSON.stringify(nextState));
        return nextState;
    }
}
    