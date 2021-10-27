import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

const UpdateService = () => {
    const { id } = useParams()
    const [service, setService] = useState([])
    const { register, handleSubmit, reset } = useForm();
    
    const onSubmit = data => {
        console.log(data);
        axios.put(`http://localhost:5000/service/${id}`, data)
        .then(res => {
            if(res.data){
                alert('service is successfully updated')
                reset()
            }
        })
    }
    
    useEffect(() => {
            fetch(`http://localhost:5000/service/${id}`)
            .then(res => res.json())
            .then(data => {
                setService(data)
            })
    },[onSubmit])
    return (
        <div className='add-service'>
            <h4>Edit and submit to update the <b>{service.name}</b> service</h4>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={service.name} {...register("name", { required: true })} placeholder='Name' />
                <textarea defaultValue={service.description} {...register("description", { required: true })} placeholder="description" />
                <input defaultValue={service.price} type="number" {...register("price", { required: true })} placeholder="price" />
                <input defaultValue={service.img} {...register("img", { required: true })}  placeholder="image url"/>
                <input type="submit"/>
            </form>
        </div>
    );
};

export default UpdateService;