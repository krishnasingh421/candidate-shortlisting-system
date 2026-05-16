import API from "../api";

function CandidateList({

    candidates,
    refreshCandidates

}) {

    const handleDelete =
    async (id) => {

        await API.delete(
            `/candidates/${id}`
        );

        refreshCandidates();
    };

    return (

        <div className="box">

            <h2>
                Candidate List
            </h2>

            {
                candidates.map(
                candidate => (

                    <div
                        key={candidate._id}
                        className="candidate-card"
                    >

                        <h3>
                            {candidate.name}
                        </h3>

                        <p>
                            Email:
                            {candidate.email}
                        </p>

                        <p>
                            Skills:
                            {
                                candidate.skills
                                .join(", ")
                            }
                        </p>

                        <p>
                            Experience:
                            {
                                candidate.experience
                            } years
                        </p>

                        <p>
                            {candidate.bio}
                        </p>

                        <button
                            onClick={() =>
                                handleDelete(
                                    candidate._id
                                )
                            }
                        >

                            Delete

                        </button>

                    </div>
                ))
            }

        </div>
    );
}

export default CandidateList;