import React from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { list } from 'postcss';
const LabeledInput = (props) => {
    const {label, type,register, ruleSet, name, errors} = props;

    const errorClass = "border border-red-500 color-red-500 bg-red-200"
    return (
        <div className="grid w-full items-center gap-1.5 mb-3">
            <Label htmlFor={type}>{label}</Label>
            <Input type={type} id={label} placeholder={props.placeholder}  {...register(name, ruleSet)} className={errors[`${name}`] ? errorClass : ""}/>
            {errors[`${name}`] && <p className="text-red-500">{errors[`${name}`].message}</p>}
        </div>
    )
}
export default LabeledInput