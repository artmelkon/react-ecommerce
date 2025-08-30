import React, { useState, useCallback, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Layout from '../shared/layout';
import AuthContext from '../../context/auth';
import './sign-up.styles.scss';

const initUser = { email: '', password: '' };

const SignIn = ({ history }) => {
  const [values, setValues] = useState(initUser);
  const { signin } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid } } = useForm({
    defaultValues: initUser
  });
  const { email, password } = errors;

  const onSubmit = useCallback(async (data) => {
    let isMounted = Boolean(true);
    const controller = new AbortController();

    const result = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/signin`, {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!result.ok) throw new Error('Something went wrong');
    const user = isMounted && await result.json();
    signin(user)

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [signin])

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
              >SIGN IN
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
      </div>
    </Layout>
  )
}

export default withRouter(SignIn)
