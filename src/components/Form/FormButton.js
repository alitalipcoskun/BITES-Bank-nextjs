import React from 'react'
import { Button } from '../ui/button';

const FormButton = (props) => {
  const { type, isSubmitting, loadingState, defaultState, className } = props;
  return (
    <>
      <Button type={type} className={`mt-4 ${className}`} disabled={isSubmitting}>{isSubmitting ? loadingState : defaultState}</Button>
    </>
  )
}

export default FormButton