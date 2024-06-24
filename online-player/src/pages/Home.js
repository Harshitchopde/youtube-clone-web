import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cart from '../components/Cart'
import axios from 'axios';
const Container = styled.div`

display: flex;
justify-content: space-between;
flex-wrap: wrap;

`
function Home({ type }) {

    const [videos, setVideos] = useState([])// insilise with empty array
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // console.log(type);

                const res = await axios.get(`/video/${type}`);
                setVideos(res.data);
                console.log("Video : ",res.data);
                
            } catch (error) {
                console.log(error);

            }

        }
        fetchVideos()
    }, [type])
    return (
        <Container>

            {/* { videos && videos?.map((video) => (
                <Cart key={video._id} video={video} />

            )



            )} */}


        </Container>
    )
}
Home.defaultProps = {
    type: 'random'
};
export default Home
