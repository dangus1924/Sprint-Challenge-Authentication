import React from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'

const Signin = (props) => {
    const { storeToken } = props
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		axios.post("http://localhost:5000/api/auth/login", data, { withCredentials: true })
			.then(res => {
				alert(`Successful Login!`)
				storeToken()
				localStorage.setItem('token', res.data)
			})
			.catch(err => console.log(err.message))
    };
    return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Username" name="username" ref={register({ required: true, maxLength: 80 })} />
			<input type="password" placeholder="Password" name="password" ref={register({ required: true })} />

			<input type="submit" />
		</form>
	);
}

export default Signin
