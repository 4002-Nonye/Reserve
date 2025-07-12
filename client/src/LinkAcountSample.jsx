import axios from 'axios';

function LinkAcountSample() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  console.log(token);

  const handleLinkAccount = async () => {
    try {
      const data = await axios.post(
        'http://localhost:3000/api/auth/link-account',
        {
          token,
        },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>Do you want to link your account?</div>

      <button onClick={() => handleLinkAccount()}>Yes</button>
      <button>No</button>
    </>
  );
}

export default LinkAcountSample;
