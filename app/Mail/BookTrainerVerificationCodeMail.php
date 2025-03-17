<?php 

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookTrainerVerificationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data; // Make sure this is public

    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->data = $data; // Assign request data to $data
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS')) // Ensure MAIL_FROM_ADDRESS is set in .env
                    ->subject('Book a Trainer Verification Code')
                    ->view('emails.trainer_verification') // Ensure this view exists
                    ->with(['data' => $this->data]); // Pass data correctly
    }
}
