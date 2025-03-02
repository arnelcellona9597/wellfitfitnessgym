<!DOCTYPE html>
<html>
<head>
    <title>Membership Plan Verification</title>
</head>
<body>
    <h1>Subscription Details</h1>

    <p><strong>Membership Type:</strong> {{ $data['plan_name'] }}</p>
    <p><strong>Membership Duration:</strong> {{ $data['duration'] }}</p>
    <p><strong>Membership Price:</strong> {{ $data['price'] }}</p>

    <hr/>

    <p><strong>{{ $data['membership_verification_code'] ?? 'No Code Available' }}</strong> is your verification code to avail Wellfit Fitness Gym membership.</p>
</body>
</html>
