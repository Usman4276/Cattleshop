import React from 'react';
import Select from 'react-select';
const select=[
    {
        value:1,
        label:'Customer'
    },
    {
        value:1,
        label:'Consultant'
    },
    {
        value:1,
        label:'Supplier'
    },
    {
        value:1,
        label:'Pick & Drop Service'
    }
]


const SelectOption=()=>{
    return(
        <>
            <Select options={select} />
        </>
    )
}
export default SelectOption;