import {
    useEffect,
    useState
} from "react";

import API from "./api";

import CandidateForm
from "./components/CandidateForm";

import CandidateList
from "./components/CandidateList";

import MatchForm
from "./components/MatchForm";

import AIShortlist
from "./components/AIShortlist";

function App() {

    const [candidates,
    setCandidates] = useState([]);

    const [matchedCandidates,
    setMatchedCandidates] =
    useState([]);

    const fetchCandidates =
    async () => {

        const response =
            await API.get(
                "/candidates"
            );

        setCandidates(
            response.data
        );
    };

    useEffect(() => {

        fetchCandidates();

    }, []);

    return (

        <div className="container">

            <h1>
                Candidate Shortlisting
                System
            </h1>

            <CandidateForm
                refreshCandidates={
                    fetchCandidates
                }
            />

            <CandidateList
                candidates={candidates}
                refreshCandidates={
                    fetchCandidates
                }
            />

            <MatchForm
                setMatchedCandidates={
                    setMatchedCandidates
                }
            />

            <div className="box">

                <h2>
                    Matched Candidates
                </h2>

                {
                    matchedCandidates.map(
                    candidate => (

                        <div
                            key={candidate._id}
                            className="candidate-card"
                        >

                            <h3>
                                {candidate.name}
                            </h3>

                            <p>
                                Match Score:
                                {
                                    candidate.matchScore
                                }%
                            </p>

                            <p>
                                Skills Matched:
                                {
                                    candidate
                                    .matchedSkills
                                    .join(", ")
                                }
                            </p>

                        </div>
                    ))
                }

            </div>

            <AIShortlist />

        </div>
    );
}

export default App;