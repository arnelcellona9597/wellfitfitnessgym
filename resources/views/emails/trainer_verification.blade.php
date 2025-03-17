<!DOCTYPE html>
<html>
<head>
    <title>Bookking for Gym Trainer</title>
</head>
<body>
    <h1>Bookking for Gym Trainer Confirmation</h1>
    <p><strong>Trainer Name:</strong> {{ $data['trainer_name'] }}</p>
    <img src="{{ asset('template/images/' . $data['trainer_image']) }}" alt="Trainer" height="50" width="50"/>
    <hr/>
    <p><strong>{{ $data['trainer_verification_code'] ?? 'No Code Available' }}</strong> is your verification code to book a proffesional GYM Trainor in Wellfit Fitness Gym.</p>
</body>
</html>