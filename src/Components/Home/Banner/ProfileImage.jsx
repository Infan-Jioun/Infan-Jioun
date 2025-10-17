import React from 'react';
import Skeleton from 'react-loading-skeleton';
import image from '../../../assets/LOGO/[FREE - HDconvert,com] 2024-04-16 (1)-photoaidcom-cropped.png';

const ProfileImage = ({ loading }) => {
    if (loading) {
        return <Skeleton circle={true} height={320} width={320} />;
    }

    return (
        <img
            src={image}
            alt="Infan Jioun Rahman"
            draggable="false"
            className="w-64 md:w-80 rounded-full border-4 border-violet-700 drop-shadow-lg shadow-xl transition-transform duration-300 hover:scale-105"
        />
    );
};

export default ProfileImage;