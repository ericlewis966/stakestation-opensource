import React from 'react'
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'

const SelectBox = () => {
  const data = [
    'America',
    'India',
    'Australia',
    'Argentina',
    'Ireland',
    'Indonesia',
    'Iceland',
    'Japan'
  ]
  return <ComboBox options={data} enableAutocomplete />
}

export default SelectBox;