import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const LabeledInput = (props) => {
    const { label, type, register, ruleSet, name, errors, isSubmitting, className, maxlength } = props;

    const errorClass = "border border-red-500 color-red-500 bg-red-200 w-[50vh]"

    const containerClass = className ? `m-auto ${className}` : "m-auto"
    if(maxlength){
        return (
            <div className={containerClass}>
                <Label
                    htmlFor={type}>
                    {label}
                </Label>
                <Input
                    maxlength
                    type={type}
                    id={label}
                    placeholder={props.placeholder}
                    {...register(name, ruleSet)}
                    className={errors[`${name}`] ? errorClass : "w-[50vh] mb-4"}
                    disabled={isSubmitting}
                    {...props}
    
                />
                {errors[`${name}`] &&
                    <p className={`inline text-red-500 ${errors[`${name}`] ? 'visible' : 'invisible'}`}>
                        {errors[`${name}`].message || "Placeholder"}
                    </p>}
            </div>
        )
    }

    return (
        <div className={containerClass}>
            <Label
                htmlFor={type}>
                {label}
            </Label>
            <Input
                type={type}
                id={label}
                placeholder={props.placeholder}
                {...register(name, ruleSet)}
                className={errors[`${name}`] ? errorClass : "w-[50vh] mb-4"}
                disabled={isSubmitting}
                {...props}

            />
            {errors[`${name}`] &&
                <p className={`inline text-red-500 ${errors[`${name}`] ? 'visible' : 'invisible'}`}>
                    {errors[`${name}`].message || "Placeholder"}
                </p>}
        </div>
    )
}
export default LabeledInput