import React, { useState, useCallback, useRef, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Layout from '../shared/layout';
import './auth.styles.scss';

const initUser = { email: '', password: '' };

const SignIn = ({ history }) => {
  const [values, setValues] = useState(initUser);
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid } } = useForm({
    defaultValues: initUser
  });
  const abortControllerRef = useRef(null);
  const { email, password } = errors;

  const onSubmit = useCallback(async (data) => {
    abortControllerRef.current = new AbortController();
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, data.email, data.password)
      const result = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/signin`, {
        signal: abortControllerRef.current.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, _id: firebaseUser.uid }),
      });
      if (!result.ok) throw new Error(`HTTP error! status: ${result.status}`);
      const user = await result.json();

      if (!abortControllerRef.current.signal.aborted && user._id && user._id === firebaseUser.uid) {
        history.push('/shop')
      }

    } catch (error) {
      // Handle different types of errors
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }

      // Handle other errors (network, parsing, etc.)
      console.error('Submission error:', error);
      throw error; // Re-throw to let react-hook-form handle it
    }

  }, [history]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [])

  return (
    <Layout>
      <div className='sign-up'>
        <h1>Sign In</h1>
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                {...register('email', {
                  required: 'Email cannot be empty!',
                  onChange: (e) => setValues({ ...values, email: e.target.value })
                })}
                placeholder='Email'
                value={values.email}
                className={`nomad-input ${email ? 'error' : ''}`}
              />
            </div>
            <div>
              <input
                type="password"
                {...register('password', {
                  required: 'Password cannot be empty!',
                  minLength: {
                    value: 2,
                    message: 'Password should be at least 2 character or more'
                  },
                  onChange: (e) => setValues({ ...values, password: e.target.value })
                })}
                placeholder='Password'
                value={values.password}
                className={`nomad-input ${password ? 'error' : ''}`}
              />
            </div>
            <div className='submit-btn'>

              <button
                disabled={!isDirty || !isValid || isSubmitting}
                className='button is-black nomad-btn submit'
              > SIGN IN
              </button>
            </div>
            <div>
              {
                errors.email && <p>{errors.email.message}</p>
              }
              {
                errors.password && <p>{errors.password.message}</p>
              }
            </div>
          </form>
        </div>
        <div className='auth-link'>
          Dont have an account? <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(SignIn)
