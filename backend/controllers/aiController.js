require("dotenv").config();

const axios = require("axios");

const Candidate =
    require("../models/Candidate");

exports.aiShortlist =
async (req, res) => {

    try {

        const {
            requiredSkills,
            minExperience
        } = req.body;

        const candidates =
            await Candidate.find();

        const prompt = `

Job Requirements:
Skills: ${requiredSkills.join(", ")}
Minimum Experience:
${minExperience} years

Candidates:

${candidates.map((c, index) => `

${index + 1}.

Name: ${c.name}

Skills:
${c.skills.join(", ")}

Experience:
${c.experience} years

Bio:
${c.bio || "N/A"}

`).join("\n")}

Rank all candidates from
best to worst.

Explain why each candidate
is suitable or not suitable.

`;

        const response =
            await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {

                model:
                "deepseek/deepseek-v4-flash:free",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]

            },

            {

                headers: {

                    Authorization:
                    `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type":
                    "application/json"

                }

            }
        );

        res.json({

            aiResponse:

            response.data
            .choices[0]
            .message
            .content

        });

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
        );

        res.status(500).json({
            message:
            "AI Shortlisting Failed"
        });

    }
};