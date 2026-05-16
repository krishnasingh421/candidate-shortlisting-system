import {
    useState
} from "react";

import API from "../api";

function AIShortlist() {

    const [skills,
    setSkills] =
    useState("");

    const [experience,
    setExperience] =
    useState("");

    const [result,
    setResult] =
    useState("");

    const handleAI =
    async () => {

        const response =
            await API.post(

            "/ai/shortlist",

            {

                requiredSkills:
                skills.split(","),

                minExperience:
                experience

            }

        );

        setResult(
            response.data.aiResponse
        );
    };

    return (

        <div className="box">

            <h2>
                AI Candidate
                Shortlisting
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
                onClick={handleAI}
            >

                AI Shortlist

            </button>

            <pre>
                {result}
            </pre>

        </div>
    );
}

export default AIShortlist;