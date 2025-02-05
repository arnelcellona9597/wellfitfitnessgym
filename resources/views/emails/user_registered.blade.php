<!DOCTYPE html>
<html>
<head>
    <title>New User Registration</title>
</head>
<body>
    <h1>Thank you for registration!</h1>
    <p><strong>Name:</strong> {{ $data['first_name'] }} {{ $data['last_name'] }}</p>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    <hr/>
    <br/>
    <h2>Steps to activate your account</h2>
    <h3>Step 1:</h3>
    <p>Click this link to activate your account: {{ config('app.page_account_activation') }}</p>
    <br/>
    <h3>Step 2:</h3>
    <p>Copy and paste this 10 digit code: <b>{{ $data['verification_code'] }}</b> to the activation form.</p>
    <br/>
    <h3>Step 3:</h3>
    <p>Go to the login page and signin to your account.</p>
</body>
</html>
