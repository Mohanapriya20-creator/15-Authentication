// import { useState } from 'react';
import { Form, useSearchParams, Link, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  // const [isLogin, setIsLogin] = useState(true);
  //searchParams is a built-in hook that allows us to access the query parameters of the URL.
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  return (

    <Form method="post" className={classes.form}>
      <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
      {data && data.message && <p>{data.message}</p>}
      {data && data.errors && (
        <ul>
          {Object.keys(data.errors).map((errKey) => (
            <li key={errKey}>{data.errors[errKey]}</li> // Display individual error messages
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <div className={classes.actions}>
        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} >
          {isLogin ? 'Create new user' : 'Login'}
        </Link>
        <button disabled={isSubmitting}>{isSubmitting? 'Submitting...': 'Save' }</button>
      </div>
    </Form>

  );
}

export default AuthForm;
