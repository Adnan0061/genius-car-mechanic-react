import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManageServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:5000/services`)
        .then(res => res.json())
        .then(data => setServices(data))
    },[])

    const handleDelete = id => {
        const url = `http://localhost:5000/service/${id}`
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert('Are you sure you want to delete service')
            const remaining = services.filter(service => service._id !== id)
            setServices(remaining)
            
        })
    }

    // const handleUpdate = (id) => {
    //     const url = `http://localhost:5000/service/${id}`
    //     fetch(url, {
    //         method: 'PUT'
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    // }

    return (
        <div className='m-5 w-75 mx-auto'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Update</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                services.map(service => { 
                    return (
                    <tr key={service._id}>
                    <td>{services.indexOf(service) + 1}</td>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                    <td><img src={service.img} alt="Logo" height='50px' /></td>
                    <td><Link to={`/update-service/${service._id}`}>Update</Link></td>
                    <td><button onClick={()=>handleDelete(service._id)}>Delete</button></td>
                    </tr>
                    )
                })
                }
                </tbody>
            </Table>

        </div>
    );
};

export default ManageServices;