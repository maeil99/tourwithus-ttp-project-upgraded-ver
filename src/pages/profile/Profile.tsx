import { useParams } from "react-router-dom"


const Profile = () => {
    const {uid} = useParams()
    console.log(uid)
  return (
    <div className='min-h-screen'>

        <h1>Profile Page</h1>
        <p>your ID is : {uid}</p>
    </div>
  )
}

export default Profile