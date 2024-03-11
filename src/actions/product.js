import ProductService from '../services/product.service';
import { GET_PRODUCTS, 
    ADD_PRODUCT_SUCCESS, 
    ADD_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS, 
    DELETE_PRODUCT_FAIL ,
    SET_MESSAGE,
    EDIT_PRODUCT_SUCCESS, 
    EDIT_PRODUCT_FAIL  } from './types';

export const getProducts = () => async (dispatch) => {
    try {
        const response = await ProductService.getProducts();
        console.log(response.data);
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data,
        });
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Error desconocido";
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        console.error("Error al obtener los productos:", message);
    }
};

export const addProduct = (nombre, precio) => async (dispatch) => {
    try {
        const response = await ProductService.addProduct(nombre, precio);
        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            "Error desconocido";
        dispatch({
            type: ADD_PRODUCT_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await ProductService.deleteProduct(id);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: id,
        });
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            "Error desconocido";
        dispatch({
            type: DELETE_PRODUCT_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
    }
};


export const editProduct = (id, nombre, precio) => async (dispatch) => {
    try {
        const response = await ProductService.editProduct(id, nombre, precio);
        dispatch({
            type: EDIT_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            "Error desconocido";
        dispatch({
            type: EDIT_PRODUCT_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
    }
};