import React from 'react';
import Books from './Books';
import LatestBooks6 from './LatestBooks6';
import Banner from '../../component/Banner';
import Coverage from '../../component/Coverage';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
        <LatestBooks6></LatestBooks6>
        <Coverage></Coverage>
        </div>
    );
};

export default Home;