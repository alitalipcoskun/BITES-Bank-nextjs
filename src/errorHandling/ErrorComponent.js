"use client"
import { Button } from '@/components/ui/button';
import React from 'react'

const ErrorComponent = (props) => {
    const {error, resetErrorBoundary} = props;

    return (
        <div className= "flex flex-col justify-center align-middle text-center">
            <div className='container m-auto'>
                <h1 className='text-5xl font-semibold text-red-500'>Error occured!</h1>
                <p className='text-xl text-gray-300 font-semibold'>{error.message}</p>
                <Button className="mt-4" onClick={resetErrorBoundary}>
                    Reload page
                </Button>
            </div>
        </div>
    )
}

export default ErrorComponent