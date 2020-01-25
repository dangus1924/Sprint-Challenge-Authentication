import React from 'react'
import useForm from 'react-hook-form';
import axios from 'axios';

const Signup = () => {
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		axios.post("http://localhost:5000/api/auth/register", data, { withCredentials: true })
			.then(res => alert(`Success! Please continue to login ${res.data.username}!`))
			.catch(err => console.log(err.message))
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" 
                    placeholder="Username" 
                    name="username" 
                    ref={register({ required: true, maxLength: 80 })} 
                />
            <input type="password" 
                    placeholder="Password" 
                    name="password" 
                    ref={register({ required: true })} 
                />

			<input type="submit" />
		</form>
	);
}

export default Signup