import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: #00000072;
`
const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
gap: 20px;
width: 600px;
height: 600px;
background-color: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
padding: 30px;
border: 1px solid red;

`
const Close = styled.h1`
position: absolute;
top: 0;
right: 0;
padding: 20px;
cursor: pointer;
`
const Title = styled.h2`
 text-align: center;
`;
// const Input = styled.input`
//     border: 1px solid  ${({ theme }) => theme.soft};
//     border-radius: 3px;
//     outline: none;
//     padding: 10px;
//     color:  ${({ theme }) => theme.text};
//     background-color: transparent;
//     width: 100%;
//     font-size: 14px;
// `;
const Input = styled.input`
    background-color: transparent;
    width: 90%;
    color: ${({ theme }) => theme.text};
    border: none;
    outline: none;// it is for outline of input of search bar
`;
const Desc = styled.textarea`
    border: 1px solid  ${({ theme }) => theme.soft};
    border-radius: 3px;
    outline: none;
    padding: 10px;
    color:  ${({ theme }) => theme.text};
    background-color: transparent;
    width: 100%;
    font-size: 14px;
`
const Button = styled.button`
    border-radius: 3px;
    background: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
    cursor: pointer;
    border: none;
    padding: 10px 20px;
`;
const Label = styled.label`
   font-size: 14px;
`
const Upload = ({ setOpen }) => {
    const [video, setVideo] = useState(undefined)
    const [image, setImage] = useState(undefined)
    const [videoPer, setVideoPer] = useState(0)
    const [imagePer, setImagePer] = useState(0)
    const [tag, setTags] = useState([])
    const [input, setInput] = useState({})
    const [desc, setDesc] = useState("")
    const navigate = useNavigate()
    const uploadFile = (file,urlTyp) => {
        // Create a root reference
        const storage = getStorage(app);
        const filename = new Date().getTime() + file.name;
        // Create a reference to 'mountains.jpg'

        const storageRef = ref(storage,filename);


        const uploadTask = uploadBytesResumable(storageRef, file);

 console.log(storageRef)
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlTyp ==="imgUrl"?setImagePer(Math.round(progress)):setVideoPer(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL)
                    setInput((pre)=>{
                        return {...pre,[urlTyp]:downloadURL}
                    })
            
                })
            });
    }
     useEffect(() => { 
       video && uploadFile(video,"videoUrl") }, [video])
     useEffect(() => { 
        image && uploadFile(image,"imgUrl") }, [image])
    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    }
    const handleChange=(e)=>{
        setInput((pre)=>{
            return {...pre,[e.target.name]:e.target.value}
        })

    }
    const handleUpload = async(e)=>{
        e.preventDefault()
        
     try {
           // console.log(input)
           const res = await axios.post("/video",{...input,tag})
           setOpen(false)
           console.log(res)
           res.status==200 && navigate(`/video/${res.data._id}`)
        
     } catch (error) {
        console.log(error)
     }
     
    }
  
    return (
        <Container>
                <form action={handleUpload}>
            <Wrapper>

                <Close onClick={()=>setOpen(false)}>X</Close>
                <Title  >Upload new videos</Title>
                <Label>Video:</Label>
               {videoPer>0?("Uploading "+videoPer+"%"):
               ( <Input type='file' accept='video/*' required
                    onChange={e => setVideo(e.target.files[0])} />)}
               
                <Input type='text'
                 placeholder='Title '
                 name='title' required
                    onChange={handleChange} />
                <Desc placeholder='Description'
                   onChange={handleChange} 
                   name='desc' required='true'
                   rows={8} />
                <Input type='text' placeholder='Tags seprated by comma'
                    onChange={handleTags} />
                <Label>Image:</Label>
                {imagePer>0?("Uploading "+imagePer+"%"):(<Input type='file'required accept='image/*'
                    onChange={e => setImage(e.target.files[0])} />)}
                <Button>Upload</Button>
            </Wrapper>
                </form>


        </Container>
    )
}

export default Upload
