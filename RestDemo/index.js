const express = require('express');
const app = express();

const users =[
    { userId: 1, userName: 'Alice' },
    { userId: 2, userName: 'Bob' },
    { userId: 3, userName: 'Charlie' },
    { userId: 4, userName: 'Diana' }
]

app.get('/users/:userId', (req, res) => {
    const userData = users.find(user => user.userId === parseInt(req.params.userId));
    if (userData) {
        res.status(200).send(userData);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});