import React, { useState, useContext, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Layout from '../shared/layout';
import AuthContext from '../../context/auth';
import { auth } from '../../firebase/config.js'
import { getFirebaseAuthErrorMessage } from '../../firebase/firebaseErrors.ts';
import './auth.styles.scss';

const initialValues = {
  firstname: '',
  email: '',
  password: ''
}
const SignUp = ({ history }) => {
  const [values, setValues] = useState(initialValues);
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid } } = useForm(initialValues);
  const abortControllerRef = useRef(null);
  const { signin } = useContext(AuthContext);

  const onSubmit = useCallback(async (data) => {
    try {
      abortControllerRef.current = new AbortController();
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const result = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/signup`, {
        signal: abortControllerRef.current.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, _id: firebaseUser.uid })
      })
      if (!result.ok) throw new Error('Something went wrong');
      const user = await result.json();
      if (!abortControllerRef.current.signal.aborted && user._id && user._id === firebaseUser.uid)
        signin(firebaseUser.accessToken)
      history.push('/shop')
    } catch (error) {
      const message = getFirebaseAuthErrorMessage(error.code);
      alert(message);
      console.error("Error during sign-up:", error);
    }


  }, [signin, history])

  return (
    <Layout>
      <div className='sign-up'>
        <h1>Sign Up</h1>
        <div className='form-container'>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type='text'
                autoComplete='off'
                {...register('firstname', {
                  required: 'The field cannot be empty!',
                  maxLength: {
                    value: 80,
                    message: 'First name is too long! Only 80 characters are alowed'
                  },
                  onChange: (e) => setValues({ ...values, firstname: e.target.value })
                })}
                value={values.firsname}
                placeholder='First Name'
                className={`nomad-input ${errors.firstname ? 'error' : ''}`}
              />
            </div>
            <div>
              <input
                type="email"
                {...register('email', {
                  required: 'Email cannot be emplty!',
                  onChange: (e) => setValues({ ...values, email: e.target.value })
                })}
                value={values.email}
                placeholder='Email'
                className={`nomad-input ${errors.email ? 'email' : ''}`}
              />
            </div>
            <div>
              <input
                type="password"
                {...register('password', {
                  required: 'Password cannot be empty!',
                  minLength: {
                    values: 2,
                    message: 'Password should be at least 2 character or more'
                  }
                })}
                placeholder='Password'
                className={`nomad-input ${errors.password ? 'password' : ''}`}
              />
            </div>
            <div className='submit-btn'>
              <button
                disabled={!isDirty || !isValid || isSubmitting}
                className='button is-black nomad-btn submit'
              >SIGN UP</button>
            </div>
            <div>
              {
                errors.firstname && <p>{errors.message}</p>
              }
              {
                errors.email && <p>{errors.message}</p>
              }
              {
                errors.firstname && <p>{errors.message}</p>
              }
            </div>
          </form>
        </div>
        <div className='auth-link'>
          Already have an account? <a href='/signin'>Sign In</a>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(SignUp)
