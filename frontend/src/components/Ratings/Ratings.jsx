import { Star, StarHalf } from 'lucide-react';

const Ratings = ({ratings = '0.0'}) => {
    const renderRatings = () => {
        let ratingsArray = [];
        const firstHalf = ratings.split(".")[0];
        const secondHalf = ratings.split(".")[1];
    
        if (firstHalf) {
          for (let i = 0; i < parseInt(firstHalf); i++) {
            ratingsArray.push(<Star key={i} size={14} fill="#FFAD33" stroke="#FFAD33" />);
          }
        }
    
        if (secondHalf === '5') {
          ratingsArray.push(<StarHalf key={ratings} size={14} fill="#FFAD33" stroke="#FFAD33" />);
        }
    
        return ratingsArray;
    };

    return (
        <ul className="flex gap-[4px]">
            {renderRatings().map((rating, index) => (
                <li key={index}>
                    {rating}
                </li>
            )
            )}
        </ul>
    )
}

export default Ratings
