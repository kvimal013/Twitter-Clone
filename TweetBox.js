import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import './TweetBox.css';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const TweetBox = () => {
    const [post, setPost] = useState('');
    const[imageURL, setImageURL] =useState('');
    const[isLoading, setIsLoading] =useState(false);
    const[name, setName] =useState('');
    const[username, setUsername] =useState('');
    const [loggedInUser] = useLoggedInUser();
    const {user} = useAuthState(auth)
    const email = user?.email;
    // console.log(loggedInUser)

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

    const handleUploadImage = e =>{
        setIsLoading(true);
        const image = e.target.files[0];
        
        const formData = new FormData();
        formData.set('image', image)

        axios.post("https://api.imgbb.com/1/upload?key=860f91da68a0fbec89cfdfd7968b8a72", formData)
        .then(res => {
            setImageURL(res.data.data.display_url);
            // console.log(res.data.data.display_url)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error);
            // setIsLoading(false);
        })
    }

    const handleTweet = (e) =>{
        e.preventDefault();
        if (user?.providerData[0]?.providerId === 'password') {
            fetch(`http://localhost:5000/loggedInUser?email=${email}`)
            .then(res => res.json())
                .then(data => {
                    setName(data[0]?.name)
                    setUsername(data[0]?.username)
                })
        }
        else {
            setName(user?.displayName)
            setUsername(email?.split('@')[0])
        }
       
         if(name) {
            const userPost = {
                profilePhoto: userProfilePic,
                post: post,
                photo: imageURL,
                name: name,
                username: username,
                email: email,
            }
        console.log(userPost);
        setPost('')
        setImageURL('')
        fetch('http://localhost:5000/post', {
            method :"POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(userPost),
        })
         .then(res => res.json())
         .then(data => {
            console.log(data);
         })
    }
}
  return (
    <div className='tweetBox'>
        <form onSubmit={handleTweet}>
            <div className="tweetBox_input">
                <Avatar src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                <input 
                type="text"
                placeholder='What happening?'
                onChange={(e) => setPost(e.target.value)}
                value={post}
                required
                />
            </div>
            <div className='imageIcon_tweetButton'>
                <label htmlFor='image' className='imageIcon'>
                    {
                     isLoading ? <p>uploading image</p> : <p>{imageURL ? 'image uploaded' : <AddPhotoAlternateIcon/>}</p>
                    }

                </label>
                <input type="file" 
                id='image'
                className='imageInput'
                onChange={handleUploadImage}
                 />
                <Button className='tweetBox_tweetButton' type='submit'>Tweet</Button>
            </div>
        </form>
    </div>
  );
}

export default TweetBox;
