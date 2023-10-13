import React, { useEffect, useState } from 'react'
import { Button, Select, TextInput, Textarea } from 'flowbite-react'
import { useStateContext } from '../../../../contexts/ContextProvider';
import { Header } from '../../../../components/Tailwind/components';
import useUserInfo from '../../../../hooks/userinfo/useUserInfo';
import {toast,ToastContainer} from 'react-toastify';

const UpdateForm = ({user, userId}) => {

  const { currentColor } = useStateContext();
  const {updateUserInfo} = useUserInfo();
  
  const [firstName, setFirstName] = useState(user?.user?.firstName);
  const [lastName, setLastName] = useState(user?.user?.lastName);
  const [email, setEmail] = useState(user?.user?.email);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [profession, setProfession] = useState(user?.profession);
  const [phone, setPhone] = useState('767192683');
  const [bio, setBio] = useState(user?.bio);
  const [address, setAddress] = useState(user?.address);
  const [street, setStreet] = useState('Park St');
  const [city, setCity] = useState('Colombo');
  const [postal, setPostal] = useState('66C');


  //validation states
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);


  useEffect(()=>{
    setFirstName(user?.user?.firstName);
    setLastName(user?.user?.lastName);
    setEmail(user?.user?.email);
    setAge(user?.age);
    setGender(user?.gender);
    setProfession(user?.profession);
    setPhone(user?.phone);
    setBio(user?.bio);
    setAddress(user?.address);
  },[user])

  const handleSubmit = async() => {
    setAddress(`${postal} ${street} ${city}`);

    try{
      console.log("userId at UpdateForm: ",userId);
      const response = await updateUserInfo(userId, {
        firstName, lastName, email, age, gender, address, profession, phone, bio
      });
      toast.success("User Profile Updated Successfully!");
      console.log(response);

    }catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <ToastContainer/>
      <form>
        <Header category='Client' title={'Update Your Profile'} />
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>First Name</span>
          </div>
          <TextInput
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className='shadow-lg'
            id='base'
            sizing='md'
            type='text'
            placeholder={firstName}
          />
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Last Name</span>
          </div>
          <TextInput
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            className='shadow-lg'
            id='base'
            sizing='md'
            type='text'
          />
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Email</span>
          </div>
          <TextInput
            value={email}
            onChange={(e) => {
              const inputValue = e.target.value;
              setEmail(inputValue);

              //Check email validation using a regular expression
              const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
              setIsEmailValid(emailRegex.test(inputValue));
            }}
            className='shadow-lg'
            id='base'
            sizing='md'
            type='email'
          />
          {!isEmailValid && <div className='text-red-500 text-sm mt-2'>Email should include @ and a '.' in the address</div>}
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Age</span>
          </div>
          <TextInput
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            className='shadow-lg'
            id='base'
            sizing='md'
            type='number'
            placeholder='Eg: 17'
          />
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Gender</span>
          </div>
          <Select id='gender' className='shadow-lg' onChange={(e) => {
            setGender(e.target.value);
          }}>
            <option value={'unknown'} disabled default>
              Choose your gender
            </option>
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
            <option value={'non-binary'}>Non-Binary</option>
            <option value={'unknown'}>Prefer Not to Say</option>
          </Select>
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Profession</span>
          </div>
          <TextInput
            value={profession}
            onChange={(e) => {
              setProfession(e.target.value);
            }}
            className='shadow-lg'
            id='base'
            sizing='md'
            type='text'
            placeholder='Eg: Software Engineer'
          />
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Postal Number</span>
          </div>
          <TextInput
            value={postal}
            onChange={(e) => {
              setPostal(e.target.value);
            }}
            className='shadow-lg'
            id='base'
            sizing='md'
            type='text'
            placeholder='Eg: 17'
          />
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Street Name</span>
          </div>
          <TextInput
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
            className='shadow-lg'
            id='base'
            sizing='md'
            type='text'
            placeholder='Eg: 17'
          />
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>City</span>
          </div>
          <TextInput
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className='shadow-lg'
            id='base'
            sizing='md'
            type='text'
            placeholder='Eg: 17'
          />
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Phone Number</span>
          </div>
          <TextInput
            value={phone}
            onChange={(e) => {
              const inputvalue = e.target.value;
              setPhone(inputvalue);

              //Check if the phone validation is right usnig regular expression
              const phoneRegex = /^[7]\d{8}$/;
              setIsPhoneNumberValid(phoneRegex.test(inputvalue));
            }}
            className='shadow-lg'
            addon='+94'
            id='base'
            sizing='md'
            type='text'
          />
          {!isPhoneNumberValid && <div className='text-red-500 text-sm mt-2'>Phone number should be 9 digits long and start with 7</div>}
        </div>
        <div className='flex mt-5'>
        </div>
        <div className='py-4'>
          <div className='mb-2 block'>
            <span className='text-lg dark:text-gray-200'>Bio</span>
          </div>
          <Textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            className='shadow-lg'
            id='base'
            rows={12}
            type='text'
          />
        </div>
        <div className='flex'>
          <Button

            size={'lg'}
            className='shadow-lg bg-rose-500 ml-10'
            onClick={() => handleSubmit()}
            style={{ width: '200px', backgroundColor: currentColor }}
          >
            Confirm Profile
          </Button>
        </div>
      </form>
    </>
  )
}

export default UpdateForm