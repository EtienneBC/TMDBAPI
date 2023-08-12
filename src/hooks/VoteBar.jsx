import React from 'react';
import { Progress } from "@nextui-org/react"

// Utility function to map a value from one range to another
const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };  

// Custom hook to calculate vote average on a scale of 0 to 100
const useVoteAverage = (itemId) => {
    const voteAverageOn100 = React.useMemo(() => {
        const mappedValue = mapRange(itemId, 0, 10, 0, 100);
        // Round the value to 2 decimal places (optional)
        return Math.round(mappedValue);
    }, [itemId]);

    return voteAverageOn100;
};

const VoteBar = ({ itemId }) => {
    // Assuming item.vote_average is the vote average value (e.g., 9.51)
    const voteAverageOn100 = useVoteAverage(itemId);

    return (
        <div>
            {/* Render the progress bar with the vote average on 100 */}
            <span>{voteAverageOn100}%</span>
            <Progress value={voteAverageOn100} />
            {/* Display the vote average on 100 */}
        </div>
    );
};

export default VoteBar;
