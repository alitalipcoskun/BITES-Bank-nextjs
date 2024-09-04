import React from 'react'
import { Button } from '../ui/button';

const FormButton = (props) => {
  const { type, isSubmitting, loadingState, defaultState } = props;
  return (
    <>
      <Button type={type} className="mt-4" disabled={isSubmitting}>{isSubmitting ? loadingState : defaultState}</Button>
    </>
  )
}

export default FormButton