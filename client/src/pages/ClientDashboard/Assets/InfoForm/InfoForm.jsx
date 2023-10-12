import React, { useEffect, useState } from 'react'
import { Button, Select, TextInput, Textarea } from 'flowbite-react'
import { useStateContext } from '../../../../contexts/ContextProvider'
import { Tabs, Tab } from '@mui/material'
import useUserInfo from '../../../../hooks/userinfo/useUserInfo'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'


const InfoForm = () => {

  const { currentMode, currentColor } = useStateContext()
  const [activeSteps, setActiveSteps] = useState(0)

  const {createUserInfo} = useUserInfo();
  const navigate = useNavigate();
  
  const handleNext = () => {
    setActiveSteps(prevActiveSteps => prevActiveSteps + 1)
  }

  const handleBack = () => {
    setActiveSteps(prevActiveSteps => prevActiveSteps - 1)
  }

  const [user,setUser] = useState('');
  const [age,setAge] = useState(0); 
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');


  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');

  //validation states
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  
  

  useEffect(()=>{
    setUser(localStorage.getItem('userId'));
  },[])
  
  console.log(user);

  const handleSubmit = async()=>{ 
    await setAddress(`${postal} ${street} ${city}`);

    try{
      const response = await createUserInfo({
        userid: user,
        age,
        gender, 
        address,
        profession,
        phone,
        bio
      });
      navigate('/client');
      toast.success("User Information added successfully!");
      console.log(response);
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div>
        <ToastContainer/>
      <Tabs textColor={currentMode !== 'Light' ? 'gray-200' : 'white'} value={activeSteps} sx={{ justifyContent: 'center', }}>
        <Tab  label='Step 1' disabled sx={{ width: '33%' }} />
        <Tab label='Step 2' disabled sx={{ width: '33%' }} />
        <Tab label='Step 3' disabled sx={{ width: '33%' }} />
      </Tabs>

      {activeSteps === 0 && (
        <div>
          <form>
            <div className='py-4'>
              <div className='mb-2 block'>
                <span className='text-lg'>Age</span>
              </div>
              <TextInput
                value={age}
                onChange={(e)=>{
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
                <span className='text-lg'>Gender</span>
              </div>
              <Select id='gender' className='shadow-lg' onChange={(e)=>{
                setGender(e.target.value);
              }}>
                <option value={'unknown'} disabled hidden>
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
                <span className='text-lg'>Profession</span>
              </div>
              <TextInput
                value={profession}
                onChange={(e)=>{
                  setProfession(e.target.value);
                }}
                className='shadow-lg'
                id='base'
                sizing='md'
                type='text'
                placeholder='Eg: Software Engineer'
              />
            </div>
            <div className='py-10'>
              <Button
                size={'lg'}
                className='shadow-lg'
                onClick={() => handleNext()}
                style={{ backgroundColor: currentColor, width: '100px' }}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      )}
      {activeSteps === 1 && (
        <div>
          <div className='py-4'>
            <div className='mb-2 block'>
              <span className='text-lg'>Postal Number</span>
            </div>
            <TextInput
              value={postal}
              onChange={(e)=>{
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
              <span className='text-lg'>Street Name</span>
            </div>
            <TextInput
              value={street}
              onChange={(e)=>{
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
              <span className='text-lg'>City</span>
            </div>
            <TextInput
              value={city}
              onChange={(e)=>{
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
              <span className='text-lg'>Number</span>
            </div>
            <TextInput
              value={phone}
              onChange={(e)=>{
                const inputvalue = e.target.value;
                setPhone(inputvalue);

                //Check if the phone validation is right using regex
                const phoneRegex = /^[7]\d{8}$/;
                setIsPhoneNumberValid(phoneRegex.test(inputvalue));
              }}
              className='shadow-lg'
              addon='+94'
              id='base'
              sizing='md'
              type='text'
            />
            {!isPhoneNumberValid &&<div className='text-red-500 text-sm mt-2'>Phone number should be 9 digits long and start with 7</div>}
          </div>
          <div className='flex mt-5'>
            <Button
              size={'lg'}
              className='shadow-lg bg-rose-500'
              onClick={() => handleBack()}
              style={{ width: '100px' }}
            >
              Back
            </Button>
            <Button
              size={'lg'}
              className='shadow-lg mx-10'
              onClick={() => handleNext()}
              style={{ backgroundColor: currentColor, width: '100px' }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {activeSteps === 2 && (
        <div>
          <div className='py-4'>
            <div className='mb-2 block'>
              <span className='text-lg'>Bio</span>
            </div>
            <Textarea
              value={bio}
              onChange={(e)=>{
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
              className='shadow-lg bg-rose-500'
              onClick={() => handleBack()}
              style={{ width: '100px' }}
            >
              Back
            </Button>
            <Button
            
              size={'lg'}
              className='shadow-lg bg-rose-500 ml-10'
              onClick={()=>handleSubmit()}
              style={{ width: '100px', backgroundColor: currentColor }}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InfoForm
