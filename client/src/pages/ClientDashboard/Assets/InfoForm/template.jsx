import React from 'react'

const template = () => {
  return (
    <form>
    <div className='py-4'>
      <div className='mb-2 block'>
        <span className='text-lg'>Age</span>
      </div>
      <TextInput
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
      <Select id='gender'>
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
        id='base'
        sizing='md'
        type='text'
        placeholder='Eg: Software Engineer'
      />
    </div>
    <div>
      <Button
        onClick={()=>handleChange(1)}
        style={{ backgroundColor: currentColor }}
      >
        Confirm
      </Button>
    </div>
  </form>  )
}

export default template