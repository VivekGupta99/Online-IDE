const axios = require('axios');
const CodeRun = require('../model/CodeRun');


exports.submitCode = async (req, res) => {
    try {
        const { code, input, lang } = req.body;

        const language = lang.toLowerCase();
        const languageId = getJudge0LanguageId(language);

        const payload = {
            source_code: code,
            stdin: input,
            language_id: languageId,
        };

        // Send the code to Judge0 for execution
        const judge0Response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', payload, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': `${process.env.RAPID_KEY}`,
                'X-RapidAPI-Host': `${process.env.RAPID_HOST}`
            }
        });

        const token = judge0Response.data.token
        const outputReq = await axios.get(`https://ce.judge0.com/submissions/${token}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })


        const { stdout, stderr, status } = outputReq.data;

        console.log("Output Req data:   ", outputReq.data)

        let output = stdout || stderr;
        if (status.id !== 3) {
            output = `Execution Error: Status ID ${status.id}\n${stderr}`;
        }


        const newCodeRun = new CodeRun({ code, input, output, language });
        await newCodeRun.save();

        res.status(201).json(newCodeRun);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

function getJudge0LanguageId(language) {
    const languageIds = {
        'cpp': 52,
        'java': 62,
        'python': 71,
        'js': 63,
    };
    return languageIds[language.toLowerCase()] || null;
}

exports.getSubmitedCode = async (req, res) => {
    try {
        const submittedCode = await CodeRun.find().exec();
        res.json(submittedCode);

    } catch (error) {
        console.error("Error fetching submitted code:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};