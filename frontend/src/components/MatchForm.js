import {
    useState
} from "react";

import API from "../api";

function MatchForm({

    setMatchedCandidates

}) {

    const [skills,
    setSkills] =
    useState("");

    const [experience,
    setExperience] =
    useState("");

    const handleMatch =
    async () => {

        const response =
            await API.post(
                "/match",
                {

                    requiredSkills:
                    skills.split(","),

                    minExperience:
                    experience

                }
            );

        setMatchedCandidates(
            response.data
        );
    };

    return (

        <div className="box">

            <h2>
                Match Candidates
            </h2>

            <input
                type="text"
                placeholder="Required Skills"
                value={skills}
                onChange={(e) =>
                    setSkills(
                        e.target.value
                    )
                }
            />

            <input
                type="number"
                placeholder="Minimum Experience"
                value={experience}
                onChange={(e) =>
                    setExperience(
                        e.target.value
                    )
                }
            />

            <button
                onClick={handleMatch}
            >

                Match Candidates

            </button>

        </div>
    );
}

export default MatchForm;