const providerNewBookingConfirmation = (booking) => `
  <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 40px 0; text-align: center;">
    <div style="display: inline-block; background-color: #f9f9f9; color: #1a1a1a; padding: 30px 25px; border-radius: 8px; max-width: 600px; width: 100%; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <h2 style="color: #2e86de; margin-bottom: 20px;">New Booking Alert!</h2>
      
      <p style="font-size: 16px; margin-bottom: 10px;">
        Hello <strong>${booking.serviceProvider}</strong>,
      </p>

      <p style="font-size: 16px; margin-bottom: 20px;">
        A new customer has booked an appointment with you. Here are the details:
      </p>

      <ul style="list-style: none; padding: 0; font-size: 15px; text-align: left; margin: 0 auto 20px auto; max-width: 400px;">
        <li><strong>Booking ID:</strong> ${booking._id}</li>
        <li><strong>Customer Name:</strong> ${booking.fullName}</li>
        <li><strong>Service:</strong> ${booking.service || 'Not specified'}</li>
        <li><strong>Appointment Date:</strong> ${new Date(
          booking.appointmentDate
        ).toLocaleString()}</li>
        <li><strong>Status:</strong> ${booking.status}</li>
      </ul>

      <p style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 20px;">
        Please confirm or cancel this booking using the buttons below.
      </p>

      <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 30px;">
        <a href="https://yourdomain.com/provider/booking/${
          booking._id
        }?action=confirm" 
           style="background-color: #2e86de; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          ✅ Confirm Booking
        </a>
        <a href="https://yourdomain.com/provider/booking/${
          booking._id
        }?action=cancel" 
           style="background-color: #e74c3c; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          ❌ Cancel Booking
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">
        Regards,<br /><strong>The Reserve Team</strong>
      </p>
    </div>
  </div>
`;

module.exports = providerNewBookingConfirmation;
