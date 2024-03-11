import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { getProducts, addProduct, deleteProduct, editProduct } from '../actions/product';
import Swal from 'sweetalert2';

const Products = ({ productos, getProducts, addProduct, deleteProduct, editProduct }) => {
    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(nombre, precio).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado exitosamente',
                showConfirmButton: false,
                timer: 1000
            });
            handleClose();
            getProducts();
            setTimeout(() => window.location.reload(), 1000);
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Está seguro que desea eliminar este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('ID del producto a eliminar:', id);
                deleteProduct(id);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El producto ha sido eliminado.',
                    showConfirmButton: false,
                    timer: 1000 
                });
            }
        });
    };

    const [editShow, setEditShow] = useState(false);
    const [editProducto, setEditProducto] = useState({});

    const handleEditShow = (producto) => {
        setEditProducto(producto);
        setEditShow(true);
    };

    const handleEditClose = () => setEditShow(false);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editProduct(editProducto.id, editProducto.nombre, editProducto.precio).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Información actualizada',
                showConfirmButton: false,
                timer: 1000
            });
            handleEditClose();
            getProducts();
            setTimeout(() => window.location.reload(), 1000);
        });
    };


    return (
        <div>
            <Button variant="primary" onClick={handleShow} className="mb-4">
                Añadir Producto
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir un nuevo producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={editShow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={editProducto.nombre}
                                onChange={(e) => setEditProducto({ ...editProducto, nombre: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={editProducto.precio}
                                onChange={(e) => setEditProducto({ ...editProducto, precio: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className="container mt-4">
                <h2 className="text-center mb-4">Lista de Productos</h2>
                <div className="d-flex justify-content-center">
                    <table className="table table-hover w-75">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos && productos.map((producto, index) => (
                                <tr key={producto.id}>
                                    <td>{index + 1}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.precio}</td>
                                    <td className="text-center">
                                        <Button variant="success" onClick={() => handleEditShow(producto)} className="me-2">
                                            Editar
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(producto.id)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log("Productos en /productos", state.product);
    return {
        productos: state.product
    };
};

export default connect(mapStateToProps, { getProducts, addProduct, deleteProduct, editProduct })(Products);
