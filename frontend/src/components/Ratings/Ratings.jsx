import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

const Ratings = ({ratings = '0.0'}) => {
    const renderRatings = () => {
        let ratingsArray = [];
        const firstHalf = ratings.split(".")[0];
        const secondHalf = ratings.split(".")[1];
    
        if (firstHalf) {
          for (let i = 0; i < parseInt(firstHalf); i++) {
            ratingsArray.push(<FontAwesomeIcon key={i} icon={faStar} />);
          }
        }
    
        if (secondHalf === '5') {
          ratingsArray.push(<FontAwesomeIcon key={ratings} icon={faStarHalfStroke} />);
        }
    
        return ratingsArray;
    };

    return (
        <ul className="flex gap-[4px]">
            {renderRatings().map((rating, index) => (
                <li className="text-[#FFAD33]" key={index}>
                    {rating}
                </li>
            )
            )}
        </ul>
    )
}

export default Ratings