import {
    useState
} from "react";

import API from "../api";

function CandidateForm({
    refreshCandidates
}) {

    const [form,
    setForm] = useState({

        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: ""

    });

    const handleChange =
    (e) => {

        setForm({

            ...form,

            [e.target.name]:
            e.target.value

        });
    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        await API.post(
            "/candidates",
            {

                ...form,

                skills:
                form.skills.split(",")

            }
        );

        alert(
            "Candidate Added"
        );

        setForm({

            name: "",
            email: "",
            skills: "",
            experience: "",
            bio: ""

        });

        refreshCandidates();
    };

    return (

        <div className="box">

            <h2>
                Add Candidate
            </h2>

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="text"
                    name="skills"
                    placeholder="Skills comma separated"
                    value={form.skills}
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Experience"
                    value={form.experience}
                    onChange={
                        handleChange
                    }
                />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={form.bio}
                    onChange={
                        handleChange
                    }
                />

                <button type="submit">

                    Add Candidate

                </button>

            </form>

        </div>
    );
}

export default CandidateForm;