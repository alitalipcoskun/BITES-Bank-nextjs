import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot';
import { simpleSteps } from './Steps';

const SimpleChatBot = () => {
    return (
        <>
            <div style={{
                position: 'fixed',
                bottom: '80px',
                left: '20px',
                zIndex: 1000,
                maxWidth: '300px',
                width: '90%',
            }}>
                <ChatBot
                    floating={true}
                    steps={simpleSteps}
                    botDelay={1000}
                    userDelay={1000}
                />
            </div>
        </>
    )
}

export default SimpleChatBot