import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import OAuth from '../components/OAuth';
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import lockIcon from '../assets/svg/lockIcon.svg';
import badgeIcon from '../assets/svg/badgeIcon.svg';
import personIcon from '../assets/svg/personIcon.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong, please try again');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <main>
          <form onSubmit={onSubmit}>
            <div className='formInputDiv'>
              <img src={badgeIcon} style={{ position: 'absolute', top: '12px', left: '15px' }} />
              <input type='text' className='nameInput' placeholder='Name' id='name' value={name} onChange={onChange} />
            </div>
            <div className='formInputDiv'>
              <img src={personIcon} style={{ position: 'absolute', top: '12px', left: '15px' }} />
              <input
                type='email'
                className='emailInput'
                placeholder='Email'
                id='email'
                value={email}
                onChange={onChange}
              />
            </div>
            <div className='passwordInputDiv'>
              <img src={lockIcon} style={{ position: 'absolute', top: '12px', left: '15px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          <OAuth />

          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
