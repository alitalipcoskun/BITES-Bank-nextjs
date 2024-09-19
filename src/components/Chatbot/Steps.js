export const simpleSteps = [
    {
        id: '0',
        message: 'Welcome to our banking chatbot! May I know your name?',
        trigger: 'getName',
    },
    {
        id: 'getName',
        user: true,
        trigger: 'greet',
    },
    {
        id: 'greet',
        message: 'Nice to meet you, {previousValue}! How can I assist you today?',
        trigger: 'options',
    },
    {
        id: 'options',
        message: 'Please select one of the following options:',
        trigger: 'choice',
    },
    {
        id: 'choice',
        options: [
            { value: 'transfer', label: 'Money Transfer', trigger: 'transfer' },
            { value: 'add_money', label: 'Adding Money to Account', trigger: 'add_money' },
            { value: 'change_password', label: 'Password Change', trigger: 'change_password' },
            { value: 'transactions', label: 'Listing Transactions', trigger: 'transactions' },
            { value: 'end', label: 'End Conversation', trigger: 'end' },
        ],
    },
    {
        id: 'transfer',
        component: (
            <div>
                To make a money transfer, please visit: <a href="/transactions">Money Transfer Page</a>
            </div>
        ),
        trigger: 'go_back',
    },
    {
        id: 'add_money',
        component: (
            <div>
                To add money to your account, please visit: <a href="/">Add Money Page</a>
            </div>
        ),
        trigger: 'go_back',
    },
    {
        id: 'change_password',
        message: 'Are you currently signed in?',
        trigger: 'password_choice',
    },
    {
        id: 'password_choice',
        options: [
            { value: 'signed_in', label: 'Do you remember your password?', trigger: 'change_password_signed_in' },
            { value: 'signed_out', label: 'Do you not remember your password?', trigger: 'change_password_signed_out' },
        ],
    },
    {
        id: 'change_password_signed_in',
        component: (
            <div>
                To change your password while signed in, please visit: <a href="/profile">Profile Page</a>
            </div>
        ),
        trigger: 'go_back',
    },
    {
        id: 'change_password_signed_out',
        component: (
            <div>
                To change your password while signed out, please visit: <a href="/forget-password">Forgot Password Page</a>
            </div>
        ),
        trigger: 'go_back',
    },
    {
        id: 'transactions',
        component: (
            <div>
                To view your transaction history, please visit: <a href="/transactions">Transactions Page</a>
            </div>
        ),
        trigger: 'go_back',
    },
    {
        id: 'go_back',
        message: 'Is there anything else I can help you with?',
        trigger: 'options',
    },
    {
        id: 'end',
        message: 'Thank you for using our banking chatbot. Have a great day!',
        end: true,
    },
];