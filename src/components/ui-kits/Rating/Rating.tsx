import React, { useState } from 'react';
import { IconButton } from '../IconButton'

interface RatingProps {
    ratingVal: number,
}

const Rating:React.FC<RatingProps> = ({ratingVal}):JSX.Element => {
    const [ratingArr, setRatingArr] = useState(() => {
        const mathRoundRating:number = Math.ceil(ratingVal);
        return typeof ratingVal === "number" && ratingVal > 0 ? [...Array(mathRoundRating)] : []
    });

    const changeRating = (idx:number):void => {
        setRatingArr([...Array(idx + 1)]);
    }

    return (
        <>
            {[...Array(ratingArr.length)].map((e, i) => (
                <IconButton handleClick={() => changeRating(i)} key={i} img="/images/icons/star.png" width="15px" height="15px" />
            ))}
            {[...Array(5 - ratingArr.length)].map((e, i) => (
                <IconButton handleClick={() => changeRating(ratingArr.length + i)} key={ratingArr.length + i} img="/images/icons/non-star.png" width="15px" height="15px" />
            ))}
        </>
    )
}

export default Rating